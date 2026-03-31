package com.smartparking.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "parking_slot")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParkingSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "slot_id")
    private Long slotId;

    @ManyToOne
    @JoinColumn(name = "location_id", nullable = false)
    private ParkingLocation location;

    @Column(name = "slot_number", nullable = false)
    private String slotNumber;

    @Column(nullable = false)
    private String status = "Available"; // Available, Booked

    @Column(name = "vehicle_type", nullable = false)
    private String vehicleType = "Four-Wheeler"; // Two-Wheeler, Three-Wheeler, Four-Wheeler

    @Column(name = "price_per_hour", nullable = false)
    private Double pricePerHour = 50.0;
}
