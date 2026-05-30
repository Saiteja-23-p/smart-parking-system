package com.smartparking.repository;

import com.smartparking.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByHubIdOrderByCreatedAtDesc(Long hubId);
    List<Review> findByUserId(Long userId);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.hub.id = :hubId")
    Double findAverageRatingByHubId(Long hubId);

    long countByHubId(Long hubId);
    boolean existsByUserIdAndHubId(Long userId, Long hubId);
}
