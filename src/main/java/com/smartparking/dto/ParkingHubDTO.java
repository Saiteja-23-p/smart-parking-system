package com.smartparking.dto;

import java.util.List;

public class ParkingHubDTO {
    private Long id;
    private String hubName;
    private String address;
    private String city;
    private Double latitude;
    private Double longitude;
    private String hubType;
    private Integer totalCapacity;
    private Integer totalFloors;
    private Double rating;
    private String imageUrl;
    private Boolean evEnabled;
    private Boolean dynamicPricingEnabled;
    private String operatingHours;
    private Long ownerId;
    private String ownerName;

    // Live computed fields
    private Long availableSlots;
    private Long occupiedSlots;
    private Long totalSlots;
    private Double occupancyPct;
    private Double lowestPrice;
    private Double highestPrice;
    private Integer evChargersAvailable;
    private Double distanceKm;
    private Integer reviewCount;
    private Boolean isFavorited;
    private List<SlotDTO> slots;

    public Long getId() {
        return this.id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getHubName() {
        return this.hubName;
    }
    public void setHubName(String hubName) {
        this.hubName = hubName;
    }

    public String getAddress() {
        return this.address;
    }
    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return this.city;
    }
    public void setCity(String city) {
        this.city = city;
    }

    public Double getLatitude() {
        return this.latitude;
    }
    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return this.longitude;
    }
    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getHubType() {
        return this.hubType;
    }
    public void setHubType(String hubType) {
        this.hubType = hubType;
    }

    public Integer getTotalCapacity() {
        return this.totalCapacity;
    }
    public void setTotalCapacity(Integer totalCapacity) {
        this.totalCapacity = totalCapacity;
    }

    public Integer getTotalFloors() {
        return this.totalFloors;
    }
    public void setTotalFloors(Integer totalFloors) {
        this.totalFloors = totalFloors;
    }

    public Double getRating() {
        return this.rating;
    }
    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getImageUrl() {
        return this.imageUrl;
    }
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Boolean getEvEnabled() {
        return this.evEnabled;
    }
    public void setEvEnabled(Boolean evEnabled) {
        this.evEnabled = evEnabled;
    }

    public Boolean getDynamicPricingEnabled() {
        return this.dynamicPricingEnabled;
    }
    public void setDynamicPricingEnabled(Boolean dynamicPricingEnabled) {
        this.dynamicPricingEnabled = dynamicPricingEnabled;
    }

    public String getOperatingHours() {
        return this.operatingHours;
    }
    public void setOperatingHours(String operatingHours) {
        this.operatingHours = operatingHours;
    }

    public Long getOwnerId() {
        return this.ownerId;
    }
    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public String getOwnerName() {
        return this.ownerName;
    }
    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public Long getAvailableSlots() {
        return this.availableSlots;
    }
    public void setAvailableSlots(Long availableSlots) {
        this.availableSlots = availableSlots;
    }

    public Long getOccupiedSlots() {
        return this.occupiedSlots;
    }
    public void setOccupiedSlots(Long occupiedSlots) {
        this.occupiedSlots = occupiedSlots;
    }

    public Long getTotalSlots() {
        return this.totalSlots;
    }
    public void setTotalSlots(Long totalSlots) {
        this.totalSlots = totalSlots;
    }

    public Double getOccupancyPct() {
        return this.occupancyPct;
    }
    public void setOccupancyPct(Double occupancyPct) {
        this.occupancyPct = occupancyPct;
    }

    public Double getLowestPrice() {
        return this.lowestPrice;
    }
    public void setLowestPrice(Double lowestPrice) {
        this.lowestPrice = lowestPrice;
    }

    public Double getHighestPrice() {
        return this.highestPrice;
    }
    public void setHighestPrice(Double highestPrice) {
        this.highestPrice = highestPrice;
    }

    public Integer getEvChargersAvailable() {
        return this.evChargersAvailable;
    }
    public void setEvChargersAvailable(Integer evChargersAvailable) {
        this.evChargersAvailable = evChargersAvailable;
    }

    public Double getDistanceKm() {
        return this.distanceKm;
    }
    public void setDistanceKm(Double distanceKm) {
        this.distanceKm = distanceKm;
    }

    public Integer getReviewCount() {
        return this.reviewCount;
    }
    public void setReviewCount(Integer reviewCount) {
        this.reviewCount = reviewCount;
    }

    public Boolean getIsFavorited() {
        return this.isFavorited;
    }
    public void setIsFavorited(Boolean isFavorited) {
        this.isFavorited = isFavorited;
    }

    public Boolean getFavorited() {
        return this.isFavorited;
    }
    public void setFavorited(Boolean isFavorited) {
        this.isFavorited = isFavorited;
    }

    public List<SlotDTO> getSlots() {
        return this.slots;
    }
    public void setSlots(List<SlotDTO> slots) {
        this.slots = slots;
    }
}
