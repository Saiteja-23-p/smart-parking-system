package com.smartparking.dto;


public class SlotDTO {
    private Long id;
    private Long hubId;
    private Integer floorLevel;
    private String slotNumber;
    private String type;
    private String status;
    private String vehicleType;
    private Boolean isEvCharging;
    private String chargerType;
    private Double basePrice;
    private Double currentDynamicPrice;
    private String sensorStatus;
    private Double surgeMultiplier;

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

    public Double getSurgeMultiplier() {
        return this.surgeMultiplier;
    }
    public void setSurgeMultiplier(Double surgeMultiplier) {
        this.surgeMultiplier = surgeMultiplier;
    }
}
