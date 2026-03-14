package com.carrentals.service;

import com.carrentals.entity.Booking;
import com.carrentals.entity.Car;
import com.carrentals.entity.PromoCode;
import com.carrentals.repository.BookingRepository;
import com.carrentals.repository.CarRepository;
import com.carrentals.repository.PromoCodeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BookingServiceTest {

    @Mock
    private BookingRepository bookingRepository;

    @Mock
    private CarRepository carRepository;

    @Mock
    private PromoCodeRepository promoCodeRepository;

    @InjectMocks
    private BookingService bookingService;

    private Booking booking;
    private Car car;
    private PromoCode promoCode;

    @BeforeEach
    void setUp() {
        car = new Car();
        car.setCarId(1L);
        car.setModel("Toyota Camry");
        car.setIsAvailable(true);
        car.setDailyRate(50.0);

        booking = new Booking();
        booking.setBookingId(1L);
        booking.setUserId(1L);
        booking.setCarId(1L);
        booking.setStartDate("2026-03-15");
        booking.setEndDate("2026-03-20");
        booking.setPickupLocation("Downtown");
        booking.setDropoffLocation("Airport");

        promoCode = new PromoCode();
        promoCode.setPromoCodeId(1L);
        promoCode.setCode("SAVE20");
        promoCode.setDiscountPercentage(20.0);
    }

    @Test
    void testCreateBooking_Success() {
        // Arrange
        when(carRepository.findById(1L)).thenReturn(Optional.of(car));
        when(bookingRepository.save(booking)).thenReturn(booking);

        // Act
        Booking result = bookingService.createBooking(booking);

        // Assert
        assertNotNull(result);
        assertEquals(1L, result.getBookingId());
        assertEquals(5, result.getNumberOfDays()); // From March 15 to 20
        verify(carRepository, times(1)).findById(1L);
        verify(bookingRepository, times(1)).save(booking);
    }

    @Test
    void testCreateBooking_CarNotAvailable() {
        // Arrange
        car.setIsAvailable(false);
        when(carRepository.findById(1L)).thenReturn(Optional.of(car));

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> {
            bookingService.createBooking(booking);
        });
    }

    @Test
    void testCreateBooking_CarNotFound() {
        // Arrange
        when(carRepository.findById(999L)).thenReturn(Optional.empty());
        booking.setCarId(999L);

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> {
            bookingService.createBooking(booking);
        });
    }

    @Test
    void testCreateBooking_InvalidDates() {
        // Arrange
        booking.setStartDate("2026-03-20");
        booking.setEndDate("2026-03-15"); // End before start
        when(carRepository.findById(1L)).thenReturn(Optional.of(car));

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> {
            bookingService.createBooking(booking);
        });
    }

    @Test
    void testGetBookingById_Found() {
        // Arrange
        when(bookingRepository.findById(1L)).thenReturn(Optional.of(booking));

        // Act
        Optional<Booking> result = bookingService.getBookingById(1L);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(1L, result.get().getBookingId());
    }

    @Test
    void testGetBookingById_NotFound() {
        // Arrange
        when(bookingRepository.findById(999L)).thenReturn(Optional.empty());

        // Act
        Optional<Booking> result = bookingService.getBookingById(999L);

        // Assert
        assertFalse(result.isPresent());
    }

    @Test
    void testApplyPromoCode() {
        // Arrange
        when(promoCodeRepository.findByCode("SAVE20")).thenReturn(Optional.of(promoCode));
        booking.setTotalPrice(100.0);

        // Act
        bookingService.applyPromoCode(booking, "SAVE20");

        // Assert
        assertEquals(20.0, booking.getDiscountAmount()); // 20% of 100
        verify(promoCodeRepository, times(1)).findByCode("SAVE20");
    }

    @Test
    void testApplyPromoCode_InvalidCode() {
        // Arrange
        when(promoCodeRepository.findByCode("INVALID")).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> {
            bookingService.applyPromoCode(booking, "INVALID");
        });
    }

    @Test
    void testCalculateTotalPrice() {
        // Arrange
        booking.setNumberOfDays(5);
        double expectedPrice = 50.0 * 5; // 250

        // Act
        double result = bookingService.calculateTotalPrice(booking.getNumberOfDays(), car.getDailyRate());

        // Assert
        assertEquals(expectedPrice, result);
    }

    @Test
    void testCancelBooking() {
        // Arrange
        when(bookingRepository.findById(1L)).thenReturn(Optional.of(booking));
        when(bookingRepository.save(booking)).thenReturn(booking);

        // Act
        bookingService.cancelBooking(1L);

        // Assert
        assertEquals("cancelled", booking.getStatus());
        verify(bookingRepository, times(1)).save(booking);
    }

    @Test
    void testNumberOfDaysBetweenDates() {
        // Arrange
        booking.setStartDate("2026-03-15");
        booking.setEndDate("2026-03-20");

        // Act
        when(carRepository.findById(1L)).thenReturn(Optional.of(car));
        Booking result = bookingService.createBooking(booking);

        // Assert
        assertEquals(5, result.getNumberOfDays());
    }
}
