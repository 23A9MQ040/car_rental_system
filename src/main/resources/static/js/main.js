// ===== API Configuration =====
const API_BASE_URL = 'http://localhost:8081/api';

// ===== CURRENCY CONFIGURATION =====
const EXCHANGE_RATES = {
    USD: 1,
    EUR: 0.92,
    INR: 83.15
};

const CURRENCY_SYMBOLS = {
    USD: '$',
    EUR: '€',
    INR: '₹'
};

function formatAllCurrencies(usdAmount) {
    if (!usdAmount) return '';
    const results = [];
    for (const [currency, rate] of Object.entries(EXCHANGE_RATES)) {
        const converted = (usdAmount * rate).toFixed(2);
        results.push(`${CURRENCY_SYMBOLS[currency]}${converted}`);
    }
    return results.join(' • ');
}

// ===== FALLBACK DATA (In-memory database when backend is unavailable) =====
const fallbackData = {
    users: [
        {
            userId: 1,
            fullName: "John Admin",
            email: "admin@example.com",
            password: "admin123",
            phoneNumber: "555-0001",
            licenseNumber: "DL123456",
            isAdmin: true,
            createdAt: "2026-03-01 10:00:00",
            updatedAt: "2026-03-01 10:00:00"
        },
        {
            userId: 2,
            fullName: "Jane Doe",
            email: "jane@example.com",
            password: "jane123",
            phoneNumber: "555-0002",
            licenseNumber: "DL654321",
            isAdmin: false,
            createdAt: "2026-03-02 10:00:00",
            updatedAt: "2026-03-02 10:00:00"
        },
        {
            userId: 3,
            fullName: "John Doe",
            email: "johndoe@example.com",
            password: "password123",
            phoneNumber: "555-0003",
            licenseNumber: "DL999999",
            isAdmin: false,
            createdAt: "2026-03-15 10:00:00",
            updatedAt: "2026-03-15 10:00:00"
        }
    ],
    cars: [
        {
            carId: 1,
            make: "Toyota",
            model: "Camry",
            year: 2024,
            licensePlate: "ABC123",
            carType: "sedan",
            dailyRate: 45.0,
            seats: 5,
            transmission: "automatic",
            fuelType: "petrol",
            isAvailable: true,
            imageUrl: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop",
            description: "Comfortable and reliable sedan",
            createdAt: "2026-01-01 10:00:00",
            updatedAt: "2026-01-01 10:00:00"
        },
        {
            carId: 2,
            make: "Honda",
            model: "CR-V",
            year: 2024,
            licensePlate: "XYZ789",
            carType: "suv",
            dailyRate: 65.0,
            seats: 5,
            transmission: "automatic",
            fuelType: "petrol",
            isAvailable: true,
            imageUrl: "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?w=400&h=300&fit=crop",
            description: "Spacious SUV for family trips",
            createdAt: "2026-01-02 10:00:00",
            updatedAt: "2026-01-02 10:00:00"
        },
        {
            carId: 3,
            make: "BMW",
            model: "3 Series",
            year: 2024,
            licensePlate: "DEF456",
            carType: "sedan",
            dailyRate: 85.0,
            seats: 5,
            transmission: "automatic",
            fuelType: "petrol",
            isAvailable: true,
            imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
            description: "Luxury sedan with premium features",
            createdAt: "2026-01-03 10:00:00",
            updatedAt: "2026-01-03 10:00:00"
        },
        {
            carId: 4,
            make: "Ford",
            model: "Mustang",
            year: 2024,
            licensePlate: "GHI321",
            carType: "coupe",
            dailyRate: 95.0,
            seats: 4,
            transmission: "manual",
            fuelType: "petrol",
            isAvailable: true,
            imageUrl: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop",
            description: "Sporty coupe for thrilling drives",
            createdAt: "2026-01-04 10:00:00",
            updatedAt: "2026-01-04 10:00:00"
        },
        {
            carId: 5,
            make: "Hyundai",
            model: "i20",
            year: 2024,
            licensePlate: "JKL654",
            carType: "hatchback",
            dailyRate: 35.0,
            seats: 5,
            transmission: "automatic",
            fuelType: "petrol",
            isAvailable: true,
            imageUrl: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400&h=300&fit=crop",
            description: "Compact and fuel-efficient hatchback",
            createdAt: "2026-01-05 10:00:00",
            updatedAt: "2026-01-05 10:00:00"
        }
    ],
    bookings: [],
    promoCodes: [
        {
            promoId: 1,
            code: "SAVE20",
            discountPercentage: 20.0,
            discountAmount: null,
            maxUses: 100,
            currentUses: 5,
            isActive: true,
            expiryDate: "2026-12-31",
            description: "Save 20% on all bookings",
            createdAt: "2026-01-01 10:00:00",
            updatedAt: "2026-01-01 10:00:00"
        },
        {
            promoId: 2,
            code: "WELCOME50",
            discountPercentage: null,
            discountAmount: 50.0,
            maxUses: 50,
            currentUses: 10,
            isActive: true,
            expiryDate: "2026-06-30",
            description: "Get $50 off on your first booking",
            createdAt: "2026-02-01 10:00:00",
            updatedAt: "2026-02-01 10:00:00"
        }
    ]
};

