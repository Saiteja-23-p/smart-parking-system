package com.smartparking.repository;

import com.smartparking.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<Transaction> findByBookingId(Long bookingId);
    List<Transaction> findByTransactionType(String transactionType);
}
