## Project Overview

This project aims to develop an Express application using TypeScript, integrating MongoDB with Mongoose for effective data management. Data integrity is ensured through validation using Zod. Our backend system enables users to easily rent bikes online, manage bookings, and ensure secure user authentication and authorization.

## Objectives

- Set up an Express project with TypeScript
- Integrate MongoDB using Mongoose to store all user, bike, and rental data data
- Efficient system to manage bike rentals in Cox's Bazar, catering to both tourists and locals
- Define Mongoose models for all data model with appropriate data types and validations
- Implement CRUD operations for bike
- Implement rental management and bike status updates
- Validate incoming data for bike, user, and rental creation using Zod

## Prerequisites

Ensure you have the following installed on your machine:

- Node.js
- npm or Yarn
- MongoDB (Local instance or a cloud-based MongoDB Atlas)

## Getting Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/IsaT10/bike-rental
   ```

2. **Install Dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn
   ```

3. **Environment Variables**

   Create a `.env` file in the root directory of your project and add the following environment variables:

   ```env
   PORT=7000

   SALT_ROUNDS=bcrypt_salt_round

   JWT_ACCESS_SECRET=secret_token

   ACCESS_TOKEN_EXPIRES_IN=toke expire time

   DATABASE_URL= Local MongoDB instance or use MongoDB Atlas URI
   ```

   - `PORT`: The port on which your server will run.
   - `MONGODB_URI`: Your MongoDB connection string. You can set up a local MongoDB instance or use a cloud-based MongoDB service like MongoDB Atlas.
   - `SALT_ROUNDS`: The number of bcrypt salt rounds used for hashing passwords. Higher values mean more secure but slower hashing.
   - `JWT_ACCESS_SECRET`: The secret key for signing JWTs. Keep this value secure and private. Example_value: 10
   - `ACCESS_TOKEN_EXPIRES_IN`: The expiration time for access tokens. Can be specified in seconds ("3600"), minutes ("60m"), hours ("1h"), or other time units.

4. **Run the Project**

   To start the development server, use the following command:

   ```bash
   npm run start:dev
   ```

5. **Available Scripts**

   - `npm run start`: Runs the project in production mode.
   - `npm run start:dev`: Runs the project in development mode with hot-reloading.
   - `npm run build`: Compiles TypeScript to JavaScript.
   - `npm run lint`: Runs ESLint for code linting.
   - `npm run lint:fix`: Runs ESLint and fixes any fixable issues.

6. **API Endpoints**

   ### Auth

   - `POST` : `/api/auth/signup`: Signup a user.
   - `POST` : `/api/auth/signup`: Login a user.

   ### User

   - `GET` : `/api/users/me`: Retrived own profile. (Authorization Bearer TOKEN)
   - `PUT` : `/api/users/me`: Update a profile with Authorization. (Authorization Bearer TOKEN)

   ### Bike

   - `GET` : `/api/bikes`: Retrieve all bikes.
   - `POST` : `/api/bikes`: Create a bike. (Authorization Bearer TOKEN) admin
   - `PUT` : `/api/bikes/:id`: Update a bike. (Authorization Bearer TOKEN) admin
   - `DELETE` : `/api/bikes/:id`: Delete a bike. (Authorization Bearer TOKEN) admin

   ### Rentals

   - `GET` : `/api/rentals`: Retrieve all bikes. (Authorization Bearer TOKEN)
   - `POST` : `/api/rentals`: Create a bike. (Authorization Bearer TOKEN)
   - `PUT` : `/api/rentals/:id/return`: Update a rental. (Authorization Bearer TOKEN) admin
