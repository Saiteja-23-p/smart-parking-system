package com.smartparking.controller;

import com.smartparking.dto.WalletDTO;
import com.smartparking.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wallet")
@CrossOrigin("*")
public class WalletController {

    @Autowired
    private WalletService walletService;

    @GetMapping
    public ResponseEntity<WalletDTO> getWallet(Authentication authentication) {
        return ResponseEntity.ok(walletService.getWallet(authentication.getName()));
    }

    @PostMapping("/topup")
    public ResponseEntity<WalletDTO> topUpWallet(
            Authentication authentication,
            @RequestParam("amount") double amount,
            @RequestParam(value = "paymentMethod", defaultValue = "CARD") String paymentMethod) {
        return ResponseEntity.ok(walletService.topUpWallet(authentication.getName(), amount, paymentMethod));
    }
}
