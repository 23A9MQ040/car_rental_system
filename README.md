# 🚗 AP Car Rentals System (Advanced Version)

A Professional, Full-Stack Car Rental Management System built with **Spring Boot, MySQL, and Stripe**.

---

## 🌟 Current Status: 100% Verified & Error-Free
The project has undergone a complete master audit. All features including multi-currency pricing, premium branding, and authentication are fully functional.

### 🔑 Example Login Account
- **Email**: `johndoe@example.com`
- **Password**: `password123`

---

## 🛠️ Features
- **Premium UI**: Indigo/Orange design system with glassmorphism.
- **Multi-Currency Pricing**: Real-time conversion between USD ($), EUR (€), and INR (₹).
- **Full Stack Integration**: Spring Boot + H2 Database + Premium Vanilla JS Frontend.
- **Smart Routing**: Seamless navigation between root and sub-pages.

---

# 🌟 Advanced Features

- **💳 Integrated Payments**: Stripe Checkout integration for secure bookings.
- **🗄️ Production Ready**: MySQL support for persistence in cloud environments.
- **🐳 Dockerized Architecture**: Multi-stage Docker builds and Docker Compose for easy local development.
- **🛡️ Secure Build**: Automated CI/CD with GitHub Actions.
- **📜 Professional Standards**: MIT License and Code of Conduct included.

---

# 🛠 Tech Stack

**Backend**
- Java 17, Spring Boot 3.x
- Spring Security, JPA / Hibernate
- **MySQL (Production)**, H2 (Development)
- **Stripe API** for Payments

**Frontend**
- Modern HTML5, CSS3, Vanilla JavaScript (ES6)
- **Responsive Design**

**DevOps**
- **Docker** & **Docker Compose**
- **GitHub Actions** (CI/CD)

---

# 🚀 Quick Start (Professional Way)

### 1. Run with Docker Compose (MySQL + App)
```bash
docker-compose up --build
```
This starts both the MySQL database and the Application, fully configured.

### 2. Standard Local Run (H2)
```bash
mvn spring-boot:run
```

---

# 📂 Project Structure
```
car-rental-system
├── .github/workflows      # CI/CD Pipeline
├── src/main/java          # Java Source
├── src/main/resources
│   ├── static             # Unified Frontend
│   └── application-*.prop # Environment Configs
├── Dockerfile             # Multi-stage Build
├── docker-compose.yml     # Local MySQL Env
└── pom.xml                # Project Metadata
```

---

# 💳 Stripe Setup
To enable payments:
1. Get your API Key from [Stripe Dashboard](https://dashboard.stripe.com).
2. Add it to `application.properties` or set it as an environment variable `STRIPE_API_KEY`.

---

# 👨💻 Author
Sai Varma  
*Java Full Stack Developer*
