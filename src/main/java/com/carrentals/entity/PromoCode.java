package com.carrentals.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "promo_codes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PromoCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long promoId;

    @Column(nullable = false, unique = true)
    private String code;

    @Column(name = "discount_percentage")
    private Double discountPercentage;

    @Column(name = "discount_amount")
    private Double discountAmount;

    @Column(name = "max_uses")
    private Integer maxUses;

    @Column(name = "current_uses")
    private Integer currentUses = 0;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "expiry_date")
    private String expiryDate;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "created_at")
    private String createdAt;

    @Column(name = "updated_at")
    private String updatedAt;
}
