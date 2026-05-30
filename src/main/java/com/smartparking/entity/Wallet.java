package com.smartparking.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "wallets")
public class Wallet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column
    private Double balance = 0.0;

    @Column(length = 10)
    private String currency = "INR";

    @Column(name = "last_topped_up")
    private LocalDateTime lastToppedUp;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public Long getId() {
        return this.id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return this.user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    public Double getBalance() {
        return this.balance;
    }
    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public String getCurrency() {
        return this.currency;
    }
    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public LocalDateTime getLastToppedUp() {
        return this.lastToppedUp;
    }
    public void setLastToppedUp(LocalDateTime lastToppedUp) {
        this.lastToppedUp = lastToppedUp;
    }

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
