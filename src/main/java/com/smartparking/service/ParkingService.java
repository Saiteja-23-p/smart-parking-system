package com.smartparking.service;

import com.smartparking.dto.ParkingHubDTO;
import com.smartparking.dto.SlotDTO;
import com.smartparking.entity.ParkingHub;
import com.smartparking.entity.ParkingSlot;
import com.smartparking.exception.ResourceNotFoundException;
import com.smartparking.repository.ParkingHubRepository;
import com.smartparking.repository.ParkingSlotRepository;
import com.smartparking.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ParkingService {

    @Autowired
    private ParkingHubRepository hubRepository;

    @Autowired
    private ParkingSlotRepository slotRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public List<ParkingHubDTO> getAllActiveHubs() {
        return hubRepository.findByIsActiveTrue().stream()
                .map(this::mapToHubDTOWithLiveStats)
                .collect(Collectors.toList());
    }

    public List<ParkingHubDTO> searchNearbyHubs(double lat, double lng, double radiusKm) {
        return hubRepository.findNearby(lat, lng, radiusKm).stream()
                .map(this::mapToHubDTOWithLiveStats)
                .collect(Collectors.toList());
    }

    public ParkingHubDTO getHubDetails(Long hubId) {
        ParkingHub hub = hubRepository.findById(hubId)
                .orElseThrow(() -> new ResourceNotFoundException("Hub not found with id: " + hubId));
        return mapToHubDTOWithLiveStats(hub);
    }

    public SlotDTO updateSlotStatus(Long slotId, String newStatus) {
        ParkingSlot slot = slotRepository.findById(slotId)
                .orElseThrow(() -> new ResourceNotFoundException("Slot not found with id: " + slotId));
        
        slot.setStatus(newStatus);
        slotRepository.save(slot);
        
        SlotDTO slotDTO = mapToSlotDTO(slot);
        
        // Broadcast via WebSocket using dynamic topic based on hubId
        messagingTemplate.convertAndSend("/topic/hubs/" + slot.getHub().getId() + "/slots", slotDTO);
        
        return slotDTO;
    }

    private ParkingHubDTO mapToHubDTOWithLiveStats(ParkingHub hub) {
        ParkingHubDTO dto = new ParkingHubDTO();
        dto.setId(hub.getId());
        dto.setHubName(hub.getHubName());
        dto.setAddress(hub.getAddress());
        dto.setCity(hub.getCity());
        dto.setLatitude(hub.getLatitude());
        dto.setLongitude(hub.getLongitude());
        dto.setHubType(hub.getHubType());
        dto.setTotalCapacity(hub.getTotalCapacity());
        dto.setTotalFloors(hub.getTotalFloors());
        dto.setImageUrl(hub.getImageUrl());
        dto.setEvEnabled(hub.getEvEnabled());
        dto.setDynamicPricingEnabled(hub.getDynamicPricingEnabled());
        dto.setOperatingHours(hub.getOperatingHours());
        
        if (hub.getOwner() != null) {
            dto.setOwnerId(hub.getOwner().getId());
            dto.setOwnerName(hub.getOwner().getName());
        }

        // Live stats computation
        long totalSlots = slotRepository.countByHubId(hub.getId());
        long availableSlots = slotRepository.countByHubIdAndStatus(hub.getId(), "AVAILABLE");
        long occupiedSlots = totalSlots - availableSlots;
        
        dto.setTotalSlots(totalSlots);
        dto.setAvailableSlots(availableSlots);
        dto.setOccupiedSlots(occupiedSlots);
        dto.setOccupancyPct(totalSlots > 0 ? ((double) occupiedSlots / totalSlots) * 100 : 0.0);

        Double avgRating = reviewRepository.findAverageRatingByHubId(hub.getId());
        dto.setRating(avgRating != null ? Math.round(avgRating * 10.0) / 10.0 : (hub.getRating() != null ? hub.getRating() : 0.0));
        dto.setReviewCount((int) reviewRepository.countByHubId(hub.getId()));

        List<ParkingSlot> slots = slotRepository.findByHubId(hub.getId());
        dto.setSlots(slots.stream().map(this::mapToSlotDTO).collect(Collectors.toList()));

        if (!slots.isEmpty()) {
            dto.setLowestPrice(slots.stream().mapToDouble(ParkingSlot::getCurrentDynamicPrice).min().orElse(0.0));
            dto.setHighestPrice(slots.stream().mapToDouble(ParkingSlot::getCurrentDynamicPrice).max().orElse(0.0));
        } else {
            dto.setLowestPrice(0.0);
            dto.setHighestPrice(0.0);
        }

        dto.setEvChargersAvailable(
                (int) slots.stream().filter(s -> Boolean.TRUE.equals(s.getIsEvCharging()) && "AVAILABLE".equals(s.getStatus())).count()
        );

        return dto;
    }

    private SlotDTO mapToSlotDTO(ParkingSlot slot) {
        SlotDTO dto = new SlotDTO();
        dto.setId(slot.getId());
        dto.setHubId(slot.getHub().getId());
        dto.setFloorLevel(slot.getFloorLevel());
        dto.setSlotNumber(slot.getSlotNumber());
        dto.setType(slot.getType());
        dto.setStatus(slot.getStatus());
        dto.setVehicleType(slot.getVehicleType());
        dto.setIsEvCharging(slot.getIsEvCharging());
        dto.setChargerType(slot.getChargerType());
        dto.setBasePrice(slot.getBasePrice());
        dto.setCurrentDynamicPrice(slot.getCurrentDynamicPrice());
        dto.setSensorStatus(slot.getSensorStatus());
        return dto;
    }
}
