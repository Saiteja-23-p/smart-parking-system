package com.smartparking.controller;

import com.smartparking.dto.BookingRequest;
import com.smartparking.entity.Booking;
import com.smartparking.entity.ParkingSlot;
import com.smartparking.entity.User;
import com.smartparking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @PostMapping("/book")
    public ResponseEntity<?> bookSlot(@RequestBody BookingRequest request) {
        try {
            System.out.println("RECEIVED BOOKING REQUEST: " + request);
            Booking booking = new Booking();

            User user = new User();
            user.setId(request.getUserId());

            ParkingSlot slot = new ParkingSlot();
            slot.setSlotId(request.getSlotId());

            booking.setUser(user);
            booking.setSlot(slot);
            booking.setBookingDate(request.getBookingDate());
            booking.setStartTime(request.getStartTime());
            booking.setEndTime(request.getEndTime());
            booking.setStatus("Confirmed");

            return ResponseEntity.ok(bookingService.createBooking(booking));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getUserBookings(@PathVariable("userId") Long userId) {
        return bookingService.getBookingsByUser(userId);
    }

    @PostMapping("/cancel/{bookingId}")
    public ResponseEntity<?> cancelBooking(@PathVariable("bookingId") Long bookingId) {
        return ResponseEntity.ok(bookingService.cancelBooking(bookingId));
    }
}
