# NITDA State ICT Readiness Assessment API

A NestJS-based backend API for assessing and tracking ICT infrastructure and digital transformation readiness across Nigerian states. This system enables government officials to submit, review, and visualize state-level ICT metrics.

## Overview

The NITDA State ICT Readiness Assessment System evaluates states across 8 key categories:
- State Budget Allocation
- Government Systems
- Internet Availability & Speed
- Level of ICT Reforms
- Deployment of Computer Systems
- Startup Ecosystem
- Status of State Website
- Staff ICT Proficiency

States are scored and ranked, with color-coded categories: **Red** (≤40), **Amber** (41-64), **Green** (≥65).

## Installation

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

### Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd maps-Be
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (see [Environment Variables](#environment-variables) section)

4. Run database migrations (TypeORM auto-sync is enabled in development)

## Setup

### Local Development

```bash
# Development mode with hot reload
npm run start:dev

# Standard development mode
npm run start

# Production mode
npm run start:prod
```

The API will be available at `http://localhost:3000` (or the port specified in your `.env` file).

### Docker Setup

```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in detached mode
docker-compose up -d
```

### Database Setup

The application uses TypeORM with auto-synchronization enabled. On first run, tables will be created automatically based on entity definitions.

**Entities:**
- `users` - User accounts with role-based access
- `state` - Nigerian states
- `reports` - Report metadata
- `report_data` - ICT assessment metrics (27 fields)
- `report_score` - Calculated scores across 8 categories
- `actions` - Audit trail of user actions

## API Documentation

### Swagger Documentation

Once the application is running, access the interactive API documentation at:

```
http://localhost:3000/swagger
```

### Authentication

The API uses JWT Bearer token authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-access-token>
```

### Key Endpoints

#### Authentication
- `POST /auth/signup` - Register a new user
- `POST /auth/signin` - Login and receive JWT tokens

#### User Management
- `GET /user/get-users` - Get all users (Admin only)
- `POST /user/generate-user` - Generate a new user (Admin only)
- `PATCH /user/update-profile/:id` - Update user profile
- `DELETE /user/:id` - Delete user (Admin only)

#### State Management
- `GET /state` - Get all states
- `POST /state` - Create a new state (Admin/Reporter)
- `GET /state/json/nigeria.geojson` - Get Nigeria GeoJSON map data
- `GET /state/json/{category}` - Get category-specific visualization data

#### Report Management
- `POST /report/create-report-data` - Create new report data (Reporter/Admin)
- `POST /report/save` - Save report as draft (Reporter/Admin)
- `POST /report/submit-report-data` - Submit report for review (Reporter/Admin)
- `GET /report/get-reports` - Get all reports
- `GET /report/get-report-data` - Get all report data
- `GET /report/get-report-score` - Get all report scores
- `GET /report/get-report-by-state/:id` - Get report by state ID
- `GET /report/rank` - Get state rankings by score
- `GET /report/score-category/:id` - Get score category (Red/Amber/Green)
- `POST /report/actions/:id` - Perform action on report (publish/decline/delete) (Admin only)
- `PATCH /report/update-report-data/:id` - Update report data
- `DELETE /report/delete-report-data/:id` - Delete report data (Admin only)

### User Roles

- **Admin** - Full access to all endpoints, can publish/decline reports
- **Reporter** - Can create and submit reports for their assigned state
- **Viewer** - Read-only access (default role)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000

# Database Configuration
DATABASE_URL=postgresql://username:password@host:port/database

# JWT Configuration
JWT_ACCESS_TOKEN_SECRET=your-access-token-secret-here
JWT_ACCESS_TOKEN_EXPIRATION_TIME=15m
JWT_REFRESH_TOKEN_SECRET=your-refresh-token-secret-here
JWT_REFRESH_TOKEN_EXPIRATION_TIME=7d
```

### Configuration Notes

- **DATABASE_URL**: Full PostgreSQL connection string with SSL support
- **JWT Secrets**: Use strong, randomly generated secrets for production
- **Token Expiration**: Access tokens expire quickly (15m), refresh tokens last longer (7d)

A `sample.env` file is provided as a template.

## Database Schema

### Users Table
```typescript
{
  id: UUID (PK)
  firstName: string
  lastName: string
  email: string (unique)
  password: string (hashed)
  role: enum (Admin, Reporter, Viewer)
  state: string (nullable)
  lastLogin: timestamp
  createdAt: timestamp
  updatedAt: timestamp
  refreshToken: string (nullable)
}
```

### State Table
```typescript
{
  id: UUID (PK)
  name: string
  createdAt: timestamp
  updatedAt: timestamp
}
```

### Report Data Table (27 ICT Metrics)
```typescript
{
  id: UUID (PK)
  state: string
  // Budget & Policy (3 fields)
  ictFund: number
  percentageOfBudget: number
  presenceOfIctProjects: number
  // Government Systems (3 fields)
  ictMinistry: number
  stateIctPolicy: number
  officialMailUse: number
  // Internet Infrastructure (4 fields)
  officialInternetProvision: number
  officialInternetSpeed: number
  videoConferenceUse: number
  intranetUse: number
  // ICT Reforms (7 fields)
  ict4Learning: number
  ict4HealthRecords: number
  presenceofTelemedicine: number
  digitizedLandRecords: number
  digitizedJudiciary: number
  digitizedAgric: number
  ecommerceIncentives: number
  // Computer Systems (4 fields)
  stateIctSystemDeploment: number
  stateITDepartment: number
  digitizedFiling: number
  cyberSecurityInfra: number
  // Startup Ecosystem (3 fields)
  startupDb: number
  startupInvestmentVolume: number
  startUpDirectJobs: number
  // Website Status (3 fields)
  stateWebsiteFunctionality: number
  stateWebsiteUI: number
  stateWebsiteSecurity: number
  // Staff Proficiency (2 fields)
  iCTUpskill: number
  certifiedITPersonnel: number
  createdAt: timestamp
  updatedAt: timestamp
}
```

### Report Score Table
```typescript
{
  id: UUID (PK)
  stateId: UUID (FK)
  reportDataId: UUID (FK)
  stateBudgetAllocation: number (calculated)
  govSystems: number (calculated)
  internetAvailSpeed: number (calculated)
  levelIctReforms: number (calculated)
  deploymentCompSystems: number (calculated)
  startUpEcosystem: number (calculated)
  statusStateWebsite: number (calculated)
  staffIctProficiency: number (calculated)
  totalScore: number (sum of all categories)
  createdAt: timestamp
  updatedAt: timestamp
}
```

### Reports Table
```typescript
{
  id: UUID (PK)
  createdById: UUID (FK to users)
  nameOfOfficer: string
  publishedById: UUID (FK to users, nullable)
  publishedBy: string (nullable)
  reportDataId: UUID (FK to report_data)
  reportData: JSONB (embedded report data)
  status: string (not published, published, declined)
  publishedOn: timestamp
  state: string
  stateId: UUID (FK to state)
  createdAt: timestamp
  updatedAt: timestamp
}
```

## How It Works

### Report Submission Workflow

1. **Reporter Login**: User authenticates and receives JWT tokens
2. **Create/Save Draft**: Reporter can save report data without submitting
3. **Submit Report**: Reporter submits complete assessment data
4. **Auto-Scoring**: System automatically calculates scores across 8 categories
5. **Admin Review**: Admin reviews submitted reports
6. **Publish/Decline**: Admin publishes approved reports or declines with feedback
7. **Ranking**: Published reports appear in state rankings
8. **Visualization**: Frontend displays data on interactive maps using GeoJSON

### Scoring Algorithm

Each of the 8 categories is calculated by summing specific metrics:

```typescript
stateBudgetAllocation = ictFund + percentageOfBudget + presenceOfIctProjects
govSystems = ictMinistry + stateIctPolicy + officialMailUse
internetAvailSpeed = officialInternetProvision + officialInternetSpeed + videoConferenceUse + intranetUse
levelIctReforms = ict4Learning + ict4HealthRecords + presenceofTelemedicine + digitizedLandRecords + digitizedJudiciary + digitizedAgric + ecommerceIncentives
deploymentCompSystems = stateIctSystemDeploment + stateITDepartment + digitizedFiling + cyberSecurityInfra
startUpEcosystem = startupDb + startupInvestmentVolume + startUpDirectJobs
statusStateWebsite = stateWebsiteFunctionality + stateWebsiteUI + stateWebsiteSecurity
staffIctProficiency = iCTUpskill + certifiedITPersonnel

totalScore = sum of all 8 categories
```

### Color Categories
- **Red**: totalScore ≤ 40 (Low readiness)
- **Amber**: 41 < totalScore < 65 (Moderate readiness)
- **Green**: totalScore ≥ 65 (High readiness)

### Data Validation

- One report per state (prevents duplicates)
- All numeric fields validated and parsed as integers
- Role-based access control enforced on all endpoints
- JWT token validation on protected routes

## Testing

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run end-to-end tests
npm run test:e2e

# Generate test coverage report
npm run test:cov
```

### Test Structure
- Unit tests: `src/**/*.spec.ts`
- E2E tests: `test/**/*.e2e-spec.ts`
- Coverage reports: `coverage/` directory

## Technology Stack

- **Framework**: NestJS (Node.js/TypeScript)
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT with Passport
- **Validation**: class-validator, class-transformer
- **API Documentation**: Swagger/OpenAPI
- **Security**: bcryptjs for password hashing
- **Deployment**: Docker, Heroku-ready

## License

UNLICENSED
