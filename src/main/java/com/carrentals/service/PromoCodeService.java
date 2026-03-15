package com.carrentals.service;

import com.carrentals.entity.PromoCode;
import com.carrentals.repository.PromoCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class PromoCodeService {

    @Autowired
    private PromoCodeRepository promoCodeRepository;

    public PromoCode createPromoCode(PromoCode promoCode) {
        promoCode.setCreatedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        promoCode.setUpdatedAt(promoCode.getCreatedAt());
        promoCode.setCurrentUses(0);
        return promoCodeRepository.save(promoCode);
    }

    public Optional<PromoCode> validatePromoCode(String code) {
        Optional<PromoCode> promo = promoCodeRepository.findByCode(code);
        if (promo.isPresent()) {
            PromoCode p = promo.get();
            boolean isActive = Boolean.TRUE.equals(p.getIsActive());
            int current = p.getCurrentUses() != null ? p.getCurrentUses() : 0;
            int max = p.getMaxUses() != null ? p.getMaxUses() : Integer.MAX_VALUE;
            if (isActive && current < max) {
                return promo;
            }
        }
        return Optional.empty();
    }

    public Optional<PromoCode> getPromoCodeById(Long promoId) {
        return promoCodeRepository.findById(promoId);
    }

    public List<PromoCode> getAllPromoCodes() {
        return promoCodeRepository.findAll();
    }

    public PromoCode updatePromoCode(Long promoId, PromoCode promoDetails) {
        PromoCode promo = promoCodeRepository.findById(promoId)
                .orElseThrow(() -> new IllegalArgumentException("Promo code not found"));
        promo.setDiscountPercentage(promoDetails.getDiscountPercentage());
        promo.setDiscountAmount(promoDetails.getDiscountAmount());
        promo.setMaxUses(promoDetails.getMaxUses());
        promo.setIsActive(promoDetails.getIsActive());
        promo.setExpiryDate(promoDetails.getExpiryDate());
        promo.setDescription(promoDetails.getDescription());
        promo.setUpdatedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        return promoCodeRepository.save(promo);
    }

    public void deletePromoCode(Long promoId) {
        promoCodeRepository.deleteById(promoId);
    }

    // Helper methods for calculations and testing alignment
    public Optional<PromoCode> getPromoCodeByCode(String code) {
        return promoCodeRepository.findByCode(code);
    }

    public boolean isPromoCodeValid(String code) {
        Optional<PromoCode> promo = promoCodeRepository.findByCode(code);
        if (promo.isPresent()) {
            PromoCode p = promo.get();
            boolean isActive = Boolean.TRUE.equals(p.getIsActive());
            int current = p.getCurrentUses() != null ? p.getCurrentUses() : 0;
            int max = p.getMaxUses() != null ? p.getMaxUses() : Integer.MAX_VALUE;
            return isActive && current < max;
        }
        return false;
    }

    public void incrementUsageCount(String code) {
        promoCodeRepository.findByCode(code).ifPresent(p -> {
            int current = p.getCurrentUses() != null ? p.getCurrentUses() : 0;
            p.setCurrentUses(current + 1);
            p.setUpdatedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            promoCodeRepository.save(p);
        });
    }

    public double calculateDiscount(double price, double discountPercentage) {
        return (price * discountPercentage) / 100.0;
    }
}
