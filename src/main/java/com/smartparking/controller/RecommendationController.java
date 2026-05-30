package com.smartparking.controller;

import com.smartparking.dto.HubRecommendationDTO;
import com.smartparking.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin("*")
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    @GetMapping
    public ResponseEntity<List<HubRecommendationDTO>> getRecommendations(
            @RequestParam("lat") double lat,
            @RequestParam("lng") double lng,
            @RequestParam(value = "vehicleType", defaultValue = "CAR") String vehicleType,
            @RequestParam(value = "needsEv", defaultValue = "false") boolean needsEv) {
        
        return ResponseEntity.ok(recommendationService.getRecommendations(lat, lng, vehicleType, needsEv));
    }
}
