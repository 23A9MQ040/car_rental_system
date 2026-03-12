package com.carrentals.controller;

import com.carrentals.entity.Car;
import com.carrentals.entity.PromoCode;
import com.carrentals.entity.User;
import com.carrentals.service.CarService;
import com.carrentals.service.PromoCodeService;
import com.carrentals.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private CarService carService;

    @Autowired
    private UserService userService;

    @Autowired
    private PromoCodeService promoCodeService;

    // Car Management
    @PostMapping("/cars")
    public ResponseEntity<Map<String, Object>> addCar(@RequestBody Car car) {
        try {
            Car newCar = carService.addCar(car);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Car added successfully");
            response.put("car", newCar);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/cars")
    public ResponseEntity<Map<String, Object>> getAllCars() {
        try {
            List<Car> cars = carService.getAllCars();
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("cars", cars);
            response.put("count", cars.size());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/cars/{carId}")
    public ResponseEntity<Map<String, Object>> updateCar(@PathVariable Long carId, @RequestBody Car carDetails) {
        try {
            Car updatedCar = carService.updateCar(carId, carDetails);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Car updated successfully");
            response.put("car", updatedCar);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/cars/{carId}")
    public ResponseEntity<Map<String, Object>> deleteCar(@PathVariable Long carId) {
        try {
            carService.deleteCar(carId);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Car deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    // User Management
    @GetMapping("/users")
    public ResponseEntity<Map<String, Object>> getAllUsers() {
        try {
            List<User> users = userService.getAllUsers();
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("users", users);
            response.put("count", users.size());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<Map<String, Object>> deleteUser(@PathVariable Long userId) {
        try {
            userService.deleteUser(userId);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "User deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    // Promo Code Management
    @PostMapping("/promo-codes")
    public ResponseEntity<Map<String, Object>> createPromoCode(@RequestBody PromoCode promoCode) {
        try {
            PromoCode newPromo = promoCodeService.createPromoCode(promoCode);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Promo code created successfully");
            response.put("promoCode", newPromo);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/promo-codes")
    public ResponseEntity<Map<String, Object>> getAllPromoCodes() {
        try {
            List<PromoCode> promoCodes = promoCodeService.getAllPromoCodes();
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("promoCodes", promoCodes);
            response.put("count", promoCodes.size());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/promo-codes/{promoId}")
    public ResponseEntity<Map<String, Object>> deletePromoCode(@PathVariable Long promoId) {
        try {
            promoCodeService.deletePromoCode(promoId);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Promo code deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