// ===== GENERATE 1000+ CARS =====
function generateAdditionalCars() {
    const carMakes = [
        { make: "Toyota", models: ["Camry", "Corolla", "Highlander", "RAV4", "Prius", "4Runner", "Tundra"], type: "sedan" },
        { make: "Honda", models: ["CR-V", "Civic", "Accord", "Pilot", "Odyssey", "Ridgeline"], type: "suv" },
        { make: "Ford", models: ["Mustang", "Focus", "Fusion", "F-150", "Edge", "Escape"], type: "coupe" },
        { make: "BMW", models: ["3 Series", "5 Series", "X5", "X3", "7 Series", "M440i"], type: "sedan" },
        { make: "Mercedes", models: ["C-Class", "E-Class", "GLE", "GLC", "S-Class", "A-Class"], type: "sedan" },
        { make: "Audi", models: ["A4", "A6", "Q3", "Q5", "Q7", "S4"], type: "sedan" },
        { make: "Volkswagen", models: ["Jetta", "Passat", "Tiguan", "Touareg", "Golf", "Beetle"], type: "hatchback" },
        { make: "Hyundai", models: ["i20", "i30", "Elantra", "Santa Fe", "Tucson", "Kona"], type: "hatchback" },
        { make: "Kia", models: ["Forte", "Optima", "Sorento", "Sportage", "Telluride", "Cerato"], type: "sedan" },
        { make: "Nissan", models: ["Altima", "Sentra", "Rogue", "Murano", "Pathfinder", "Maxima"], type: "sedan" },
        { make: "Mazda", models: ["3", "6", "CX-5", "CX-9", "2", "MX-5"], type: "sedan" },
        { make: "Subaru", models: ["Forester", "Outback", "Crosstrek", "Legacy", "Impreza", "WRX"], type: "sedan" },
        { make: "Chevrolet", models: ["Malibu", "Traverse", "Equinox", "Blazer", "Tahoe", "Silverado"], type: "sedan" },
        { make: "GMC", models: ["Sierra", "Acadia", "Terrain", "Yukon", "Canyon", "Envoy"], type: "suv" },
        { make: "RAM", models: ["1500", "2500", "3500", "ProMaster"], type: "pickup" },
        { make: "Tesla", models: ["Model 3", "Model Y", "Model S", "Model X"], type: "sedan" },
        { make: "Lexus", models: ["RX", "ES", "NX", "GX", "LX", "CT"], type: "sedan" },
        { make: "Jeep", models: ["Wrangler", "Cherokee", "Grand Cherokee", "Compass", "Renegade"], type: "suv" },
        { make: "Dodge", models: ["Charger", "Challenger", "Durango", "Journey"], type: "coupe" },
        { make: "Chrysler", models: ["300", "Pacifica", "Voyager"], type: "sedan" }
    ];

    const carTypes = ["sedan", "suv", "coupe", "hatchback", "pickup", "minivan", "wagon"];
    const transmissions = ["automatic", "manual"];
    const fuelTypes = ["petrol", "diesel", "electric", "hybrid"];
    const carImages = [
        "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop", // Toyota
        "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?w=400&h=300&fit=crop", // Honda
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop", // Porsche
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=300&fit=crop", // Ford
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop", // Lamborghini
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop", // Ferrari
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop", // Mercedes
        "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop", // VW
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop"  // Chevy
    ];

    let carId = 6;
    
    carMakes.forEach(brand => {
        brand.models.forEach(model => {
            for (let i = 0; i < 5; i++) {
                const year = 2020 + Math.floor(Math.random() * 5);
                const seats = Math.floor(Math.random() * 2) + 4;
                const dailyRate = 30 + Math.random() * 150;
                const carType = carTypes[Math.floor(Math.random() * carTypes.length)];
                const transmission = transmissions[Math.floor(Math.random() * transmissions.length)];
                const fuelType = fuelTypes[Math.floor(Math.random() * fuelTypes.length)];
                const imageUrl = carImages[Math.floor(Math.random() * carImages.length)];
                const licensePlate = String.fromCharCode(65, 66, 67) + Math.floor(Math.random() * 9000 + 1000);

                fallbackData.cars.push({
                    carId: carId++,
                    make: brand.make,
                    model: model,
                    year: year,
                    licensePlate: licensePlate,
                    carType: carType,
                    dailyRate: Math.round(dailyRate * 100) / 100,
                    seats: seats,
                    transmission: transmission,
                    fuelType: fuelType,
                    isAvailable: Math.random() > 0.1,
                    imageUrl: imageUrl,
                    description: `Premium ${year} ${brand.make} ${model} with ${seats} seats`,
                    createdAt: new Date(2026, 0, Math.floor(Math.random() * 28) + 1).toLocaleString(),
                    updatedAt: new Date(2026, 0, Math.floor(Math.random() * 28) + 1).toLocaleString()
                });
            }
        });
    });
}

// Initialize car data
generateAdditionalCars();

// Local storage keys
const STORAGE_KEY_USER = 'current_user';
const STORAGE_KEY_CARS = 'cars_data';
const STORAGE_KEY_BOOKINGS = 'bookings_data';

// ===== LOCAL STORAGE FUNCTIONS =====
function loadAllData() {
    if (!localStorage.getItem(STORAGE_KEY_CARS)) {
        localStorage.setItem(STORAGE_KEY_CARS, JSON.stringify(fallbackData.cars));
    }
    if (!localStorage.getItem(STORAGE_KEY_BOOKINGS)) {
        localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(fallbackData.bookings));
    }
}

function saveUser(user) {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
}

function getCurrentUser() {
    const user = localStorage.getItem(STORAGE_KEY_USER);
    return user ? JSON.parse(user) : null;
}

// ===== NAVIGATION HELPER =====
function smartRedirect(targetPage) {
    const isSubPage = window.location.pathname.includes('/html/');
    let finalPath = '';

    if (targetPage === 'index.html') {
        finalPath = isSubPage ? '../index.html' : 'index.html';
    } else {
        // targetPage is a sub-page (e.g., login.html, browse-cars.html)
        finalPath = isSubPage ? targetPage : `html/${targetPage}`;
    }
    
    console.log(`Redirecting to: ${finalPath}`);
    window.location.href = finalPath;
}

function logout() {
    localStorage.removeItem(STORAGE_KEY_USER);
    window.location.reload(); // Refresh to update UI
}

function updateAuthButtons() {
    const currentUser = getCurrentUser();
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    const isSubPage = window.location.pathname.includes('/html/');
    const prefix = isSubPage ? '' : 'html/';
    const indexPrefix = isSubPage ? '../' : '';

    if (currentUser) {
        navLinks.innerHTML = `
            <li><a href="${indexPrefix}index.html">Home</a></li>
            <li><a href="${prefix}browse-cars.html">Browse Cars</a></li>
            <li><a href="${prefix}${currentUser.isAdmin ? 'admin-dashboard.html' : 'user-dashboard.html'}">Dashboard</a></li>
            <li><a href="#" onclick="logout()" class="btn-auth">Logout</a></li>
        `;
    } else {
        navLinks.innerHTML = `
            <li><a href="${indexPrefix}index.html">Home</a></li>
            <li><a href="${prefix}browse-cars.html">Browse Cars</a></li>
            <li><a href="${prefix}login.html" class="btn-auth">Login</a></li>
            <li><a href="${prefix}register.html" class="btn-primary">Sign Up</a></li>
        `;
    }
}

