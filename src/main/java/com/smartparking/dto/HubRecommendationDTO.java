package com.smartparking.dto;

import java.util.List;

public class HubRecommendationDTO {
    private Long hubId;
    private String hubName;
    private String address;
    private Double latitude;
    private Double longitude;
    private String hubType;
    private Double rating;
    private Double distanceKm;
    private Double score;            // AI recommendation score 0-100
    private Long availableSlots;
    private Double currentPrice;
    private Boolean evAvailable;
    private Integer estimatedWalkMinutes;
    private Double occupancyPct;
    private List<String> reasons;    // "Closest to you", "Best price", "EV charging available"
    private String matchLevel;       // PERFECT, GOOD, FAIR

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

    public String getAddress() {
        return this.address;
    }
    public void setAddress(String address) {
        this.address = address;
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

    public Double getRating() {
        return this.rating;
    }
    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Double getDistanceKm() {
        return this.distanceKm;
    }
    public void setDistanceKm(Double distanceKm) {
        this.distanceKm = distanceKm;
    }

    public Double getScore() {
        return this.score;
    }
    public void setScore(Double score) {
        this.score = score;
    }

    public Long getAvailableSlots() {
        return this.availableSlots;
    }
    public void setAvailableSlots(Long availableSlots) {
        this.availableSlots = availableSlots;
    }

    public Double getCurrentPrice() {
        return this.currentPrice;
    }
    public void setCurrentPrice(Double currentPrice) {
        this.currentPrice = currentPrice;
    }

    public Boolean getEvAvailable() {
        return this.evAvailable;
    }
    public void setEvAvailable(Boolean evAvailable) {
        this.evAvailable = evAvailable;
    }

    public Integer getEstimatedWalkMinutes() {
        return this.estimatedWalkMinutes;
    }
    public void setEstimatedWalkMinutes(Integer estimatedWalkMinutes) {
        this.estimatedWalkMinutes = estimatedWalkMinutes;
    }

    public Double getOccupancyPct() {
        return this.occupancyPct;
    }
    public void setOccupancyPct(Double occupancyPct) {
        this.occupancyPct = occupancyPct;
    }

    public List<String> getReasons() {
        return this.reasons;
    }
    public void setReasons(List<String> reasons) {
        this.reasons = reasons;
    }

    public String getMatchLevel() {
        return this.matchLevel;
    }
    public void setMatchLevel(String matchLevel) {
        this.matchLevel = matchLevel;
    }
}
