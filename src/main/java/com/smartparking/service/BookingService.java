package com.smartparking.service;

import com.smartparking.entity.Booking;
import com.smartparking.entity.ParkingSlot;
import com.smartparking.repository.BookingRepository;
import com.smartparking.repository.ParkingSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ParkingSlotRepository slotRepository;

    @Transactional
    public Booking createBooking(Booking booking) {
        // Mark slot as booked
        ParkingSlot slot = slotRepository.findById(booking.getSlot().getSlotId()).orElseThrow();
        slot.setStatus("Booked");
        slotRepository.save(slot);

        return bookingRepository.save(booking);
    }

    @Transactional
    public String cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId).orElse(null);
        if (booking != null) {
            booking.setStatus("Cancelled");
            parkingSlotAvailable(booking.getSlot().getSlotId());
            bookingRepository.save(booking);
            return "Booking cancelled successfully";
        }
        return "Booking not found";
    }

    private void parkingSlotAvailable(Long slotId) {
        slotRepository.findById(slotId).ifPresent(slot -> {
            slot.setStatus("Available");
            slotRepository.save(slot);
        });
    }

    public List<Booking> getBookingsByUser(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
    @Transactional
    public Booking updateBookingStatus(Long bookingId, String status) {
        Booking booking = bookingRepository.findById(bookingId).orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus(status);
        if (status.equals("Cancelled") || status.equals("Completed")) {
            parkingSlotAvailable(booking.getSlot().getSlotId());
        }
        return bookingRepository.save(booking);
    }
}