// ===== AUTHENTICATION FUNCTIONS =====
async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                saveUser(data);
                alert('Login successful!');
                smartRedirect('index.html');
            }
        } else {
            // Try fallback data
            const user = fallbackData.users.find(u => u.email === email && u.password === password);
            if (user) {
                saveUser(user);
                alert('Login successful!');
                smartRedirect('index.html');
            } else {
                showMessage('loginMessage', 'Invalid email or password', 'error');
            }
        }
    } catch (error) {
        console.log('Backend unavailable, using fallback data');
        const user = fallbackData.users.find(u => u.email === email && u.password === password);
        if (user) {
            saveUser(user);
            alert('Login successful!');
            smartRedirect('index.html');
        } else {
            showMessage('loginMessage', 'Invalid email or password', 'error');
        }
    }
}

async function handleRegister(event) {
    event.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const licenseNumber = document.getElementById('licenseNumber').value;

    const newUser = {
        fullName, email, password, phoneNumber, licenseNumber, isAdmin: false
    };

    try {
        const response = await fetch(`${API_BASE_URL}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        });

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                alert('Registration successful! Please login.');
                smartRedirect('login.html');
            }
        } else {
            showMessage('registerMessage', 'Registration failed', 'error');
        }
    } catch (error) {
        console.log('Using fallback registration');
        // Fallback: Save to localStorage
        newUser.userId = fallbackData.users.length + 1;
        newUser.createdAt = new Date().toLocaleString();
        newUser.updatedAt = newUser.createdAt;
        fallbackData.users.push(newUser);
        alert('Registration successful! Please login.');
        smartRedirect('login.html');
    }
}

function handleAuthClick() {
    smartRedirect('login.html');
}

// ===== CAR FUNCTIONS =====
async function loadCars() {
    loadAllData();
    const carsGrid = document.getElementById('carsGrid') || document.getElementById('popularCarsContainer');
    if (!carsGrid) return;

    carsGrid.innerHTML = '';

    try {
        const response = await fetch(`${API_BASE_URL}/cars`);
        if (response.ok) {
            const data = await response.json();
            displayCars(data.cars);
        } else {
            throw new Error('Failed to load cars');
        }
    } catch (error) {
        console.log('Using fallback cars data');
        const cars = JSON.parse(localStorage.getItem(STORAGE_KEY_CARS)) || fallbackData.cars;
        displayCars(cars);
    }
}

function displayCars(cars) {
    const carsGrid = document.getElementById('carsGrid') || document.getElementById('popularCarsContainer');
    if (!carsGrid) return;

    carsGrid.innerHTML = '';

    cars.forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        
        carCard.innerHTML = `
            <img src="${car.imageUrl || 'https://via.placeholder.com/300x200?text=' + car.make + '+' + car.model}" alt="${car.make} ${car.model}" class="car-image" onerror="this.src='https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop'">
            <h3>${car.make} ${car.model}</h3>
            <p class="car-type">${car.carType.toUpperCase()} • ${car.year}</p>
            <p class="car-description">${car.description || 'Quality vehicle for rent'}</p>
            <div class="car-specs">
                <span>💺 ${car.seats} Seats</span>
                <span>⚙️ ${car.transmission}</span>
                <span>⛽ ${car.fuelType}</span>
            </div>
            <div class="price-tag">
                <div class="main-price">$${car.dailyRate || 0}<small>/day</small></div>
                <div class="alt-prices" style="font-size: 0.8rem; opacity: 0.8; margin-top: 5px;">
                    ${formatAllCurrencies(car.dailyRate).split(' • ').slice(1).map(p => `<span>${p}</span>`).join(' | ')}
                </div>
            </div>
            <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
                <button onclick="viewCarDetails(${car.carId})" class="btn-primary" style="flex: 1.5;">View Details</button>
                <button onclick="goToBooking(${car.carId})" class="btn-auth" style="flex: 1;">Book</button>
            </div>
        `;
        carsGrid.appendChild(carCard);
    });
}

function viewCarDetails(carId) {
    localStorage.setItem('selectedCarId', carId);
    smartRedirect('car-details.html');
}

function filterCars() {
    const carType = document.getElementById('carTypeFilter').value;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;

    loadAllData();
    const cars = JSON.parse(localStorage.getItem(STORAGE_KEY_CARS)) || fallbackData.cars;
    const filtered = cars.filter(car => 
        (!carType || car.carType.toLowerCase() === carType.toLowerCase()) &&
        car.dailyRate <= maxPrice &&
        car.isAvailable
    );
    displayCars(filtered);
}

function resetFilters() {
    document.getElementById('carTypeFilter').value = '';
    document.getElementById('maxPrice').value = '';
    loadCars();
}

async function loadCarDetails() {
    const carId = localStorage.getItem('selectedCarId');
    if (!carId) return;

    loadAllData();
    const container = document.getElementById('carDetailsContainer');
    if (!container) return;

    try {
        const response = await fetch(`${API_BASE_URL}/cars/${carId}`);
        if (response.ok) {
            const data = await response.json();
            displayCarDetails(data.car);
        } else {
            throw new Error('Failed to load car');
        }
    } catch (error) {
        console.log('Using fallback car data');
        const cars = JSON.parse(localStorage.getItem(STORAGE_KEY_CARS)) || fallbackData.cars;
        const car = cars.find(c => c.carId == carId);
        if (car) displayCarDetails(car);
    }
}

function displayCarDetails(car) {
    const container = document.getElementById('carDetailsContainer');
    
    // Get owner information
    let ownerDetails = '';
    if (car.ownerId) {
        const owner = fallbackData.users.find(u => u.userId === car.ownerId);
        if (owner) {
            ownerDetails = `
                <h3>Owner Information</h3>
                <ul class="specs-list">
                    <li>Name: ${owner.fullName}</li>
                    <li>Email: ${owner.email}</li>
                    <li>Phone: ${owner.phoneNumber}</li>
                </ul>
            `;
        }
    }
    
    container.innerHTML = `
        <div class="car-detail-content">
            <div class="car-detail-image">
                <img src="${car.imageUrl || 'https://via.placeholder.com/500x400?text=' + car.make + '+' + car.model}" alt="${car.make} ${car.model}" onerror="this.src='https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop'">
            </div>
            <div class="car-detail-info">
                <h2>${car.make} ${car.model} <small>(${car.year})</small></h2>
                <div class="price-tag">
                    <div class="main-price" style="font-size: 2rem;">$${car.dailyRate}<small>/day</small></div>
                    <div class="alt-prices" style="font-size: 1rem; opacity: 0.8; margin-top: 10px;">
                        ${formatAllCurrencies(car.dailyRate).replace('$', '').split(' • ').slice(1).map((p, i) => {
                            const symbol = i === 0 ? '€' : '₹';
                            return `<span>${symbol}${p}</span>`;
                        }).join(' | ')}
                    </div>
                </div>
                <p class="license-plate" style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">License: ${car.licensePlate}</p>
                <p class="description" style="margin-bottom: 2rem; font-size: 1.1rem;">${car.description || 'Premium quality vehicle maintained to the highest standards'}</p>
                
                <h3 style="margin-bottom: 1rem;">Specifications</h3>
                <ul class="specs-list" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; list-style: none; margin-bottom: 2rem;">
                    <li><strong>Type:</strong> ${car.carType.toUpperCase()}</li>
                    <li><strong>Seats:</strong> ${car.seats}</li>
                    <li><strong>Transmission:</strong> ${car.transmission}</li>
                    <li><strong>Fuel:</strong> ${car.fuelType}</li>
                    <li><strong>Status:</strong> <span style="color: ${car.isAvailable ? 'var(--primary)' : 'red'}">${car.isAvailable ? 'Available' : 'Not Available'}</span></li>
                </ul>

                ${ownerDetails}

                <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                    ${car.isAvailable ? `<button onclick="goToBooking(${car.carId})" class="btn-primary" style="flex: 2;">Book This Vehicle</button>` : '<button disabled class="btn-disabled" style="flex: 2;">Currently Unavailable</button>'}
                    ${car.ownerId ? `<button onclick="initiateMessage(${car.ownerId})" class="btn-auth" style="flex: 1;">Contact Owner</button>` : ''}
                </div>
            </div>
        </div>
    `;
}

function goToBooking(carId) {
    if (!getCurrentUser()) {
        alert('Please login to book a car');
        smartRedirect('login.html');
        return;
    }
    localStorage.setItem('selectedCarId', carId);
    window.location.href = 'booking.html';
}

// ===== BOOKING FUNCTIONS =====
async function loadBookingDetails() {
    const carId = localStorage.getItem('selectedCarId');
    const cars = JSON.parse(localStorage.getItem(STORAGE_KEY_CARS)) || fallbackData.cars;
    const car = cars.find(c => c.carId == carId);

    if (!car) {
        alert('Car not found');
        window.history.back();
        return;
    }

    document.getElementById('carSummary').innerHTML = `
        <div>
            <h3>${car.make} ${car.model}</h3>
            <p>Daily Rate: $${car.dailyRate}</p>
            <img src="${car.imageUrl || 'https://via.placeholder.com/200x150?text=' + car.make}" alt="${car.make}" style="max-width: 200px;">
        </div>
    `;

    // Add event listeners for date calculation
    document.getElementById('startDate').addEventListener('change', calculatePrice);
    document.getElementById('endDate').addEventListener('change', calculatePrice);

    // Store carId for booking
    document.getElementById('bookingForm').dataset.carId = carId;
}

function calculatePrice() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const carId = document.getElementById('bookingForm').dataset.carId;

    if (!startDate || !endDate) return;

    const cars = JSON.parse(localStorage.getItem(STORAGE_KEY_CARS)) || fallbackData.cars;
    const car = cars.find(c => c.carId == carId);

    if (!car) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (days < 1) {
        alert('End date must be after start date');
        return;
    }

    const basePrice = car.dailyRate * days;

    document.getElementById('dailyRate').textContent = '$' + car.dailyRate;
    document.getElementById('numDays').textContent = days;
    document.getElementById('basePrice').textContent = '$' + basePrice.toFixed(2);
    document.getElementById('totalPrice').textContent = '$' + basePrice.toFixed(2);
    document.getElementById('bookingForm').dataset.basePrice = basePrice;
    document.getElementById('bookingForm').dataset.days = days;
}

function applyPromoCode() {
    const promoCode = document.getElementById('promoCode').value;
    if (!promoCode) {
        alert('Please enter a promo code');
        return;
    }

    const promoCodes = fallbackData.promoCodes;
    const promo = promoCodes.find(p => p.code === promoCode && p.isActive);

    if (!promo) {
        alert('Invalid or expired promo code');
        return;
    }

    const basePrice = parseFloat(document.getElementById('bookingForm').dataset.basePrice);
    let discount = 0;

    if (promo.discountPercentage) {
        discount = (basePrice * promo.discountPercentage) / 100;
    } else if (promo.discountAmount) {
        discount = promo.discountAmount;
    }

    const totalPrice = basePrice - discount;

    document.getElementById('discountRow').style.display = 'flex';
    document.getElementById('discount').textContent = '-$' + discount.toFixed(2);
    document.getElementById('totalPrice').textContent = '$' + totalPrice.toFixed(2);
    document.getElementById('bookingForm').dataset.discount = discount;

    alert('Promo code applied successfully!');
}

async function handleBooking(event) {
    event.preventDefault();

    const currentUser = getCurrentUser();
    if (!currentUser) {
        alert('Please login to complete booking');
        return;
    }

    const carId = document.getElementById('bookingForm').dataset.carId;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const pickupLocation = document.getElementById('pickupLocation').value;
    const dropoffLocation = document.getElementById('dropoffLocation').value;
    const promoCode = document.getElementById('promoCode').value || null;
    const totalPrice = parseFloat(document.getElementById('totalPrice').textContent.replace('$', ''));
    const discountAmount = parseFloat(document.getElementById('bookingForm').dataset.discount) || 0;

    const booking = {
        userId: currentUser.userId,
        carId: parseInt(carId),
        startDate,
        endDate,
        pickupLocation,
        dropoffLocation,
        promoCode,
        totalPrice,
        discountAmount
    };

    try {
        const response = await fetch(`${API_BASE_URL}/bookings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(booking)
        });

        if (response.ok) {
            const data = await response.json();
            alert('Booking successful! Booking ID: ' + data.booking.bookingId);
            window.location.href = 'user-dashboard.html';
        } else {
            throw new Error('Booking failed');
        }
    } catch (error) {
        console.log('Using fallback booking');
        // Fallback: Save booking locally
        const bookingId = Date.now();
        const newBooking = {
            ...booking,
            bookingId,
            status: 'confirmed',
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
        };

        const bookings = JSON.parse(localStorage.getItem(STORAGE_KEY_BOOKINGS)) || [];
        bookings.push(newBooking);
        localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));

        // Mark car as unavailable
        const cars = JSON.parse(localStorage.getItem(STORAGE_KEY_CARS)) || [];
        const carIndex = cars.findIndex(c => c.carId == carId);
        if (carIndex >= 0) {
            cars[carIndex].isAvailable = false;
            localStorage.setItem(STORAGE_KEY_CARS, JSON.stringify(cars));
        }

        alert('Booking successful! Booking ID: ' + bookingId);
        window.location.href = 'user-dashboard.html';
    }
}

