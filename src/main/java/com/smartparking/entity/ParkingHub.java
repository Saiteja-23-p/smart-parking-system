package com.smartparking.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "parking_hubs")
public class ParkingHub {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "hub_name", nullable = false, length = 100)
    private String hubName;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false, length = 100)
    private String city = "Hyderabad";

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;

    @Column(name = "hub_type", length = 30)
    private String hubType = "COMMERCIAL";

    @Column(name = "total_capacity")
    private Integer totalCapacity = 50;

    @Column(name = "total_floors")
    private Integer totalFloors = 1;

    @Column
    private Double rating = 4.0;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "ev_enabled")
    private Boolean evEnabled = false;

    @Column(name = "dynamic_pricing_enabled")
    private Boolean dynamicPricingEnabled = true;

    @Column(name = "operating_hours", length = 50)
    private String operatingHours = "06:00-23:00";

    @Column(name = "is_active")
    private Boolean isActive = true;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

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

    public User getOwner() {
        return this.owner;
    }
    public void setOwner(User owner) {
        this.owner = owner;
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

    public Boolean getIsActive() {
        return this.isActive;
    }
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Boolean getActive() {
        return this.isActive;
    }
    public void setActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return this.updatedAt;
    }
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
