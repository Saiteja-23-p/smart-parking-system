package com.smartparking.dto;

import java.time.LocalDateTime;
import java.util.List;

public class WalletDTO {
    private Long id;
    private Double balance;
    private String currency;
    private LocalDateTime lastToppedUp;
    private List<TransactionDTO> recentTransactions;

    public Long getId() {
        return this.id;
    }
    public void setId(Long id) {
        this.id = id;
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

    public List<TransactionDTO> getRecentTransactions() {
        return this.recentTransactions;
    }
    public void setRecentTransactions(List<TransactionDTO> recentTransactions) {
        this.recentTransactions = recentTransactions;
    }
}
