# AP Car Rentals System

A complete full-stack car rental management system built with Spring Boot (backend) and vanilla JavaScript with HTML/CSS (frontend).

## Project Overview

AP Car Rentals is a comprehensive vehicle rental platform that allows users to:
- Browse available cars with filters
- Register and authenticate
- Make bookings with flexible dates
- Apply promo codes for discounts
- Manage their bookings
- Access admin dashboard for system management

## Project Structure

```
car-rental-system/
├── src/
│   ├── main/
│   │   ├── java/com/carrentals/
│   │   │   ├── controller/
│   │   │   │   ├── UserController.java
│   │   │   │   ├── CarController.java
│   │   │   │   ├── BookingController.java
│   │   │   │   └── AdminController.java
│   │   │   ├── service/
│   │   │   │   ├── UserService.java
│   │   │   │   ├── CarService.java
│   │   │   │   ├── BookingService.java
│   │   │   │   └── PromoCodeService.java
│   │   │   ├── entity/
│   │   │   │   ├── User.java
│   │   │   │   ├── Car.java
│   │   │   │   ├── Booking.java
│   │   │   │   └── PromoCode.java
│   │   │   ├── repository/
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── CarRepository.java
│   │   │   │   ├── BookingRepository.java
│   │   │   │   └── PromoCodeRepository.java
│   │   │   ├── config/
│   │   │   └── CarRentalApplication.java
│   │   ├── webapp/
│   │   │   ├── index.html
│   │   │   ├── html/
│   │   │   │   ├── login.html
│   │   │   │   ├── register.html
│   │   │   │   ├── browse-cars.html
│   │   │   │   ├── car-details.html
│   │   │   │   ├── booking.html
│   │   │   │   ├── user-dashboard.html
│   │   │   │   └── admin-dashboard.html
│   │   │   ├── css/
│   │   │   │   └── style.css
│   │   │   ├── js/
│   │   │   │   └── main.js (with fallback data)
│   │   │   └── images/
│   │   └── resources/
│   │       └── application.properties
│   └── test/
└── pom.xml
```

## Technology Stack

### Backend
- **Framework**: Spring Boot 3.1.5
- **Build Tool**: Maven
- **Java Version**: 17
- **Database**: H2 (in-memory) / MySQL (optional)
- **ORM**: JPA / Hibernate
- **Security**: Spring Security

### Frontend
- **HTML5**, **CSS3**, **JavaScript (ES6+)**
- **Storage**: Browser LocalStorage for fallback data
- **Responsive Design**: Mobile-friendly

## Features

### User Features
✅ User Registration & Authentication
✅ Browse Available Cars with Filters
✅ View Car Details and Specifications
✅ Make Bookings with Date Selection
✅ Apply Promo Codes
✅ View Booking History
✅ Cancel Bookings
✅ Manage User Profile

### Admin Features
✅ Manage Cars (Add, Update, Delete)
✅ View All Users
✅ Manage All Bookings
✅ Create & Manage Promo Codes
✅ Track Promo Code Usage

### System Features
✅ Price Calculation with Discount
✅ Car Availability Management
✅ Fallback Data Support (Works without backend)
✅ CORS Enabled for API Access
✅ RESTful API Architecture
✅ Responsive Frontend Design

## API Endpoints

### User Endpoints
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/{userId}` - Get user details
- `PUT /api/users/{userId}` - Update user profile
- `GET /api/users/email/{email}` - Get user by email

### Car Endpoints
- `GET /api/cars` - Get all available cars
- `GET /api/cars/{carId}` - Get car details
- `GET /api/cars/type/{carType}` - Get cars by type
- `GET /api/cars/search?carType=X&maxPrice=Y` - Search cars

### Booking Endpoints
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/{bookingId}` - Get booking details
- `GET /api/bookings/user/{userId}` - Get user bookings
- `DELETE /api/bookings/{bookingId}` - Cancel booking
- `GET /api/bookings` - Get all bookings

### Admin Endpoints
- `POST /api/admin/cars` - Add new car
- `GET /api/admin/cars` - Get all cars
- `PUT /api/admin/cars/{carId}` - Update car
- `DELETE /api/admin/cars/{carId}` - Delete car
- `GET /api/admin/users` - Get all users
- `DELETE /api/admin/users/{userId}` - Delete user
- `POST /api/admin/promo-codes` - Create promo code
- `GET /api/admin/promo-codes` - Get all promo codes
- `DELETE /api/admin/promo-codes/{promoId}` - Delete promo code

## Installation & Setup

### Prerequisites
- Java 17 or higher
- Maven 3.6 or higher
- A modern web browser

### Backend Setup

1. **Clone/Download the project**
```bash
cd f:\car re
```

