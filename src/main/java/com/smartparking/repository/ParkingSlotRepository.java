package com.smartparking.repository;

import com.smartparking.entity.ParkingSlot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParkingSlotRepository extends JpaRepository<ParkingSlot, Long> {
    List<ParkingSlot> findByHubId(Long hubId);
    List<ParkingSlot> findByStatus(String status);
    List<ParkingSlot> findByHubIdAndStatus(Long hubId, String status);
    List<ParkingSlot> findByHubIdAndFloorLevel(Long hubId, Integer floorLevel);
    List<ParkingSlot> findByHubIdAndIsEvChargingTrue(Long hubId);
    long countByHubIdAndStatus(Long hubId, String status);
    long countByHubId(Long hubId);
}
