package com.smartparking.service;

import com.smartparking.dto.HubRecommendationDTO;
import com.smartparking.entity.ParkingHub;
import com.smartparking.repository.ParkingHubRepository;
import com.smartparking.repository.ParkingSlotRepository;
import com.smartparking.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    @Autowired
    private ParkingHubRepository hubRepository;

    @Autowired
    private ParkingSlotRepository slotRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    public List<HubRecommendationDTO> getRecommendations(double userLat, double userLng, String vehicleType, boolean needsEv) {
        // Find nearby hubs within 10km
        List<ParkingHub> nearbyHubs = hubRepository.findNearby(userLat, userLng, 10.0);
        
        return nearbyHubs.stream()
                .map(hub -> calculateRecommendationScore(hub, userLat, userLng, needsEv))
                .filter(dto -> dto.getScore() > 0) // Filter out zero scores (e.g., no availability)
                .sorted(Comparator.comparing(HubRecommendationDTO::getScore).reversed())
                .limit(5)
                .collect(Collectors.toList());
    }

    private HubRecommendationDTO calculateRecommendationScore(ParkingHub hub, double lat, double lng, boolean needsEv) {
        HubRecommendationDTO dto = new HubRecommendationDTO();
        dto.setHubId(hub.getId());
        dto.setHubName(hub.getHubName());
        dto.setAddress(hub.getAddress());
        dto.setLatitude(hub.getLatitude());
        dto.setLongitude(hub.getLongitude());
        dto.setHubType(hub.getHubType());
        
        Double avgRating = reviewRepository.findAverageRatingByHubId(hub.getId());
        dto.setRating(avgRating != null ? Math.round(avgRating * 10.0) / 10.0 : hub.getRating());
        
        // Calculate distance (Haversine formula approximated here just for display)
        double distance = calculateDistance(lat, lng, hub.getLatitude(), hub.getLongitude());
        dto.setDistanceKm(Math.round(distance * 10.0) / 10.0);
        dto.setEstimatedWalkMinutes((int) (distance * 12)); // Approx 12 mins per km walking
        
        long totalSlots = slotRepository.countByHubId(hub.getId());
        long availableSlots = slotRepository.countByHubIdAndStatus(hub.getId(), "AVAILABLE");
        dto.setAvailableSlots(availableSlots);
        dto.setOccupancyPct(totalSlots > 0 ? ((double) (totalSlots - availableSlots) / totalSlots) * 100 : 0.0);
        
        dto.setEvAvailable(hub.getEvEnabled());
        
        // AI Scoring Logic (Simplified Simulation)
        double score = 0;
        List<String> reasons = new ArrayList<>();
        
        if (availableSlots == 0) {
            dto.setScore(0.0);
            return dto;
        }

        // Distance factor (closer is better, max 40 points)
        double distanceScore = Math.max(0, 40 - (distance * 4)); 
        score += distanceScore;
        if (distance < 2.0) reasons.add("Very close to destination");
        
        // Rating factor (higher is better, max 30 points)
        double ratingScore = (dto.getRating() / 5.0) * 30;
        score += ratingScore;
        if (dto.getRating() >= 4.5) reasons.add("Highly rated by users");
        
        // Availability factor (more slots is better, max 20 points)
        double availabilityScore = Math.min(20, (availableSlots / 10.0) * 20);
        score += availabilityScore;
        if (availableSlots > 10) reasons.add("Plenty of slots available");
        
        // EV constraint
        if (needsEv) {
            if (hub.getEvEnabled()) {
                score += 10;
                reasons.add("Has EV charging stations");
            } else {
                score -= 50; // Heavily penalize if EV needed but not available
            }
        }
        
        dto.setScore(Math.round(Math.max(0, Math.min(100, score)) * 10.0) / 10.0);
        dto.setReasons(reasons);
        
        if (dto.getScore() >= 85) dto.setMatchLevel("PERFECT");
        else if (dto.getScore() >= 60) dto.setMatchLevel("GOOD");
        else dto.setMatchLevel("FAIR");
        
        return dto;
    }
    
    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        // Haversine formula
        final int R = 6371; // Earth radius in km
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
}
