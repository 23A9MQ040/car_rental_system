package com.carrentals.controller;

import com.carrentals.entity.Car;
import com.carrentals.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "*")
public class CarController {

    @Autowired
    private CarService carService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllAvailableCars() {
        try {
            List<Car> cars = carService.getAllAvailableCars();
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

    @GetMapping("/{carId}")
    public ResponseEntity<Map<String, Object>> getCarById(@PathVariable Long carId) {
        try {
            Optional<Car> car = carService.getCarById(carId);
            if (car.isPresent()) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("car", car.get());
                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Car not found");
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/type/{carType}")
    public ResponseEntity<Map<String, Object>> getCarsByType(@PathVariable String carType) {
        try {
            List<Car> cars = carService.getCarsByType(carType);
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

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchCars(
            @RequestParam(required = false) String carType,
            @RequestParam(required = false) Double maxPrice) {
        try {
            List<Car> cars = carService.searchCars(carType, maxPrice);
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
}
