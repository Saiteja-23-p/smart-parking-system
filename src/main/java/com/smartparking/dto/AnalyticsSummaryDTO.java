package com.smartparking.dto;

import java.util.Map;

public class AnalyticsSummaryDTO {
    private Long totalUsers;
    private Long totalHubs;
    private Long totalSlots;
    private Long availableSlots;
    private Long occupiedSlots;
    private Long reservedSlots;
    private Long activeBookings;
    private Long completedBookings;
    private Double totalRevenue;
    private Double todayRevenue;
    private Double averageOccupancyPct;
    private Long evChargingSessions;
    private Long activeEvSessions;
    private Map<String, Double> hourlyOccupancy;
    private Map<String, Long> hubBookingCounts;
    private Map<String, Double> revenueByHub;

    public Long getTotalUsers() {
        return this.totalUsers;
    }
    public void setTotalUsers(Long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public Long getTotalHubs() {
        return this.totalHubs;
    }
    public void setTotalHubs(Long totalHubs) {
        this.totalHubs = totalHubs;
    }

    public Long getTotalSlots() {
        return this.totalSlots;
    }
    public void setTotalSlots(Long totalSlots) {
        this.totalSlots = totalSlots;
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

    public Long getReservedSlots() {
        return this.reservedSlots;
    }
    public void setReservedSlots(Long reservedSlots) {
        this.reservedSlots = reservedSlots;
    }

    public Long getActiveBookings() {
        return this.activeBookings;
    }
    public void setActiveBookings(Long activeBookings) {
        this.activeBookings = activeBookings;
    }

    public Long getCompletedBookings() {
        return this.completedBookings;
    }
    public void setCompletedBookings(Long completedBookings) {
        this.completedBookings = completedBookings;
    }

    public Double getTotalRevenue() {
        return this.totalRevenue;
    }
    public void setTotalRevenue(Double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public Double getTodayRevenue() {
        return this.todayRevenue;
    }
    public void setTodayRevenue(Double todayRevenue) {
        this.todayRevenue = todayRevenue;
    }

    public Double getAverageOccupancyPct() {
        return this.averageOccupancyPct;
    }
    public void setAverageOccupancyPct(Double averageOccupancyPct) {
        this.averageOccupancyPct = averageOccupancyPct;
    }

    public Long getEvChargingSessions() {
        return this.evChargingSessions;
    }
    public void setEvChargingSessions(Long evChargingSessions) {
        this.evChargingSessions = evChargingSessions;
    }

    public Long getActiveEvSessions() {
        return this.activeEvSessions;
    }
    public void setActiveEvSessions(Long activeEvSessions) {
        this.activeEvSessions = activeEvSessions;
    }

    public Map<String, Double> getHourlyOccupancy() {
        return this.hourlyOccupancy;
    }
    public void setHourlyOccupancy(Map<String, Double> hourlyOccupancy) {
        this.hourlyOccupancy = hourlyOccupancy;
    }

    public Map<String, Long> getHubBookingCounts() {
        return this.hubBookingCounts;
    }
    public void setHubBookingCounts(Map<String, Long> hubBookingCounts) {
        this.hubBookingCounts = hubBookingCounts;
    }

    public Map<String, Double> getRevenueByHub() {
        return this.revenueByHub;
    }
    public void setRevenueByHub(Map<String, Double> revenueByHub) {
        this.revenueByHub = revenueByHub;
    }
}