2. **Build the project**
```bash
mvn clean compile
```

3. **Run the application**
```bash
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

4. **(Optional) Build JAR**
```bash
mvn clean package
java -jar target/car-rental-system-1.0.0.jar
```

### Frontend Setup

The frontend is automatically served by Spring Boot when the backend runs. Access it at:
- **Home**: http://localhost:8080/
- **Browse Cars**: http://localhost:8080/browse-cars.html
- **Admin Dashboard**: http://localhost:8080/admin-dashboard.html

## Default Test Data

The system comes with fallback data for testing:

### Admin User
- **Email**: admin@example.com
- **Password**: admin123
- **Role**: Admin

### Regular User
- **Email**: jane@example.com
- **Password**: jane123

### Available Cars
- Toyota Camry (Sedan, $45/day)
- Honda CR-V (SUV, $65/day)
- BMW 3 Series (Sedan, $85/day)
- Ford Mustang (Coupe, $95/day)
- Hyundai i20 (Hatchback, $35/day)

### Promo Codes
- **SAVE20**: 20% discount
- **WELCOME50**: $50 discount

## Usage Guide

### User Flow
1. **Register** → Create account with email and license number
2. **Login** → Authenticate with email and password
3. **Browse Cars** → View all available cars with filters
4. **Car Details** → Click on car to see full details
5. **Book** → Select dates and apply promo code if available
6. **Dashboard** → View bookings and profile

### Admin Flow
1. **Login** as admin user
2. **Manage Cars** → Add, update, or delete vehicles
3. **Manage Users** → View and manage user accounts
4. **View Bookings** → Monitor all system bookings
5. **Manage Promos** → Create and manage discount codes

## Fallback Data System

The frontend uses browser LocalStorage to store data when the backend is unavailable:
- **Cars data** saved in `cars_data`
- **Bookings data** saved in `bookings_data`
- **User session** saved in `current_user`

This ensures the application is functional even without a backend server.

## Database Schema

### users
- userId (PK)
- email (Unique)
- password
- fullName
- phoneNumber
- licenseNumber
- isAdmin
- createdAt, updatedAt

### cars
- carId (PK)
- make, model, year
- licensePlate (Unique)
- carType
- dailyRate
- seats
- transmission
- fuelType
- isAvailable
- imageUrl
- description
- createdAt, updatedAt

### bookings
- bookingId (PK)
- userId (FK)
- carId (FK)
- startDate, endDate
- totalPrice
- promoCode
- discountAmount
- status
- pickupLocation, dropoffLocation
- numberOfDays
- createdAt, updatedAt

### promo_codes
- promoId (PK)
- code (Unique)
- discountPercentage
- discountAmount
- maxUses, currentUses
- isActive
- expiryDate
- description
- createdAt, updatedAt

## Configuration

Edit `src/main/resources/application.properties` to configure:

```properties
# Server
server.port=8080

# Database
spring.datasource.url=jdbc:h2:mem:cardb
spring.jpa.hibernate.ddl-auto=create-drop

# Enable H2 Console
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```

## Troubleshooting

### Issue: Frontend can't connect to backend
**Solution**: The frontend has fallback data. Check browser console for errors. Ensure backend is running on port 8080.

### Issue: H2 Database Issues
**Solution**: Clear browser cache and localStorage, restart the application.

### Issue: Cars not showing
**Solution**: Check that `src/main/webapp/js/main.js` has fallback data in `fallbackData.cars`.

## Testing Checklist

- [ ] Register new user account
- [ ] Login with valid credentials
- [ ] View all available cars
- [ ] Filter cars by type and price
- [ ] View car details
- [ ] Make a booking with promo code
- [ ] View bookings in user dashboard
- [ ] Cancel a booking
- [ ] Admin: Add new car
- [ ] Admin: Delete car
- [ ] Admin: View all users
- [ ] Admin: Create promo code
- [ ] Test on mobile devices
- [ ] Verify images load correctly

## Future Enhancements

- [ ] Payment Gateway Integration (Stripe/PayPal)
- [ ] Email Notifications
- [ ] SMS Booking Confirmation
- [ ] Insurance Options
- [ ] Advanced Search & Filters
- [ ] Review & Rating System
- [ ] Driver History Reports
- [ ] Loyalty Program
- [ ] Multi-language Support
- [ ] PDF Invoice Generation

## Security Notes

⚠️ **Current Implementation**: Passwords are stored as plain text for demo purposes.
✅ **Production Implementation**: Use Spring Security with BCryptPasswordEncoder.

## License

This project is created for educational purposes.

## Support

For issues or questions, please refer to the inline code comments or the controller classes.

---

**Created**: March 2026
**Version**: 1.0.0
**Status**: Complete and Ready for Testing