// ===== USER DASHBOARD FUNCTIONS =====
async function loadUserProfile() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    const container = document.getElementById('profileContainer');
    if (!container) return;

    container.innerHTML = `
        <div class="profile-info">
            <p><strong>Full Name:</strong> ${currentUser.fullName}</p>
            <p><strong>Email:</strong> ${currentUser.email}</p>
            <p><strong>Phone:</strong> ${currentUser.phoneNumber}</p>
            <p><strong>License Number:</strong> ${currentUser.licenseNumber}</p>
            <p><strong>Member Since:</strong> ${currentUser.createdAt}</p>
        </div>
    `;
}

async function loadUserBookings() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    const container = document.getElementById('bookingsContainer');
    if (!container) return;

    try {
        const response = await fetch(`${API_BASE_URL}/bookings/user/${currentUser.userId}`);
        if (response.ok) {
            const data = await response.json();
            displayBookings(data.bookings, container);
        } else {
            throw new Error('Failed to load bookings');
        }
    } catch (error) {
        console.log('Using fallback bookings');
        const bookings = JSON.parse(localStorage.getItem(STORAGE_KEY_BOOKINGS)) || [];
        const userBookings = bookings.filter(b => b.userId === currentUser.userId);
        displayBookings(userBookings, container);
    }
}

