package com.smartparking.repository;

import com.smartparking.entity.TrafficPrediction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TrafficPredictionRepository extends JpaRepository<TrafficPrediction, Long> {
    List<TrafficPrediction> findByHubIdAndDayOfWeek(Long hubId, Integer dayOfWeek);
    List<TrafficPrediction> findByHubId(Long hubId);
}
