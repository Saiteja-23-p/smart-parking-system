package com.smartparking.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hub_id", nullable = false)
    private ParkingHub hub;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "slot_id", nullable = false)
    private ParkingSlot slot;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    @Column(name = "booking_token", nullable = false, unique = true)
    private String bookingToken;

    @Column(name = "vehicle_number", nullable = false, length = 20)
    private String vehicleNumber;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @Column(name = "total_amount")
    private Double totalAmount;

    @Column(name = "dynamic_price_applied")
    private Double dynamicPriceApplied;

    @Column(name = "estimated_walking_minutes")
    private Integer estimatedWalkingMinutes = 5;

    @Column(length = 20)
    private String status = "ACTIVE";

    @Column(name = "qr_scanned_at")
    private LocalDateTime qrScannedAt;

    @Column(name = "check_in_time")
    private LocalDateTime checkInTime;

    @Column(name = "check_out_time")
    private LocalDateTime checkOutTime;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public Long getId() {
        return this.id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return this.user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    public ParkingHub getHub() {
        return this.hub;
    }
    public void setHub(ParkingHub hub) {
        this.hub = hub;
    }

    public ParkingSlot getSlot() {
        return this.slot;
    }
    public void setSlot(ParkingSlot slot) {
        this.slot = slot;
    }

    public Vehicle getVehicle() {
        return this.vehicle;
    }
    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public String getBookingToken() {
        return this.bookingToken;
    }
    public void setBookingToken(String bookingToken) {
        this.bookingToken = bookingToken;
    }

    public String getVehicleNumber() {
        return this.vehicleNumber;
    }
    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }

    public LocalDateTime getStartTime() {
        return this.startTime;
    }
    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return this.endTime;
    }
    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public Double getTotalAmount() {
        return this.totalAmount;
    }
    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Double getDynamicPriceApplied() {
        return this.dynamicPriceApplied;
    }
    public void setDynamicPriceApplied(Double dynamicPriceApplied) {
        this.dynamicPriceApplied = dynamicPriceApplied;
    }

    public Integer getEstimatedWalkingMinutes() {
        return this.estimatedWalkingMinutes;
    }
    public void setEstimatedWalkingMinutes(Integer estimatedWalkingMinutes) {
        this.estimatedWalkingMinutes = estimatedWalkingMinutes;
    }

    public String getStatus() {
        return this.status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getQrScannedAt() {
        return this.qrScannedAt;
    }
    public void setQrScannedAt(LocalDateTime qrScannedAt) {
        this.qrScannedAt = qrScannedAt;
    }

    public LocalDateTime getCheckInTime() {
        return this.checkInTime;
    }
    public void setCheckInTime(LocalDateTime checkInTime) {
        this.checkInTime = checkInTime;
    }

    public LocalDateTime getCheckOutTime() {
        return this.checkOutTime;
    }
    public void setCheckOutTime(LocalDateTime checkOutTime) {
        this.checkOutTime = checkOutTime;
    }

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
