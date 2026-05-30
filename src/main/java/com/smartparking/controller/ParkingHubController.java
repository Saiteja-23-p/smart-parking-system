package com.smartparking.controller;

import com.smartparking.dto.ParkingHubDTO;
import com.smartparking.service.ParkingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hubs")
@CrossOrigin("*")
public class ParkingHubController {

    @Autowired
    private ParkingService parkingService;

    @GetMapping
    public ResponseEntity<List<ParkingHubDTO>> getAllHubs() {
        return ResponseEntity.ok(parkingService.getAllActiveHubs());
    }

    @GetMapping("/search")
    public ResponseEntity<List<ParkingHubDTO>> searchHubs(
            @RequestParam("lat") double lat,
            @RequestParam("lng") double lng,
            @RequestParam(value = "radius", defaultValue = "50.0") double radius) {
        return ResponseEntity.ok(parkingService.searchNearbyHubs(lat, lng, radius));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ParkingHubDTO> getHubDetails(@PathVariable("id") Long id) {
        return ResponseEntity.ok(parkingService.getHubDetails(id));
    }

    @GetMapping("/{id}/slots")
    public ResponseEntity<List<com.smartparking.dto.SlotDTO>> getHubSlots(@PathVariable("id") Long id) {
        return ResponseEntity.ok(parkingService.getHubDetails(id).getSlots());
    }

    @PutMapping("/slots/{id}/status")
    public ResponseEntity<com.smartparking.dto.SlotDTO> updateSlotStatus(@PathVariable("id") Long id, @RequestBody java.util.Map<String, String> payload) {
        String newStatus = payload.get("status");
        return ResponseEntity.ok(parkingService.updateSlotStatus(id, newStatus));
    }
}
