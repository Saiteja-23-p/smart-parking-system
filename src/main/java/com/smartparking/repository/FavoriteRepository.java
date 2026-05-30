package com.smartparking.repository;

import com.smartparking.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUserId(Long userId);
    boolean existsByUserIdAndHubId(Long userId, Long hubId);
    Optional<Favorite> findByUserIdAndHubId(Long userId, Long hubId);
}
