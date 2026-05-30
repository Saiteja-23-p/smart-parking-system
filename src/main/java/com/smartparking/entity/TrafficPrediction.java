package com.smartparking.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "traffic_predictions")
public class TrafficPrediction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hub_id", nullable = false)
    private ParkingHub hub;

    @Column(name = "prediction_hour", nullable = false)
    private Integer predictionHour;

    @Column(name = "day_of_week", nullable = false)
    private Integer dayOfWeek;

    @Column(name = "predicted_occupancy_pct", nullable = false)
    private Double predictedOccupancyPct;

    @Column(name = "confidence_score")
    private Double confidenceScore = 0.85;

    @CreationTimestamp
    @Column(name = "predicted_at", updatable = false)
    private LocalDateTime predictedAt;

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

    public Integer getPredictionHour() {
        return this.predictionHour;
    }
    public void setPredictionHour(Integer predictionHour) {
        this.predictionHour = predictionHour;
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

    public LocalDateTime getPredictedAt() {
        return this.predictedAt;
    }
    public void setPredictedAt(LocalDateTime predictedAt) {
        this.predictedAt = predictedAt;
    }
}
