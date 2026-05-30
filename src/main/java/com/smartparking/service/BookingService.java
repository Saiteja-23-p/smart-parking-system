package com.smartparking.service;

import com.smartparking.dto.BookingDTO;
import com.smartparking.dto.BookingRequest;
import com.smartparking.entity.Booking;
import com.smartparking.entity.ParkingSlot;
import com.smartparking.entity.User;
import com.smartparking.exception.ResourceNotFoundException;
import com.smartparking.exception.SlotUnavailableException;
import com.smartparking.repository.BookingRepository;
import com.smartparking.repository.ParkingSlotRepository;
import com.smartparking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ParkingSlotRepository slotRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ParkingService parkingService;

    public BookingDTO createBooking(String userEmail, BookingRequest request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        ParkingSlot slot = slotRepository.findById(request.getSlotId())
                .orElseThrow(() -> new ResourceNotFoundException("Slot not found"));

        if (!"AVAILABLE".equals(slot.getStatus())) {
            throw new SlotUnavailableException("Slot is not available");
        }

        // Calculate hours
        long hours = Duration.between(request.getStartTime(), request.getEndTime()).toHours();
        if (hours < 1) hours = 1; // Minimum 1 hour charge
        double totalAmount = hours * slot.getCurrentDynamicPrice();

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setHub(slot.getHub());
        booking.setSlot(slot);
        booking.setVehicleNumber(request.getVehicleNumber());
        booking.setStartTime(request.getStartTime());
        booking.setEndTime(request.getEndTime());
        booking.setTotalAmount(totalAmount);
        booking.setDynamicPriceApplied(slot.getCurrentDynamicPrice());
        booking.setStatus("ACTIVE");
        booking.setBookingToken(UUID.randomUUID().toString());

        booking = bookingRepository.save(booking);

        // Update Slot status
        parkingService.updateSlotStatus(slot.getId(), "RESERVED");

        return mapToDTO(booking);
    }

    public List<BookingDTO> getUserBookings(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return bookingRepository.findByUserIdOrderByCreatedAtDesc(user.getId()).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public BookingDTO cancelBooking(String userEmail, Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        if (!booking.getUser().getId().equals(user.getId()) && !"ROLE_ADMIN".equals(user.getRole()) && !"ADMIN".equals(user.getRole())) {
            throw new RuntimeException("Unauthorized to cancel this booking");
        }

        if (!"ACTIVE".equals(booking.getStatus())) {
            throw new RuntimeException("Booking cannot be cancelled as it is already " + booking.getStatus());
        }

        booking.setStatus("CANCELLED");
        booking = bookingRepository.save(booking);

        // Update Slot status back to AVAILABLE
        parkingService.updateSlotStatus(booking.getSlot().getId(), "AVAILABLE");

        return mapToDTO(booking);
    }

    private BookingDTO mapToDTO(Booking booking) {
        BookingDTO dto = new BookingDTO();
        dto.setId(booking.getId());
        dto.setHubId(booking.getHub().getId());
        dto.setHubName(booking.getHub().getHubName());
        dto.setHubAddress(booking.getHub().getAddress());
        dto.setHubLat(booking.getHub().getLatitude());
        dto.setHubLng(booking.getHub().getLongitude());
        dto.setSlotId(booking.getSlot().getId());
        dto.setSlotNumber(booking.getSlot().getSlotNumber());
        dto.setFloorLevel(booking.getSlot().getFloorLevel());
        dto.setVehicleNumber(booking.getVehicleNumber());
        dto.setStartTime(booking.getStartTime());
        dto.setEndTime(booking.getEndTime());
        dto.setTotalAmount(booking.getTotalAmount());
        dto.setDynamicPriceApplied(booking.getDynamicPriceApplied());
        dto.setEstimatedWalkingMinutes(booking.getEstimatedWalkingMinutes());
        dto.setStatus(booking.getStatus());
        dto.setBookingToken(booking.getBookingToken());
        dto.setQrScannedAt(booking.getQrScannedAt());
        dto.setCheckInTime(booking.getCheckInTime());
        dto.setCheckOutTime(booking.getCheckOutTime());
        dto.setCreatedAt(booking.getCreatedAt());
        return dto;
    }
}
