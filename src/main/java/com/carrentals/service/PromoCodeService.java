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
            if (p.getIsActive() && p.getCurrentUses() < p.getMaxUses()) {
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
}
