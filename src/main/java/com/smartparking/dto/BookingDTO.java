package com.smartparking.dto;

import java.time.LocalDateTime;

public class BookingDTO {
    private Long id;
    private Long hubId;
    private String hubName;
    private String hubAddress;
    private Double hubLat;
    private Double hubLng;
    private Long slotId;
    private String slotNumber;
    private Integer floorLevel;
    private Long vehicleId;
    private String vehicleNumber;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Double totalAmount;
    private Double dynamicPriceApplied;
    private Integer estimatedWalkingMinutes;
    private String status;
    private String bookingToken;
    private LocalDateTime qrScannedAt;
    private LocalDateTime checkInTime;
    private LocalDateTime checkOutTime;
    private LocalDateTime createdAt;

    public Long getId() {
        return this.id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public Long getHubId() {
        return this.hubId;
    }
    public void setHubId(Long hubId) {
        this.hubId = hubId;
    }

    public String getHubName() {
        return this.hubName;
    }
    public void setHubName(String hubName) {
        this.hubName = hubName;
    }

    public String getHubAddress() {
        return this.hubAddress;
    }
    public void setHubAddress(String hubAddress) {
        this.hubAddress = hubAddress;
    }

    public Double getHubLat() {
        return this.hubLat;
    }
    public void setHubLat(Double hubLat) {
        this.hubLat = hubLat;
    }

    public Double getHubLng() {
        return this.hubLng;
    }
    public void setHubLng(Double hubLng) {
        this.hubLng = hubLng;
    }

    public Long getSlotId() {
        return this.slotId;
    }
    public void setSlotId(Long slotId) {
        this.slotId = slotId;
    }

    public String getSlotNumber() {
        return this.slotNumber;
    }
    public void setSlotNumber(String slotNumber) {
        this.slotNumber = slotNumber;
    }

    public Integer getFloorLevel() {
        return this.floorLevel;
    }
    public void setFloorLevel(Integer floorLevel) {
        this.floorLevel = floorLevel;
    }

    public Long getVehicleId() {
        return this.vehicleId;
    }
    public void setVehicleId(Long vehicleId) {
        this.vehicleId = vehicleId;
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

    public String getBookingToken() {
        return this.bookingToken;
    }
    public void setBookingToken(String bookingToken) {
        this.bookingToken = bookingToken;
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
