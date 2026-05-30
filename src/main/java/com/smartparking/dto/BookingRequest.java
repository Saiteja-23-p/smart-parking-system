package com.smartparking.dto;

import java.time.LocalDateTime;

public class BookingRequest {
    private Long hubId;
    private Long slotId;
    private Long vehicleId;
    private String vehicleNumber;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    public Long getHubId() {
        return this.hubId;
    }
    public void setHubId(Long hubId) {
        this.hubId = hubId;
    }

    public Long getSlotId() {
        return this.slotId;
    }
    public void setSlotId(Long slotId) {
        this.slotId = slotId;
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
}
