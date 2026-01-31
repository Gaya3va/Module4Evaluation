# Module4Evaluation
31.01.2026
# Fleet Management System

## Tech
- Node.js
- Express
- Supabase
- PostgreSQL

## Setup

npm install  
npm run dev  

## API Routes

### Users
POST /users/signup

### Vehicles
POST /vehicles/add  
PATCH /vehicles/assign-driver/:id  
GET /vehicles/:id  

### Trips
POST /trips/create  
PATCH /trips/update/:id  
GET /trips/:id  
DELETE /trips/delete/:id  
PATCH /trips/end/:id  

### Analytics
GET /analytics

## Middleware
- Logger
- Rate Limiter
- 404 Handler
