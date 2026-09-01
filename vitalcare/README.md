# VitalCare Healthcare Platform

Full-stack healthcare application with appointment booking, doctor directory, patient management, clinical calculators, and a modern web frontend.

## Features

- REST API for appointments, doctors, patients, services, contact
- In-memory data stores with validation and business rules
- Clinical utilities (BMI, BSA, BP categories, scheduling helpers)
- Responsive frontend with live doctor search and appointment form
- Domain modules for billing, pharmacy, laboratory, triage, and more
- Unit tests with Node.js test runner

## Requirements

- Node.js 18+
- npm 9+

## Installation

```bash
cd vitalcare
npm install
```

## Run

```bash
# Development / production
npm start

# Then open http://localhost:3000
```

## Build

```bash
npm run build
```

(Static assets are already in `public/`. No compile step required.)

## Test

```bash
npm test
npm run test:coverage
```

## Docker

```bash
docker build -t vitalcare .
docker run -p 3000:3000 vitalcare
```

## API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/health | Health check |
| GET | /api/doctors | Search doctors |
| GET | /api/doctors/specialties | List specialties |
| POST | /api/appointments | Create appointment |
| GET | /api/appointments | List appointments |
| POST | /api/patients/register | Register patient |
| GET | /api/services | Service catalog |
| POST | /api/contact | Contact inquiry |

## Project Structure

```
vitalcare/
├── public/           # Frontend (HTML, CSS, JS)
├── src/
│   ├── server.js     # Express entry point
│   ├── routes/       # API routes
│   ├── services/     # Business logic
│   ├── models/       # Data models & stores
│   ├── utils/        # Validators, config, clinical helpers
│   ├── domain/       # Domain services (billing, pharmacy, ...)
│   └── lib/          # Shared libraries
├── tests/            # Unit tests
├── Dockerfile
├── package.json
└── README.md
```

## License

Proprietary. All rights reserved. This software is not open source and may not be redistributed without permission.


