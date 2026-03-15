package com.carrentals.service;

import com.carrentals.entity.PromoCode;
import com.carrentals.repository.PromoCodeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@SuppressWarnings("null")
class PromoCodeServiceTest {

    @Mock
    private PromoCodeRepository promoCodeRepository;

    @InjectMocks
    private PromoCodeService promoCodeService;

    private PromoCode promoCode;

    @BeforeEach
    void setUp() {
        promoCode = new PromoCode();
        promoCode.setPromoId(1L);
        promoCode.setCode("SAVE20");
        promoCode.setDiscountPercentage(20.0);
        promoCode.setMaxUses(100);
        promoCode.setCurrentUses(0);
    }

    @Test
    void testCreatePromoCode() {
        // Arrange
        when(promoCodeRepository.save(promoCode)).thenReturn(promoCode);

        // Act
        PromoCode result = promoCodeService.createPromoCode(promoCode);

        // Assert
        assertNotNull(result);
        assertEquals("SAVE20", result.getCode());
        assertEquals(20.0, result.getDiscountPercentage());
        verify(promoCodeRepository, times(1)).save(promoCode);
    }

    @Test
    void testGetPromoCodeByCode_Found() {
        // Arrange
        when(promoCodeRepository.findByCode("SAVE20")).thenReturn(Optional.of(promoCode));

        // Act
        Optional<PromoCode> result = promoCodeService.getPromoCodeByCode("SAVE20");

        // Assert
        assertTrue(result.isPresent());
        assertEquals("SAVE20", result.get().getCode());
        verify(promoCodeRepository, times(1)).findByCode("SAVE20");
    }

    @Test
    void testGetPromoCodeByCode_NotFound() {
        // Arrange
        when(promoCodeRepository.findByCode("INVALID")).thenReturn(Optional.empty());

        // Act
        Optional<PromoCode> result = promoCodeService.getPromoCodeByCode("INVALID");

        // Assert
        assertFalse(result.isPresent());
    }

    @Test
    void testGetPromoCodeById() {
        // Arrange
        when(promoCodeRepository.findById(1L)).thenReturn(Optional.of(promoCode));

        // Act
        Optional<PromoCode> result = promoCodeService.getPromoCodeById(1L);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(1L, result.get().getPromoId());
    }

    @Test
    void testUpdatePromoCode() {
        // Arrange
        promoCode.setDiscountPercentage(30.0);
        when(promoCodeRepository.findById(promoCode.getPromoId())).thenReturn(Optional.of(promoCode));
        when(promoCodeRepository.save(promoCode)).thenReturn(promoCode);

        // Act
        PromoCode result = promoCodeService.updatePromoCode(promoCode.getPromoId(), promoCode);

        // Assert
        assertEquals(30.0, result.getDiscountPercentage());
        verify(promoCodeRepository, times(1)).save(promoCode);
    }

    @Test
    void testDeletePromoCode() {
        // Arrange
        long promoCodeId = 1L;

        // Act
        promoCodeService.deletePromoCode(promoCodeId);

        // Assert
        verify(promoCodeRepository, times(1)).deleteById(promoCodeId);
    }

    @Test
    void testIsPromoCodeValid_WithinLimit() {
        // Arrange
        when(promoCodeRepository.findByCode("SAVE20")).thenReturn(Optional.of(promoCode));

        // Act
        boolean result = promoCodeService.isPromoCodeValid("SAVE20");

        // Assert
        assertTrue(result);
    }

    @Test
    void testIsPromoCodeValid_ExceededLimit() {
        // Arrange
        promoCode.setCurrentUses(100);
        promoCode.setMaxUses(100);
        when(promoCodeRepository.findByCode("SAVE20")).thenReturn(Optional.of(promoCode));

        // Act
        boolean result = promoCodeService.isPromoCodeValid("SAVE20");

        // Assert
        assertFalse(result);
    }

    @Test
    void testGetAllPromoCodes() {
        // Arrange
        PromoCode promoCode2 = new PromoCode();
        promoCode2.setPromoId(2L);
        promoCode2.setCode("SAVE50");
        promoCode2.setDiscountPercentage(50.0);
        List<PromoCode> promoCodes = Arrays.asList(promoCode, promoCode2);
        when(promoCodeRepository.findAll()).thenReturn(promoCodes);

        // Act
        List<PromoCode> result = promoCodeService.getAllPromoCodes();

        // Assert
        assertEquals(2, result.size());
        verify(promoCodeRepository, times(1)).findAll();
    }

    @Test
    void testIncrementUsageCount() {
        // Arrange
        when(promoCodeRepository.findByCode("SAVE20")).thenReturn(Optional.of(promoCode));
        when(promoCodeRepository.save(promoCode)).thenReturn(promoCode);

        // Act
        promoCodeService.incrementUsageCount("SAVE20");

        // Assert
        assertEquals(1, promoCode.getCurrentUses());
        verify(promoCodeRepository, times(1)).save(promoCode);
    }

    @Test
    void testCalculateDiscount() {
        // Arrange
        double price = 100.0;
        double discountPercentage = 20.0;

        // Act
        double result = promoCodeService.calculateDiscount(price, discountPercentage);

        // Assert
        assertEquals(20.0, result);
    }
}
