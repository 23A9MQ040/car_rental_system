package com.carrentals.service;

import com.carrentals.entity.Booking;
import com.carrentals.entity.Car;
import com.carrentals.entity.PromoCode;
import com.carrentals.repository.BookingRepository;
import com.carrentals.repository.CarRepository;
import com.carrentals.repository.PromoCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private PromoCodeRepository promoCodeRepository;

    public Booking createBooking(Booking booking) {
        Car car = carRepository.findById(booking.getCarId())
                .orElseThrow(() -> new IllegalArgumentException("Car not found"));

        if (!car.getIsAvailable()) {
            throw new IllegalArgumentException("Car is not available for booking");
        }

        // Calculate number of days
        LocalDate startDate = LocalDate.parse(booking.getStartDate());
        LocalDate endDate = LocalDate.parse(booking.getEndDate());
        long days = ChronoUnit.DAYS.between(startDate, endDate);
        
        if (days <= 0) {
            throw new IllegalArgumentException("End date must be after start date");
        }

        booking.setNumberOfDays((int) days);

        // Calculate base price
        double basePrice = car.getDailyRate() * days;

        // Apply promo code if provided
        if (booking.getPromoCode() != null && !booking.getPromoCode().isEmpty()) {
            Optional<PromoCode> promoOpt = promoCodeRepository.findByCode(booking.getPromoCode());
            if (promoOpt.isPresent()) {
                PromoCode promo = promoOpt.get();
                if (promo.getIsActive() && promo.getCurrentUses() < promo.getMaxUses()) {
                    double discount = 0;
                    if (promo.getDiscountPercentage() != null) {
                        discount = (basePrice * promo.getDiscountPercentage()) / 100;
                    } else if (promo.getDiscountAmount() != null) {
                        discount = promo.getDiscountAmount();
                    }
                    booking.setDiscountAmount(discount);
                    promo.setCurrentUses(promo.getCurrentUses() + 1);
                    promoCodeRepository.save(promo);
                }
            }
        }

        double totalPrice = basePrice - booking.getDiscountAmount();
        booking.setTotalPrice(totalPrice);
        booking.setStatus("confirmed");
        booking.setCreatedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        booking.setUpdatedAt(booking.getCreatedAt());

        // Mark car as unavailable
        car.setIsAvailable(false);
        car.setUpdatedAt(booking.getCreatedAt());
        carRepository.save(car);

        return bookingRepository.save(booking);
    }

    public Optional<Booking> getBookingById(Long bookingId) {
        return bookingRepository.findById(bookingId);
    }

    public List<Booking> getUserBookings(Long userId) {
        return bookingRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public List<Booking> getCarBookings(Long carId) {
        return bookingRepository.findByCarId(carId);
    }

    public void cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));

        booking.setStatus("cancelled");
        booking.setUpdatedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        bookingRepository.save(booking);

        // Mark car as available
        Car car = carRepository.findById(booking.getCarId()).orElse(null);
        if (car != null) {
            car.setIsAvailable(true);
            car.setUpdatedAt(booking.getUpdatedAt());
            carRepository.save(car);
        }
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getBookingsByStatus(String status) {
        return bookingRepository.findByStatus(status);
    }
}