function displayBookings(bookings, container) {
    if (bookings.length === 0) {
        container.innerHTML = '<p>No bookings found. <a href="browse-cars.html">Browse cars</a></p>';
        return;
    }

    container.innerHTML = '';
    const cars = JSON.parse(localStorage.getItem(STORAGE_KEY_CARS)) || fallbackData.cars;

    bookings.forEach(booking => {
        const car = cars.find(c => c.carId === booking.carId);
        const bookingDiv = document.createElement('div');
        bookingDiv.className = 'booking-item';
        bookingDiv.innerHTML = `
            <h4>${car ? car.make + ' ' + car.model : 'Car'}</h4>
            <p>From: ${booking.startDate} | To: ${booking.endDate}</p>
            <p>Pickup: ${booking.pickupLocation} | Dropoff: ${booking.dropoffLocation}</p>
            <p>Total Price: $${booking.totalPrice.toFixed(2)}</p>
            <p>Status: <strong>${booking.status}</strong></p>
            ${booking.status !== 'cancelled' ? `<button onclick="cancelBooking(${booking.bookingId})" class="btn-danger">Cancel Booking</button>` : ''}
        `;
        container.appendChild(bookingDiv);
    });
}

function cancelBooking(bookingId) {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    fetch(`${API_BASE_URL}/bookings/${bookingId}`, { method: 'DELETE' })
        .catch(() => {
            // Fallback: Cancel locally
            const bookings = JSON.parse(localStorage.getItem(STORAGE_KEY_BOOKINGS)) || [];
            const bookingIndex = bookings.findIndex(b => b.bookingId === bookingId);
            if (bookingIndex >= 0) {
                bookings[bookingIndex].status = 'cancelled';
                localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
            }
            alert('Booking cancelled');
            location.reload();
        });
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabName + 'Tab').classList.add('active');
    event.target.classList.add('active');
}

// ===== ADMIN FUNCTIONS =====
async function loadAdminData() {
    loadAllData();
    loadAdminCars();
    loadAdminUsers();
    loadAllBookings();
    loadAdminPromoCodes();
}

async function loadAdminCars() {
    const container = document.getElementById('carsListContainer');
    if (!container) return;

    try {
        const response = await fetch(`${API_BASE_URL}/admin/cars`);
        if (response.ok) {
            const data = await response.json();
            displayAdminCars(data.cars);
        } else {
            throw new Error('Failed');
        }
    } catch (error) {
        const cars = JSON.parse(localStorage.getItem(STORAGE_KEY_CARS)) || fallbackData.cars;
        displayAdminCars(cars);
    }
}

function displayAdminCars(cars) {
    const container = document.getElementById('carsListContainer');
    container.innerHTML = '<table class="admin-table-content"><thead><tr><th>Make</th><th>Model</th><th>Rate</th><th>Type</th><th>Available</th><th>Actions</th></tr></thead><tbody>';
    
    cars.forEach(car => {
        container.innerHTML += `<tr><td>${car.make}</td><td>${car.model}</td><td>$${car.dailyRate}</td><td>${car.carType}</td><td>${car.isAvailable ? 'Yes' : 'No'}</td><td><button onclick="deleteCar(${car.carId})" class="btn-danger">Delete</button></td></tr>`;
    });
    container.innerHTML += '</tbody></table>';
}

async function loadAdminUsers() {
    const container = document.getElementById('usersListContainer');
    if (!container) return;

    try {
        const response = await fetch(`${API_BASE_URL}/admin/users`);
        if (response.ok) {
            const data = await response.json();
            displayAdminUsers(data.users);
        }
    } catch (error) {
        const users = fallbackData.users;
        displayAdminUsers(users);
    }
}

function displayAdminUsers(users) {
    const container = document.getElementById('usersListContainer');
    container.innerHTML = '<table class="admin-table-content"><thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Admin</th><th>Actions</th></tr></thead><tbody>';
    
    users.forEach(user => {
        container.innerHTML += `<tr><td>${user.fullName}</td><td>${user.email}</td><td>${user.phoneNumber}</td><td>${user.isAdmin ? 'Yes' : 'No'}</td><td><button onclick="deleteUser(${user.userId})" class="btn-danger">Delete</button></td></tr>`;
    });
    container.innerHTML += '</tbody></table>';
}

