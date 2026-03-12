package com.carrentals.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cars")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long carId;

    @Column(nullable = false)
    private String make;

    @Column(nullable = false)
    private String model;

    @Column(name = "year_of_manufacture", nullable = false)
    private Integer year;

    @Column(nullable = false, unique = true)
    private String licensePlate;

    @Column(name = "car_type")
    private String carType; // sedan, suv, coupe, etc.

    @Column(name = "daily_rate")
    private Double dailyRate;

    @Column(name = "seats")
    private Integer seats;

    @Column(name = "transmission")
    private String transmission; // automatic, manual

    @Column(name = "fuel_type")
    private String fuelType; // petrol, diesel, electric

    @Column(name = "is_available")
    private Boolean isAvailable = true;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "created_at")
    private String createdAt;

    @Column(name = "updated_at")
    private String updatedAt;
}
