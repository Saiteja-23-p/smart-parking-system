package com.smartparking.repository;

import com.smartparking.entity.AnalyticsLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AnalyticsLogRepository extends JpaRepository<AnalyticsLog, Long> {
    List<AnalyticsLog> findByEventType(String eventType);
    List<AnalyticsLog> findByHubId(Long hubId);
    long countByEventType(String eventType);
}
