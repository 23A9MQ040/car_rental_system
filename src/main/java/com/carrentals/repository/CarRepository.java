package com.carrentals.repository;

import com.carrentals.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    List<Car> findByIsAvailableTrue();
    List<Car> findByCarType(String carType);
    List<Car> findByIsAvailableTrueAndCarType(String carType);
    Optional<Car> findByLicensePlate(String licensePlate);
}
