package com.smartparking.controller;

import com.smartparking.repository.BookingRepository;
import com.smartparking.repository.ParkingSlotRepository;
import com.smartparking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ParkingSlotRepository slotRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalSlots", slotRepository.count());
        stats.put("availableSlots", slotRepository.findByStatus("AVAILABLE").size());
        stats.put("occupiedSlots", slotRepository.findByStatus("OCCUPIED").size());
        stats.put("reservedSlots", slotRepository.findByStatus("RESERVED").size());
        stats.put("activeBookings", bookingRepository.findByStatus("ACTIVE").size());
        
        return ResponseEntity.ok(stats);
    }
}
