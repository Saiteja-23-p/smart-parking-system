package com.smartparking.service;

import com.smartparking.entity.ParkingHub;
import com.smartparking.entity.ParkingSlot;
import com.smartparking.repository.ParkingSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DynamicPricingService {

    @Autowired
    private ParkingSlotRepository slotRepository;

    public void updatePricesForHub(ParkingHub hub) {
        if (!hub.getDynamicPricingEnabled()) {
            return;
        }

        long totalSlots = slotRepository.countByHubId(hub.getId());
        if (totalSlots == 0) return;

        long occupiedSlots = totalSlots - slotRepository.countByHubIdAndStatus(hub.getId(), "AVAILABLE");
        double occupancyPct = (double) occupiedSlots / totalSlots;

        // Surge pricing logic:
        // < 50% occupancy: Base price
        // 50% - 70%: 10% surge
        // 70% - 90%: 25% surge
        // > 90%: 50% surge
        double surgeMultiplier = 1.0;
        if (occupancyPct >= 0.9) surgeMultiplier = 1.50;
        else if (occupancyPct >= 0.7) surgeMultiplier = 1.25;
        else if (occupancyPct >= 0.5) surgeMultiplier = 1.10;

        List<ParkingSlot> slots = slotRepository.findByHubId(hub.getId());
        for (ParkingSlot slot : slots) {
            double newPrice = slot.getBasePrice() * surgeMultiplier;
            // Round to nearest 5
            newPrice = Math.round(newPrice / 5.0) * 5.0;
            slot.setCurrentDynamicPrice(newPrice);
        }
        slotRepository.saveAll(slots);
    }
}
