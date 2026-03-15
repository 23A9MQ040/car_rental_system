package com.carrentals.service;

import com.carrentals.entity.User;
import com.carrentals.repository.UserRepository;
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
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setUserId(1L);
        user.setEmail("john@example.com");
        user.setPassword("password123");
        user.setFullName("John Doe");
    }

    @Test
    void testCreateUser() {
        // Arrange
        when(userRepository.save(user)).thenReturn(user);

        // Act
        User result = userService.createUser(user);

        // Assert
        assertNotNull(result);
        assertEquals("john@example.com", result.getEmail());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testGetUserById_Found() {
        // Arrange
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        // Act
        Optional<User> result = userService.getUserById(1L);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("john@example.com", result.get().getEmail());
    }

    @Test
    void testGetUserById_NotFound() {
        // Arrange
        when(userRepository.findById(999L)).thenReturn(Optional.empty());

        // Act
        Optional<User> result = userService.getUserById(999L);

        // Assert
        assertFalse(result.isPresent());
    }

    @Test
    void testGetUserByUsername() {
        // Arrange
        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));

        // Act
        Optional<User> result = userService.getUserByUsername("john@example.com");

        // Assert
        assertTrue(result.isPresent());
        assertEquals("john@example.com", result.get().getEmail());
    }

    @Test
    void testGetUserByEmail() {
        // Arrange
        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));

        // Act
        Optional<User> result = userService.getUserByEmail("john@example.com");

        // Assert
        assertTrue(result.isPresent());
        assertEquals("John Doe", result.get().getFullName());
    }

    @Test
    void testUpdateUser() {
        // Arrange
        user.setFullName("John Smith");
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenReturn(user);

        // Act
        User result = userService.updateUser(1L, user);

        // Assert
        assertEquals("John Smith", result.getFullName());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testDeleteUser() {
        // Arrange
        long userId = 1L;

        // Act
        userService.deleteUser(userId);

        // Assert
        verify(userRepository, times(1)).deleteById(userId);
    }

    @Test
    void testGetAllUsers() {
        // Arrange
        User user2 = new User();
        user2.setUserId(2L);
        user2.setEmail("jane@example.com");
        List<User> users = Arrays.asList(user, user2);
        when(userRepository.findAll()).thenReturn(users);

        // Act
        List<User> result = userService.getAllUsers();

        // Assert
        assertEquals(2, result.size());
        verify(userRepository, times(1)).findAll();
    }

    @Test
    void testUserEmailValidation() {
        // Arrange
        String validEmail = "john@example.com";
        String invalidEmail = "invalid-email";

        // Act & Assert
        assertTrue(userService.isValidEmail(validEmail));
        assertFalse(userService.isValidEmail(invalidEmail));
    }

    @Test
    void testUserExists() {
        // Arrange
        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));
        when(userRepository.findByEmail("nonexistent")).thenReturn(Optional.empty());

        // Act & Assert
        assertTrue(userService.userExists("john@example.com"));
        assertFalse(userService.userExists("nonexistent"));
    }
}
