package com.smartparking.repository;

import com.smartparking.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);
    List<Booking> findByStatus(String status);
    List<Booking> findByHubId(Long hubId);
    List<Booking> findByUserIdOrderByCreatedAtDesc(Long userId);
    Optional<Booking> findByBookingToken(String bookingToken);
    long countByHubIdAndStatus(Long hubId, String status);
    long countByStatus(String status);
}
