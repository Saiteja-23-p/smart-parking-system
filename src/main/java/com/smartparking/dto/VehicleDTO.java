package com.smartparking.dto;

import java.time.LocalDateTime;

public class VehicleDTO {
    private Long id;
    private String plateNumber;
    private String vehicleType;
    private String brand;
    private String model;
    private String color;
    private String nickname;
    private Boolean isEv;
    private Double batteryCapacityKwh;
    private Boolean isDefault;

    public Long getId() {
        return this.id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getPlateNumber() {
        return this.plateNumber;
    }
    public void setPlateNumber(String plateNumber) {
        this.plateNumber = plateNumber;
    }

    public String getVehicleType() {
        return this.vehicleType;
    }
    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public String getBrand() {
        return this.brand;
    }
    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return this.model;
    }
    public void setModel(String model) {
        this.model = model;
    }

    public String getColor() {
        return this.color;
    }
    public void setColor(String color) {
        this.color = color;
    }

    public String getNickname() {
        return this.nickname;
    }
    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public Boolean getIsEv() {
        return this.isEv;
    }
    public void setIsEv(Boolean isEv) {
        this.isEv = isEv;
    }

    public Boolean getEv() {
        return this.isEv;
    }
    public void setEv(Boolean isEv) {
        this.isEv = isEv;
    }

    public Double getBatteryCapacityKwh() {
        return this.batteryCapacityKwh;
    }
    public void setBatteryCapacityKwh(Double batteryCapacityKwh) {
        this.batteryCapacityKwh = batteryCapacityKwh;
    }

    public Boolean getIsDefault() {
        return this.isDefault;
    }
    public void setIsDefault(Boolean isDefault) {
        this.isDefault = isDefault;
    }

    public Boolean getDefault() {
        return this.isDefault;
    }
    public void setDefault(Boolean isDefault) {
        this.isDefault = isDefault;
    }
}
