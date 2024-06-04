# CarBro

## Overview

This is a RESTful API for a car rental service that allows users to register, book cars, and manage car rentals. The service includes functionalities for both regular users and administrators. Authentication is handled using JWT tokens.

## Features

1. **User Registration**: Users can register to create an account.
2. **Admin Creation**: Superadmin can create admin accounts. The superadmin exists as a singleton.
3. **Car Management**: Admins can create and delete car records.
4. **Car Rental**: Registered users can rent a car. Users can only rent one car at a time.
5. **Rental Status Viewing (Admin)**: Admins can view which cars are currently rented.
6. **Available Cars Viewing**: Users and admins can view cars that are available for rental.
7. **Car Filtering**: Users can filter available cars by various fields (e.g., brand, model, year).
8. **Quick Search**: Users can quickly search for cars by brand or model name.
9. **User Management (Admin)**: Admins can view all users.
10. **Soft Deletion of Users**: Admins can soft delete user accounts.
11. **Geolocation**: *(Optional)* Add geolocation to cars, allowing "real-time" (without websocket implementation) updates and searches based on location and radius.

## Requirements

- **Authentication**: JWT tokens are used for authentication.
- **Role-Based Access**: Different endpoints and actions are available depending on the user's role (e.g., admin, user, superadmin).

### Auth

- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Login and receive a JWT token.

### Car

- `POST /car`: Create a new car record (admin).
- `DELETE /car/:id`: Delete a car record (admin).
- `GET /car`: Filter and search all cars by various fields (admin).
- `GET /car/:id`: Get car by id (user and admin).
- `GET /car/available`: View all available cars for rental (user).
- `PATCH /car/:id/location`: Update the geolocation of a car (user and admin).
- `GET /car/location`: Search cars based on geolocation and radius (user and admin).

### Rental

- `POST /rental/rent`: Rent a car (user and admin).
- `Patch /rental/:rentalId/return`: Return a car (user and admin).

### User

- `GET /user`: View all users (admin only).
- `GET /user/:id`: Get one user by id (admin only).
- `DELETE /user/:id`: Soft delete a user (admin only).
- `POST /user/admin/create`: Create admin user (superAdmin only).

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- TypeORM

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/elias-prodigy/CarBro.git

2. Install dependencies:
   ```sh
   npm install
   
3. Create new database.

4. Set up environment variables from .env.skeleton
5. Run migrations
   ```sh
   npm run typeorm:run-migrations
   
6. Install PostGIS globally by running following command
   ```sh
   sudo apt install postgis

7. Add PostGIS extension to your database
   ```sh
   sudo -u postgres psql
   \c 'your-db-name'
   CREATE EXTENSION postgis ;
6. Run application
   ```sh
   npm run start

### Tests

   To run tests
   ```sh
   npm run test
   ```
Since testing wasn't a prio - there are only few tests available for Auth module to save development time, but show an example how it should look like.
At the moment application doesn't support a separate database for testing purposes.
Obviously it should be implemented as well as seeding the database.