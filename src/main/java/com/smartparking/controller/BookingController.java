package com.smartparking.controller;

import com.smartparking.dto.BookingDTO;
import com.smartparking.dto.BookingRequest;
import com.smartparking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingDTO> createBooking(@RequestBody BookingRequest request, Authentication authentication) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(bookingService.createBooking(userEmail, request));
    }

    @GetMapping("/my")
    public ResponseEntity<List<BookingDTO>> getMyBookings(Authentication authentication) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(bookingService.getUserBookings(userEmail));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<BookingDTO> cancelBooking(@PathVariable("id") Long id, Authentication authentication) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(bookingService.cancelBooking(userEmail, id));
    }
}