async function loadAllBookings() {
    const container = document.getElementById('allBookingsContainer');
    if (!container) return;

    try {
        const response = await fetch(`${API_BASE_URL}/bookings`);
        if (response.ok) {
            const data = await response.json();
            displayAllBookings(data.bookings);
        }
    } catch (error) {
        const bookings = JSON.parse(localStorage.getItem(STORAGE_KEY_BOOKINGS)) || [];
        displayAllBookings(bookings);
    }
}

function displayAllBookings(bookings) {
    const container = document.getElementById('allBookingsContainer');
    container.innerHTML = '<table class="admin-table-content"><thead><tr><th>ID</th><th>User ID</th><th>Car ID</th><th>Start Date</th><th>Total</th><th>Status</th></tr></thead><tbody>';
    
    bookings.forEach(booking => {
        container.innerHTML += `<tr><td>${booking.bookingId}</td><td>${booking.userId}</td><td>${booking.carId}</td><td>${booking.startDate}</td><td>$${booking.totalPrice}</td><td>${booking.status}</td></tr>`;
    });
    container.innerHTML += '</tbody></table>';
}

async function loadAdminPromoCodes() {
    const container = document.getElementById('promosListContainer');
    if (!container) return;

    try {
        const response = await fetch(`${API_BASE_URL}/admin/promo-codes`);
        if (response.ok) {
            const data = await response.json();
            displayAdminPromoCodes(data.promoCodes);
        }
    } catch (error) {
        displayAdminPromoCodes(fallbackData.promoCodes);
    }
}

function displayAdminPromoCodes(promoCodes) {
    const container = document.getElementById('promosListContainer');
    container.innerHTML = '<table class="admin-table-content"><thead><tr><th>Code</th><th>Discount</th><th>Uses</th><th>Active</th><th>Actions</th></tr></thead><tbody>';
    
    promoCodes.forEach(promo => {
        const discount = promo.discountPercentage ? promo.discountPercentage + '%' : '$' + promo.discountAmount;
        container.innerHTML += `<tr><td>${promo.code}</td><td>${discount}</td><td>${promo.currentUses}/${promo.maxUses}</td><td>${promo.isActive ? 'Yes' : 'No'}</td><td><button onclick="deletePromo(${promo.promoId})" class="btn-danger">Delete</button></td></tr>`;
    });
    container.innerHTML += '</tbody></table>';
}

