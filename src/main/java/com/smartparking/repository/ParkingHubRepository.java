package com.smartparking.repository;

import com.smartparking.entity.ParkingHub;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ParkingHubRepository extends JpaRepository<ParkingHub, Long> {
    List<ParkingHub> findByCity(String city);
    List<ParkingHub> findByOwnerId(Long ownerId);
    List<ParkingHub> findByIsActiveTrue();
    List<ParkingHub> findByEvEnabledTrue();
    List<ParkingHub> findByHubType(String hubType);

    @Query("SELECT h FROM ParkingHub h WHERE h.isActive = true AND " +
           "(6371 * acos(cos(radians(:lat)) * cos(radians(h.latitude)) * " +
           "cos(radians(h.longitude) - radians(:lng)) + sin(radians(:lat)) * " +
           "sin(radians(h.latitude)))) <= :radius ORDER BY " +
           "(6371 * acos(cos(radians(:lat)) * cos(radians(h.latitude)) * " +
           "cos(radians(h.longitude) - radians(:lng)) + sin(radians(:lat)) * " +
           "sin(radians(h.latitude))))")
    List<ParkingHub> findNearby(@Param("lat") double lat, @Param("lng") double lng, @Param("radius") double radiusKm);
}
