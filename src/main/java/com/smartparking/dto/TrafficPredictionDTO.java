package com.smartparking.dto;


public class TrafficPredictionDTO {
    private Long hubId;
    private String hubName;
    private Integer hour;
    private Integer dayOfWeek;
    private Double predictedOccupancyPct;
    private Double confidenceScore;
    private String congestionLevel; // LOW, MODERATE, HIGH, CRITICAL

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

    public Integer getHour() {
        return this.hour;
    }
    public void setHour(Integer hour) {
        this.hour = hour;
    }

    public Integer getDayOfWeek() {
        return this.dayOfWeek;
    }
    public void setDayOfWeek(Integer dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public Double getPredictedOccupancyPct() {
        return this.predictedOccupancyPct;
    }
    public void setPredictedOccupancyPct(Double predictedOccupancyPct) {
        this.predictedOccupancyPct = predictedOccupancyPct;
    }

    public Double getConfidenceScore() {
        return this.confidenceScore;
    }
    public void setConfidenceScore(Double confidenceScore) {
        this.confidenceScore = confidenceScore;
    }

    public String getCongestionLevel() {
        return this.congestionLevel;
    }
    public void setCongestionLevel(String congestionLevel) {
        this.congestionLevel = congestionLevel;
    }
}
