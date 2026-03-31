package com.smartparking.service;

import com.smartparking.entity.ParkingLocation;
import com.smartparking.entity.ParkingSlot;
import com.smartparking.repository.ParkingLocationRepository;
import com.smartparking.repository.ParkingSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ParkingService {
    @Autowired
    private ParkingLocationRepository locationRepository;

    @Autowired
    private ParkingSlotRepository slotRepository;

    public List<ParkingLocation> getAllLocations() {
        return locationRepository.findAll();
    }

    public ParkingLocation addLocation(ParkingLocation location) {
        return locationRepository.save(location);
    }

    public List<ParkingSlot> getSlotsByLocation(Long locationId) {
        return slotRepository.findByLocationId(locationId);
    }

    public ParkingSlot addSlot(ParkingSlot slot) {
        return slotRepository.save(slot);
    }

    public void updateSlotStatus(Long slotId, String status) {
        slotRepository.findById(slotId).ifPresent(slot -> {
            slot.setStatus(status);
            slotRepository.save(slot);
        });
    }
}
