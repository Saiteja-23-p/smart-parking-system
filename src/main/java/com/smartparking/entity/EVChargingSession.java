package com.smartparking.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "ev_charging_sessions")
public class EVChargingSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "slot_id", nullable = false)
    private ParkingSlot slot;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "energy_delivered_kwh")
    private Double energyDeliveredKwh = 0.0;

    @Column(name = "cost_per_kwh")
    private Double costPerKwh = 12.0;

    @Column(name = "total_cost")
    private Double totalCost = 0.0;

    @Column(name = "battery_start_pct")
    private Integer batteryStartPct;

    @Column(name = "battery_end_pct")
    private Integer batteryEndPct;

    @Column(name = "charger_type", length = 30)
    private String chargerType;

    @Column(length = 20)
    private String status = "CHARGING";

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

    public Double getEnergyDeliveredKwh() {
        return this.energyDeliveredKwh;
    }
    public void setEnergyDeliveredKwh(Double energyDeliveredKwh) {
        this.energyDeliveredKwh = energyDeliveredKwh;
    }

    public Double getCostPerKwh() {
        return this.costPerKwh;
    }
    public void setCostPerKwh(Double costPerKwh) {
        this.costPerKwh = costPerKwh;
    }

    public Double getTotalCost() {
        return this.totalCost;
    }
    public void setTotalCost(Double totalCost) {
        this.totalCost = totalCost;
    }

    public Integer getBatteryStartPct() {
        return this.batteryStartPct;
    }
    public void setBatteryStartPct(Integer batteryStartPct) {
        this.batteryStartPct = batteryStartPct;
    }

    public Integer getBatteryEndPct() {
        return this.batteryEndPct;
    }
    public void setBatteryEndPct(Integer batteryEndPct) {
        this.batteryEndPct = batteryEndPct;
    }

    public String getChargerType() {
        return this.chargerType;
    }
    public void setChargerType(String chargerType) {
        this.chargerType = chargerType;
    }

    public String getStatus() {
        return this.status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