function showAddCarForm() {
    const form = document.getElementById('addCarForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

async function handleAddCar(event) {
    event.preventDefault();
    const car = {
        make: document.getElementById('carMake').value,
        model: document.getElementById('carModel').value,
        year: parseInt(document.getElementById('carYear').value),
        licensePlate: document.getElementById('carLicensePlate').value,
        carType: document.getElementById('carType').value,
        dailyRate: parseFloat(document.getElementById('carRate').value),
        seats: parseInt(document.getElementById('carSeats').value),
        transmission: document.getElementById('carTransmission').value,
        fuelType: document.getElementById('carFuelType').value,
        imageUrl: document.getElementById('carImage').value,
        description: document.getElementById('carDescription').value
    };

    try {
        const response = await fetch(`${API_BASE_URL}/admin/cars`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(car)
        });
        alert('Car added successfully!');
    } catch (error) {
        // Fallback
        car.carId = Date.now();
        car.createdAt = new Date().toLocaleString();
        car.updatedAt = car.createdAt;
        car.isAvailable = true;
        
        const cars = JSON.parse(localStorage.getItem(STORAGE_KEY_CARS)) || [];
        cars.push(car);
        localStorage.setItem(STORAGE_KEY_CARS, JSON.stringify(cars));
        alert('Car added successfully!');
    }
    loadAdminCars();
    showAddCarForm();
}

function showAddPromoForm() {
    const form = document.getElementById('addPromoForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

async function handleAddPromo(event) {
    event.preventDefault();
    const promo = {
        code: document.getElementById('promoCode').value,
        discountPercentage: document.getElementById('promoDiscountPct').value ? parseFloat(document.getElementById('promoDiscountPct').value) : null,
        discountAmount: document.getElementById('promoDiscountAmt').value ? parseFloat(document.getElementById('promoDiscountAmt').value) : null,
        maxUses: parseInt(document.getElementById('promoMaxUses').value),
        expiryDate: document.getElementById('promoExpiryDate').value,
        description: document.getElementById('promoDescription').value,
        isActive: true
    };

    try {
        const response = await fetch(`${API_BASE_URL}/admin/promo-codes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(promo)
        });
        alert('Promo code added successfully!');
    } catch (error) {
        // Fallback
        promo.promoId = Date.now();
        promo.currentUses = 0;
        promo.createdAt = new Date().toLocaleString();
        promo.updatedAt = promo.createdAt;
        fallbackData.promoCodes.push(promo);
        alert('Promo code added successfully!');
    }
    loadAdminPromoCodes();
    showAddPromoForm();
}

async function deleteCar(carId) {
    if (!confirm('Delete this car?')) return;
    try {
        await fetch(`${API_BASE_URL}/admin/cars/${carId}`, { method: 'DELETE' });
    } catch (error) {
        const cars = JSON.parse(localStorage.getItem(STORAGE_KEY_CARS)) || [];
        const index = cars.findIndex(c => c.carId === carId);
        if (index >= 0) cars.splice(index, 1);
        localStorage.setItem(STORAGE_KEY_CARS, JSON.stringify(cars));
    }
    loadAdminCars();
}

async function deleteUser(userId) {
    if (!confirm('Delete this user?')) return;
    try {
        await fetch(`${API_BASE_URL}/admin/users/${userId}`, { method: 'DELETE' });
    } catch (error) {
        //Fallback handled
    }
    loadAdminUsers();
}

async function deletePromo(promoId) {
    if (!confirm('Delete this promo?')) return;
    try {
        await fetch(`${API_BASE_URL}/admin/promo-codes/${promoId}`, { method: 'DELETE' });
    } catch (error) {
        const index = fallbackData.promoCodes.findIndex(p => p.promoId === promoId);
        if (index >= 0) fallbackData.promoCodes.splice(index, 1);
    }
    loadAdminPromoCodes();
}

function switchAdminTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabName + 'Tab').classList.add('active');
    event.target.classList.add('active');
}

// ===== MESSAGING FUNCTIONS =====
const STORAGE_KEY_MESSAGES = 'messages_data';

function loadMessages() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    const conversationsList = document.getElementById('conversationsList');
    if (!conversationsList) return;

    const messages = JSON.parse(localStorage.getItem(STORAGE_KEY_MESSAGES)) || [];
    
    // Get unique conversations for current user
    const conversations = new Map();
    
    messages.forEach(msg => {
        const otherUserId = msg.senderId === currentUser.userId ? msg.recipientId : msg.senderId;
        const key = `${Math.min(currentUser.userId, otherUserId)}_${Math.max(currentUser.userId, otherUserId)}`;
        
        if (!conversations.has(key)) {
            conversations.set(key, { otherUserId, lastMessage: msg, messages: [] });
        }
        const conv = conversations.get(key);
        if ((msg.senderId === currentUser.userId && msg.recipientId === otherUserId) ||
            (msg.senderId === otherUserId && msg.recipientId === currentUser.userId)) {
            conv.messages.push(msg);
        }
    });

    if (conversations.size === 0) {
        conversationsList.innerHTML = '<p style="color: #999;">No conversations yet</p>';
        return;
    }

    conversationsList.innerHTML = '';
    
    conversations.forEach((conv, key) => {
        const otherUser = fallbackData.users.find(u => u.userId === conv.otherUserId);
        if (!otherUser) return;

        const unreadCount = conv.messages.filter(m => 
            m.recipientId === currentUser.userId && !m.read
        ).length;

        const convItem = document.createElement('div');
        convItem.className = 'conversation-item';
        convItem.style.cssText = `
            padding: 1rem;
            border: 1px solid #eee;
            border-radius: 4px;
            cursor: pointer;
            background: ${unreadCount > 0 ? '#f0f8ff' : 'white'};
            transition: all 0.3s;
        `;
        convItem.onclick = () => openConversation(conv.otherUserId, otherUser);
        
        const lastMsg = conv.messages[conv.messages.length - 1];
        const lastDate = new Date(lastMsg.timestamp);
        const timeStr = lastDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        convItem.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <strong>${otherUser.fullName}</strong>
                    <p style="font-size: 0.85rem; color: #666; margin-top: 0.3rem;">${lastMsg.content.substring(0, 40)}${lastMsg.content.length > 40 ? '...' : ''}</p>
                </div>
                <div style="text-align: right;">
                    <span style="font-size: 0.8rem; color: #999;">${timeStr}</span>
                    ${unreadCount > 0 ? `<div style="background: #ff6b35; color: white; border-radius: 50%; padding: 0.2rem 0.5rem; font-size: 0.8rem; margin-top: 0.3rem;">${unreadCount}</div>` : ''}
                </div>
            </div>
        `;
        conversationsList.appendChild(convItem);
    });

    updateUnreadBadge();
}

function openConversation(otherUserId, otherUser) {
    const currentUser = getCurrentUser();
    const messages = JSON.parse(localStorage.getItem(STORAGE_KEY_MESSAGES)) || [];
    const convMessages = messages.filter(m => 
        (m.senderId === currentUser.userId && m.recipientId === otherUserId) ||
        (m.senderId === otherUserId && m.recipientId === currentUser.userId)
    );

    // Mark as read
    convMessages.forEach(m => {
        if (m.recipientId === currentUser.userId) m.read = true;
    });
    localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messages));

    const conversationDisplay = document.getElementById('selectedConversation');
    const messageInputArea = document.getElementById('messageInputArea');
    
    conversationDisplay.innerHTML = `<h3 style="text-align: center; color: #2c3e50; margin-bottom: 1rem;">Conversation with ${otherUser.fullName}</h3>`;
    
    convMessages.forEach(msg => {
        const msgDiv = document.createElement('div');
        msgDiv.style.cssText = `
            margin-bottom: 1rem;
            padding: 0.75rem;
            border-radius: 8px;
            background: ${msg.senderId === currentUser.userId ? '#e7f3ff' : '#f5f5f5'};
            margin-left: ${msg.senderId === currentUser.userId ? 'auto' : '0'};
            margin-right: ${msg.senderId === currentUser.userId ? '0' : 'auto'};
            max-width: 70%;
            word-wrap: break-word;
        `;
        const msgDate = new Date(msg.timestamp);
        msgDiv.innerHTML = `
            <p style="margin: 0 0 0.3rem 0;">${msg.content}</p>
            <small style="color: #999;">${msgDate.toLocaleTimeString()}</small>
        `;
        conversationDisplay.appendChild(msgDiv);
    });

    conversationDisplay.scrollTop = conversationDisplay.scrollHeight;
    
    messageInputArea.style.display = 'block';
    document.getElementById('messageInput').dataset.recipientId = otherUserId;
    
    updateUnreadBadge();
}

function sendMessage() {
    const currentUser = getCurrentUser();
    const messageInput = document.getElementById('messageInput');
    const recipientId = parseInt(messageInput.dataset.recipientId);
    const content = messageInput.value.trim();

    if (!content) {
        alert('Please enter a message');
        return;
    }

    const message = {
        messageId: Date.now(),
        senderId: currentUser.userId,
        recipientId: recipientId,
        content: content,
        timestamp: new Date().toISOString(),
        read: false
    };

    const messages = JSON.parse(localStorage.getItem(STORAGE_KEY_MESSAGES)) || [];
    messages.push(message);
    localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messages));

    messageInput.value = '';
    const otherUser = fallbackData.users.find(u => u.userId === recipientId);
    openConversation(recipientId, otherUser);
    loadMessages();
}

function initiateMessage(recipientId) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        alert('Please login first');
        return;
    }

    const recipient = fallbackData.users.find(u => u.userId === recipientId);
    if (!recipient) return;

    // Switch to messages tab
    const messagesTab = document.getElementById('messagesTab');
    if (messagesTab) {
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        messagesTab.classList.add('active');
        
        setTimeout(() => {
            loadMessages();
            openConversation(recipientId, recipient);
        }, 100);
    }
}

function updateUnreadBadge() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    const messages = JSON.parse(localStorage.getItem(STORAGE_KEY_MESSAGES)) || [];
    const unreadCount = messages.filter(m => 
        m.recipientId === currentUser.userId && !m.read
    ).length;

    const badge = document.getElementById('unreadBadge');
    if (badge) {
        if (unreadCount > 0) {
            badge.style.display = 'inline-block';
            badge.textContent = unreadCount;
        } else {
            badge.style.display = 'none';
        }
    }
}

