package com.smartparking.repository;

import com.smartparking.entity.EVChargingSession;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface EVChargingSessionRepository extends JpaRepository<EVChargingSession, Long> {
    List<EVChargingSession> findByUserId(Long userId);
    List<EVChargingSession> findBySlotId(Long slotId);
    Optional<EVChargingSession> findByVehicleIdAndStatus(Long vehicleId, String status);
    List<EVChargingSession> findByStatus(String status);
}
