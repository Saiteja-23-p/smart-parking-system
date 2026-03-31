package com.smartparking.controller;

import com.smartparking.entity.ParkingLocation;
import com.smartparking.entity.ParkingSlot;
import com.smartparking.service.ParkingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/parking")
@CrossOrigin(origins = "*")
public class ParkingController {
    @Autowired
    private ParkingService parkingService;

    @GetMapping("/locations")
    public List<ParkingLocation> getAllLocations() {
        return parkingService.getAllLocations();
    }

    @GetMapping("/slots/{locationId}")
    public List<ParkingSlot> getSlotsByLocation(@PathVariable("locationId") Long locationId) {
        return parkingService.getSlotsByLocation(locationId);
    }
}