// ===== UTILITY FUNCTIONS =====
function showMessage(elementId, message, type) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.className = 'message ' + type;
    }
}

// ===== CAR OWNER FUNCTIONS =====
function toggleAddCarForm() {
    const form = document.getElementById('ownerAddCarForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('ownerCarImage').value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function handleOwnerAddCar(event) {
    event.preventDefault();
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
        alert('Please login first');
        return;
    }

    const car = {
        make: document.getElementById('ownerCarMake').value,
        model: document.getElementById('ownerCarModel').value,
        year: parseInt(document.getElementById('ownerCarYear').value),
        licensePlate: document.getElementById('ownerCarLicensePlate').value,
        carType: document.getElementById('ownerCarType').value,
        dailyRate: parseFloat(document.getElementById('ownerCarDailyRate').value),
        seats: parseInt(document.getElementById('ownerCarSeats').value),
        transmission: document.getElementById('ownerCarTransmission').value,
        fuelType: document.getElementById('ownerCarFuelType').value,
        description: document.getElementById('ownerCarDescription').value,
        imageUrl: document.getElementById('ownerCarImage').value || 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
        ownerId: currentUser.userId,
        isAvailable: true
    };

    // Fallback: Save to localStorage
    loadAllData();
    const cars = JSON.parse(localStorage.getItem(STORAGE_KEY_CARS)) || [];
    car.carId = Math.max(...cars.map(c => c.carId), 0) + 1;
    car.createdAt = new Date().toLocaleString();
    car.updatedAt = new Date().toLocaleString();
    
    cars.push(car);
    localStorage.setItem(STORAGE_KEY_CARS, JSON.stringify(cars));
    
    alert('Car listed successfully!');
    document.getElementById('ownerAddCarForm').reset();
    toggleAddCarForm();
    loadOwnerCars();
}

function loadOwnerCars() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    const container = document.getElementById('ownerCarsContainer');
    if (!container) return;

    loadAllData();
    const cars = JSON.parse(localStorage.getItem(STORAGE_KEY_CARS)) || fallbackData.cars;
    const ownerCars = cars.filter(car => car.ownerId === currentUser.userId);

    if (ownerCars.length === 0) {
        container.innerHTML = '<p>You haven\'t listed any cars yet. <button onclick="toggleAddCarForm()" class="btn-primary">List your first car</button></p>';
        return;
    }

    container.innerHTML = '';

    ownerCars.forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        carCard.innerHTML = `
            <img src="${car.imageUrl}" alt="${car.make} ${car.model}" class="car-image" onerror="this.src='https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop'">
            <h3>${car.make} ${car.model}</h3>
            <p class="car-type">${car.carType} • ${car.year}</p>
            <p class="car-description">${car.description || 'Quality vehicle for rent'}</p>
            <div class="car-specs">
                <span>💺 ${car.seats} Seats</span>
                <span>⚙️ ${car.transmission}</span>
                <span>⛽ ${car.fuelType}</span>
            </div>
            <div class="car-price">$${car.dailyRate}/day</div>
            <button onclick="updateCarAvailability(${car.carId})" class="btn-secondary" style="margin-right: 0.5rem;">
                ${car.isAvailable ? '✓ Available' : '✗ Unavailable'}
            </button>
            <button onclick="deleteOwnerCar(${car.carId})" class="btn-danger">Delete</button>
        `;
        container.appendChild(carCard);
    });
}

function updateCarAvailability(carId) {
    loadAllData();
    const cars = JSON.parse(localStorage.getItem(STORAGE_KEY_CARS)) || [];
    const carIndex = cars.findIndex(c => c.carId === carId);
    
    if (carIndex >= 0) {
        cars[carIndex].isAvailable = !cars[carIndex].isAvailable;
        cars[carIndex].updatedAt = new Date().toLocaleString();
        localStorage.setItem(STORAGE_KEY_CARS, JSON.stringify(cars));
        loadOwnerCars();
    }
}

function deleteOwnerCar(carId) {
    if (!confirm('Are you sure you want to delete this car listing?')) return;

    loadAllData();
    const cars = JSON.parse(localStorage.getItem(STORAGE_KEY_CARS)) || [];
    const carIndex = cars.findIndex(c => c.carId === carId);
    
    if (carIndex >= 0) {
        cars.splice(carIndex, 1);
        localStorage.setItem(STORAGE_KEY_CARS, JSON.stringify(cars));
        alert('Car listing deleted');
        loadOwnerCars();
    }
}

// Initialize everything on page load
document.addEventListener('DOMContentLoaded', function() {
    // Clear storage to fix branding issues if old data exists
    if (!localStorage.getItem('branding_fix_v2')) {
        localStorage.removeItem(STORAGE_KEY_CARS);
        localStorage.setItem('branding_fix_v2', 'true');
    }
    
    loadAllData();
    updateAuthButtons();
    updateUnreadBadge();
    
    // Page-specific initialization
    const path = window.location.pathname;
    const carsGrid = document.getElementById('carsGrid') || document.getElementById('popularCarsContainer');
    const detailsContainer = document.getElementById('carDetailsContainer');
    
    if (carsGrid) {
        loadCars();
    }
    
    if (detailsContainer) {
        loadCarDetails();
    }
    
    // Setup image drop zone
    const imageDropZone = document.getElementById('imageDropZone');
    if (imageDropZone) {
        imageDropZone.addEventListener('click', () => {
            document.getElementById('carImageFile').click();
        });
        
        document.getElementById('carImageFile').addEventListener('change', handleImageUpload);
        
        imageDropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            imageDropZone.style.borderColor = '#ff6b35';
        });
        
        imageDropZone.addEventListener('dragleave', () => {
            imageDropZone.style.borderColor = '#ddd';
        });
        
        imageDropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                document.getElementById('carImageFile').files = files;
                handleImageUpload({ target: { files } });
            }
        });
    }
    
    // Refresh unread badge every 5 seconds
    setInterval(() => {
        if (document.getElementById('messagesTab') && document.getElementById('messagesTab').classList.contains('active')) {
            loadMessages();
        }
        updateUnreadBadge();
    }, 5000);
}, { once: true });
