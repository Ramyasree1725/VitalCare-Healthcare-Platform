# VitalCare Healthcare Platform

VitalCare is a full-stack, quaternary healthcare application with patient appointment booking, doctor directories, clinical risk calculators, 24/7 blood bank inventory tracking, online hospital pharmacy, digital pathology lab report lookup, and 24/7 emergency 108 ambulance dispatch.

## Features

- **OPD Appointment Booking**: OPD token generation (`VITAL-984210`), doctor directory, and room allocation.
- **Interactive Symptom Risk Checker**: Automated organ risk scoring and diagnostic lab test recommendations.
- **Master Health Checkup Packages**: Full-body preventive screening panels with free home sample collection.
- **Diagnostic Pathology Lab Catalog**: Individual blood tests, lipid profile, HbA1c, kidney, liver, and thyroid panels.
- **24/7 Live Blood Bank Tracker**: Real-time whole blood, platelet, and plasma inventory registry.
- **Online Hospital E-Pharmacy**: Genuine medicine catalog with slide-over bag drawer and doorstep delivery.
- **Patient Portal & Report Lookup**: Search test/appointment confirmation code and print official pass.
- **Emergency Ambulance Dispatch (108)**: Code-Red Advanced Life Support (ALS ICU) ambulance dispatch simulation.

## Dependencies

- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher
- **Docker**: (Optional) For containerized execution

## Installation

```bash
# Clone the repository
git clone https://github.com/Ramyasree1725/vitalcare.git
cd vitalcare

# Install dependencies
npm install
```

## Build

```bash
# Verify static build assets
npm run build
```

## Run

```bash
# Start the production web server (Port 9090)
npm start

# Development mode with auto-reload
npm run dev
```

After starting, open **[http://localhost:9090](http://localhost:9090)** in your web browser.

## Test & Coverage

```bash
# Run unit test suite
npm test

# Run tests with coverage reporting
npm run test:coverage
```

## Docker Container Execution

```bash
# Build Docker image
docker build -t vitalcare-healthcare .

# Run Docker container on Port 9090
docker run -p 9090:9090 vitalcare-healthcare
```

## API Documentation

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | System health status & bed capacity |
| GET | `/api/departments` | List clinical specialty centers |
| GET | `/api/doctors` | Doctor directory search & filter |
| GET | `/api/packages` | Master health checkup packages |
| GET | `/api/tests` | Diagnostic pathology & radiology lab tests |
| POST | `/api/appointments` | Book OPD doctor appointment |
| GET | `/api/appointments/lookup/:code` | Lookup appointment token or lab report |
| POST | `/api/symptom-checker` | Interactive symptom risk diagnostic evaluation |
| GET | `/api/bloodbank` | Live blood bank inventory registry |
| GET | `/api/pharmacy` | Online hospital pharmacy catalog |
| POST | `/api/pharmacy/order` | Place pharmacy medicine order |
| POST | `/api/emergency/ambulance` | Dispatch 108 emergency ambulance |
| POST | `/api/auth/login` | Patient & staff portal authentication |
| POST | `/api/auth/register` | Patient & staff registration |

## License

Proprietary. All rights reserved. This software is not open source and may not be redistributed without permission.
