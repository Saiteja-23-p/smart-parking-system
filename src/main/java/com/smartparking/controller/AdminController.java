package com.smartparking.controller;

import com.smartparking.entity.Booking;
import com.smartparking.entity.ParkingLocation;
import com.smartparking.entity.ParkingSlot;
import com.smartparking.service.BookingService;
import com.smartparking.service.ParkingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    @Autowired
    private ParkingService parkingService;

    @Autowired
    private BookingService bookingService;

    @PostMapping("/location")
    public ResponseEntity<?> addLocation(@RequestBody ParkingLocation location) {
        return ResponseEntity.ok(parkingService.addLocation(location));
    }

    @PostMapping("/slot")
    public ResponseEntity<?> addSlot(@RequestBody ParkingSlot slot) {
        return ResponseEntity.ok(parkingService.addSlot(slot));
    }

    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @PutMapping("/bookings/{id}/status")
    public ResponseEntity<?> updateBookingStatus(@PathVariable("id") Long id, @RequestBody java.util.Map<String, String> payload) {
        String status = payload.get("status");
        return ResponseEntity.ok(bookingService.updateBookingStatus(id, status));
    }
}
