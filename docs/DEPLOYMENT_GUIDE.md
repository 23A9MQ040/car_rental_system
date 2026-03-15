# 🚀 DEPLOYMENT GUIDE

## Quick Start - Run Locally with Docker

### Prerequisites
- Docker installed
- Docker Compose installed
- Git installed

### Steps

```bash
# 1. Clone the repository (if not already done)
git clone https://github.com/yourusername/car-rental-system.git
cd car-rental-system

# 2. Build and start services
docker-compose up -d

# 3. Access the application
# Application:  http://localhost:8080
# DB Admin:     http://localhost:9090 (Adminer)
```

---

## Kubernetes Deployment (Production)

### Prerequisites
- Kubernetes cluster (1.24+)
- kubectl configured
- Docker image pushed to registry

### Step 1: Create Namespace & Secrets

```bash
# Create namespace
kubectl apply -f kubernetes/namespace.yaml

# Create secrets (CHANGE THESE IN PRODUCTION!)
kubectl apply -f kubernetes/secret.yaml

# Create config
kubectl apply -f kubernetes/configmap.yaml
```

### Step 2: Deploy MySQL Database

```bash
# You'll need a MySQL deployment as well
# Option A: Deploy MySQL in cluster
kubectl apply -f kubernetes/mysql-deployment.yaml

# Option B: Use managed database (RDS/Cloud SQL/Azure MySQL)
# Update the database URL in configmap.yaml
```

### Step 3: Deploy Application

```bash
# Deploy the application
kubectl apply -f kubernetes/serviceaccount.yaml
kubectl apply -f kubernetes/deployment.yaml
kubectl apply -f kubernetes/service.yaml
kubectl apply -f kubernetes/hpa.yaml
```

### Step 4: Setup Ingress (Optional)

```bash
# For external access
kubectl apply -f kubernetes/ingress.yaml
```

### Step 5: Verify Deployment

```bash
# Check pods
kubectl get pods -n car-rental

# Check services
kubectl get svc -n car-rental

# Check logs
kubectl logs -n car-rental -l app=car-rental-app

# Get service IP/hostname
kubectl get svc car-rental-service -n car-rental
```

---

## GitHub Actions CI/CD Pipeline

Create `.github/workflows/deploy.yml`:

```yaml
name: Build and Deploy

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up JDK 17
      uses: actions/setup-java@v3
      with:
        java-version: '17'
        distribution: 'temurin'
    
    - name: Build with Maven
      run: mvn clean package -DskipTests
    
    - name: Build Docker image
      run: docker build -t car-rental:${{ github.sha }} .
    
    - name: Push to DockerHub
      run: |
        docker tag car-rental:${{ github.sha }} username/car-rental:latest
        docker login -u ${{ secrets.DOCKER_USERNAME }} -p ${{ secrets.DOCKER_PASSWORD }}
        docker push username/car-rental:latest
    
    - name: Deploy to Kubernetes
      run: |
        kubectl set image deployment/car-rental-app \
          car-rental-app=username/car-rental:latest \
          -n car-rental
```

---

## Cloud Platform Deployment Options

### AWS ECS

```bash
# Create ECR repository
aws ecr create-repository --repository-name car-rental

# Build and push image
docker build -t car-rental:latest .
docker tag car-rental:latest <account-id>.dkr.ecr.<region>.amazonaws.com/car-rental:latest
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <account-id>.dkr.ecr.<region>.amazonaws.com
docker push <account-id>.dkr.ecr.<region>.amazonaws.com/car-rental:latest

# Create ECS task definition and service
# Use AWS Console or CloudFormation
```

### Google Cloud Run

```bash
# Build with Cloud Build
gcloud builds submit --tag gcr.io/<project-id>/car-rental:latest

# Deploy
gcloud run deploy car-rental \
  --image gcr.io/<project-id>/car-rental:latest \
  --platform managed \
  --region us-central1 \
  --memory 512Mi \
  --cpu 1
```

### Microsoft Azure

```bash
# Create container registry
az acr create --resource-group <group> --name carrentalsregistry --sku Basic

# Build and push
az acr build --registry carrentalsregistry --image car-rental:latest .

# Deploy to Container Instances
az container create \
  --resource-group <group> \
  --name car-rental \
  --image carrentalsregistry.azurecr.io/car-rental:latest \
  --cpu 1 \
  --memory 1 \
  --port 8080
```

---

## Production Best Practices

### Before Deployment

- [ ] Change JWT_SECRET to a strong random value (min 32 chars)
- [ ] Update database credentials in secrets
- [ ] Configure proper database backups
- [ ] Set up monitoring and logging
- [ ] Configure SSL/TLS certificates
- [ ] Set resource limits and requests
- [ ] Configure auto-scaling policies
- [ ] Set up health checks and monitoring

### Security Checklist

- [ ] Use HTTPS/TLS for all connections
- [ ] Rotate secrets regularly
- [ ] Enable RBAC in Kubernetes
- [ ] Use network policies
- [ ] Scan images for vulnerabilities
- [ ] Keep dependencies updated
- [ ] Implement API rate limiting
- [ ] Use Web Application Firewall (WAF)
- [ ] Enable audit logging
- [ ] Regular security patching

### Monitoring & Logging

```bash
# Install Prometheus & Grafana
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/kube-prometheus-stack

# Install ELK Stack for logs
helm repo add elastic https://helm.elastic.co
helm install elasticsearch elastic/elasticsearch

# Configure application metrics
# Add Micrometer to pom.xml
```

---

## Troubleshooting

### Pod won't start

```bash
kubectl describe pod <pod-name> -n car-rental
kubectl logs <pod-name> -n car-rental
```

### Database connection issues

```bash
# Check if MySQL is running
kubectl get pods -n car-rental | grep mysql

# Check environment variables
kubectl exec -it <pod-name> -n car-rental -- env | grep DATABASE
```

### Service not accessible

```bash
# Check service
kubectl get svc -n car-rental

# Check endpoints
kubectl get endpoints -n car-rental

# Test connectivity
kubectl run -it --rm debug --image=busybox --restart=Never -- sh
# Inside: wget -O- http://car-rental-service:80/api/cars
```

---

## Rollback Strategy

```bash
# View rollout history
kubectl rollout history deployment/car-rental-app -n car-rental

# Rollback to previous version
kubectl rollout undo deployment/car-rental-app -n car-rental

# Rollback to specific revision
kubectl rollout undo deployment/car-rental-app -n car-rental --to-revision=2
```

---

For questions or issues, refer to the [Spring Boot Deployment Guide](https://spring.io/guides/gs/spring-boot-docker/) and [Kubernetes Documentation](https://kubernetes.io/docs/).
