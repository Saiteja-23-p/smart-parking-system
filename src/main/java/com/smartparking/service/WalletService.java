package com.smartparking.service;

import com.smartparking.dto.WalletDTO;
import com.smartparking.entity.Transaction;
import com.smartparking.entity.User;
import com.smartparking.entity.Wallet;
import com.smartparking.exception.InsufficientBalanceException;
import com.smartparking.exception.ResourceNotFoundException;
import com.smartparking.repository.TransactionRepository;
import com.smartparking.repository.UserRepository;
import com.smartparking.repository.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class WalletService {

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    public WalletDTO getWallet(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        Wallet wallet = walletRepository.findByUserId(user.getId()).orElseGet(() -> createDefaultWallet(user));
        return mapToDTO(wallet);
    }

    public WalletDTO topUpWallet(String email, double amount, String paymentMethod) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        Wallet wallet = walletRepository.findByUserId(user.getId()).orElseGet(() -> createDefaultWallet(user));
        wallet.setBalance(wallet.getBalance() + amount);
        wallet.setLastToppedUp(LocalDateTime.now());
        wallet = walletRepository.save(wallet);

        // Record transaction
        Transaction tx = new Transaction();
        tx.setUser(user);
        tx.setAmount(amount);
        tx.setTransactionType("TOPUP");
        tx.setPaymentMethod(paymentMethod);
        tx.setStatus("COMPLETED");
        tx.setDescription("Wallet top-up via " + paymentMethod);
        transactionRepository.save(tx);

        return mapToDTO(wallet);
    }

    public void deductBalance(User user, double amount, String description) {
        Wallet wallet = walletRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Wallet not found"));

        if (wallet.getBalance() < amount) {
            throw new InsufficientBalanceException("Insufficient wallet balance. Please top up.");
        }

        wallet.setBalance(wallet.getBalance() - amount);
        walletRepository.save(wallet);

        // Record transaction
        Transaction tx = new Transaction();
        tx.setUser(user);
        tx.setAmount(amount);
        tx.setTransactionType("BOOKING_PAYMENT");
        tx.setPaymentMethod("WALLET");
        tx.setStatus("COMPLETED");
        tx.setDescription(description);
        transactionRepository.save(tx);
    }

    private Wallet createDefaultWallet(User user) {
        Wallet wallet = new Wallet();
        wallet.setUser(user);
        wallet.setBalance(0.0);
        wallet.setCurrency("INR");
        return walletRepository.save(wallet);
    }

    private WalletDTO mapToDTO(Wallet wallet) {
        WalletDTO dto = new WalletDTO();
        dto.setId(wallet.getId());
        dto.setBalance(wallet.getBalance());
        dto.setCurrency(wallet.getCurrency());
        dto.setLastToppedUp(wallet.getLastToppedUp());
        return dto;
    }
}
