package com.carrentals.service;

import com.carrentals.entity.Car;
import com.carrentals.repository.CarRepository;
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
class CarServiceTest {

    @Mock
    private CarRepository carRepository;

    @InjectMocks
    private CarService carService;

    private Car availableCar;
    private Car unavailableCar;

    @BeforeEach
    void setUp() {
        availableCar = new Car();
        availableCar.setCarId(1L);
        availableCar.setModel("Toyota Camry");
        availableCar.setIsAvailable(true);
        availableCar.setDailyRate(50.0);

        unavailableCar = new Car();
        unavailableCar.setCarId(2L);
        unavailableCar.setModel("Honda Civic");
        unavailableCar.setIsAvailable(false);
        unavailableCar.setDailyRate(45.0);
    }

    @Test
    void testGetAllAvailableCars() {
        // Arrange
        List<Car> availableCars = Arrays.asList(availableCar);
        when(carRepository.findByIsAvailableTrue()).thenReturn(availableCars);

        // Act
        List<Car> result = carService.getAllAvailableCars();

        // Assert
        assertEquals(1, result.size());
        assertEquals("Toyota Camry", result.get(0).getModel());
        assertTrue(result.get(0).getIsAvailable());
        verify(carRepository, times(1)).findByIsAvailableTrue();
    }

    @Test
    void testGetCarById_Found() {
        // Arrange
        when(carRepository.findById(1L)).thenReturn(Optional.of(availableCar));

        // Act
        Optional<Car> result = carService.getCarById(1L);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("Toyota Camry", result.get().getModel());
        verify(carRepository, times(1)).findById(1L);
    }

    @Test
    void testGetCarById_NotFound() {
        // Arrange
        when(carRepository.findById(999L)).thenReturn(Optional.empty());

        // Act
        Optional<Car> result = carService.getCarById(999L);

        // Assert
        assertFalse(result.isPresent());
        verify(carRepository, times(1)).findById(999L);
    }

    @Test
    void testAddCar() {
        // Arrange
        when(carRepository.save(availableCar)).thenReturn(availableCar);

        // Act
        Car result = carService.addCar(availableCar);

        // Assert
        assertNotNull(result);
        assertEquals("Toyota Camry", result.getModel());
        verify(carRepository, times(1)).save(availableCar);
    }

    @Test
    void testUpdateCar() {
        // Arrange
        availableCar.setModel("Toyota Camry 2024");
        when(carRepository.save(availableCar)).thenReturn(availableCar);

        // Act
        Car result = carService.updateCar(availableCar);

        // Assert
        assertEquals("Toyota Camry 2024", result.getModel());
        verify(carRepository, times(1)).save(availableCar);
    }

    @Test
    void testDeleteCar() {
        // Arrange
        long carId = 1L;

        // Act
        carService.deleteCar(carId);

        // Assert
        verify(carRepository, times(1)).deleteById(carId);
    }

    @Test
    void testGetAllAvailableCars_EmptyList() {
        // Arrange
        when(carRepository.findByIsAvailableTrue()).thenReturn(Arrays.asList());

        // Act
        List<Car> result = carService.getAllAvailableCars();

        // Assert
        assertEquals(0, result.size());
        assertTrue(result.isEmpty());
    }

    @Test
    void testGetDailyRate() {
        // Arrange
        when(carRepository.findById(1L)).thenReturn(Optional.of(availableCar));

        // Act
        Optional<Car> car = carService.getCarById(1L);

        // Assert
        assertTrue(car.isPresent());
        assertEquals(50.0, car.get().getDailyRate());
    }
}
