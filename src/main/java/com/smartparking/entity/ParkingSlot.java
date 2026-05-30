package com.smartparking.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "parking_slots")
public class ParkingSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hub_id", nullable = false)
    private ParkingHub hub;

    @Column(name = "floor_level")
    private Integer floorLevel = 0;

    @Column(name = "slot_number", nullable = false, length = 20)
    private String slotNumber;

    @Column(length = 20)
    private String type = "REGULAR";

    @Column(length = 20)
    private String status = "AVAILABLE";

    @Column(name = "vehicle_type", length = 30)
    private String vehicleType = "CAR";

    @Column(name = "is_ev_charging")
    private Boolean isEvCharging = false;

    @Column(name = "charger_type", length = 30)
    private String chargerType;

    @Column(name = "base_price")
    private Double basePrice = 50.0;

    @Column(name = "current_dynamic_price")
    private Double currentDynamicPrice = 50.0;

    @Column(name = "sensor_status", length = 20)
    private String sensorStatus = "ONLINE";

    public Long getId() {
        return this.id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public ParkingHub getHub() {
        return this.hub;
    }
    public void setHub(ParkingHub hub) {
        this.hub = hub;
    }

    public Integer getFloorLevel() {
        return this.floorLevel;
    }
    public void setFloorLevel(Integer floorLevel) {
        this.floorLevel = floorLevel;
    }

    public String getSlotNumber() {
        return this.slotNumber;
    }
    public void setSlotNumber(String slotNumber) {
        this.slotNumber = slotNumber;
    }

    public String getType() {
        return this.type;
    }
    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return this.status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public String getVehicleType() {
        return this.vehicleType;
    }
    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public Boolean getIsEvCharging() {
        return this.isEvCharging;
    }
    public void setIsEvCharging(Boolean isEvCharging) {
        this.isEvCharging = isEvCharging;
    }

    public Boolean getEvCharging() {
        return this.isEvCharging;
    }
    public void setEvCharging(Boolean isEvCharging) {
        this.isEvCharging = isEvCharging;
    }

    public String getChargerType() {
        return this.chargerType;
    }
    public void setChargerType(String chargerType) {
        this.chargerType = chargerType;
    }

    public Double getBasePrice() {
        return this.basePrice;
    }
    public void setBasePrice(Double basePrice) {
        this.basePrice = basePrice;
    }

    public Double getCurrentDynamicPrice() {
        return this.currentDynamicPrice;
    }
    public void setCurrentDynamicPrice(Double currentDynamicPrice) {
        this.currentDynamicPrice = currentDynamicPrice;
    }

    public String getSensorStatus() {
        return this.sensorStatus;
    }
    public void setSensorStatus(String sensorStatus) {
        this.sensorStatus = sensorStatus;
    }
}
