package com.carrentals.controller;

import com.carrentals.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-checkout-session")
    public ResponseEntity<Map<String, String>> createCheckoutSession(@RequestBody Map<String, Object> data) {
        try {
            Long bookingId = Long.valueOf(data.get("bookingId").toString());
            Double amount = Double.valueOf(data.get("amount").toString());
            
            String sessionUrl = paymentService.createCheckoutSession(bookingId, amount);
            
            Map<String, String> response = new HashMap<>();
            response.put("url", sessionUrl);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
