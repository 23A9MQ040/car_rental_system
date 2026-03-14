# Stage 1: Build stage
FROM maven:3.9.11-openjdk-17-slim as builder

WORKDIR /build

# Copy pom.xml
COPY pom.xml .

# Copy source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Stage 2: Runtime stage
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy the built WAR file from builder stage
COPY --from=builder /build/target/car-rental-system-*.war app.war

# Create a non-root user for security
RUN useradd -m -u 1000 carapp && chown -R carapp:carapp /app
USER carapp

# Expose the application port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:8080/api/cars || exit 1

# Run the application
ENTRYPOINT ["java", "-Dspring.profiles.active=docker", "-jar", "app.war"]
