package com.carrentals.service;

import com.carrentals.entity.Car;
import com.carrentals.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    public Car addCar(Car car) {
        car.setCreatedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        car.setUpdatedAt(car.getCreatedAt());
        car.setIsAvailable(true);
        return carRepository.save(car);
    }

    public List<Car> getAllAvailableCars() {
        return carRepository.findByIsAvailableTrue();
    }

    public List<Car> getCarsByType(String carType) {
        return carRepository.findByIsAvailableTrueAndCarType(carType);
    }

    public Optional<Car> getCarById(Long carId) {
        return carRepository.findById(carId);
    }

    public List<Car> searchCars(String carType, Double maxPrice) {
        List<Car> cars = getAllAvailableCars();
        return cars.stream()
                .filter(car -> carType == null || car.getCarType().equalsIgnoreCase(carType))
                .filter(car -> maxPrice == null || car.getDailyRate() <= maxPrice)
                .collect(Collectors.toList());
    }

    public Car updateCar(Long carId, Car carDetails) {
        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new IllegalArgumentException("Car not found"));
        car.setMake(carDetails.getMake());
        car.setModel(carDetails.getModel());
        car.setYear(carDetails.getYear());
        car.setDailyRate(carDetails.getDailyRate());
        car.setSeats(carDetails.getSeats());
        car.setTransmission(carDetails.getTransmission());
        car.setFuelType(carDetails.getFuelType());
        car.setDescription(carDetails.getDescription());
        car.setImageUrl(carDetails.getImageUrl());
        car.setUpdatedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        return carRepository.save(car);
    }

    public void markCarAvailable(Long carId, boolean available) {
        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new IllegalArgumentException("Car not found"));
        car.setIsAvailable(available);
        car.setUpdatedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        carRepository.save(car);
    }

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public void deleteCar(Long carId) {
        carRepository.deleteById(carId);
    }
}
