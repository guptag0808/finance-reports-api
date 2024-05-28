# Personal Finance Management System

## Overview

The Personal Finance Management System is a backend application for managing personal finances, including features such as budgeting, expense tracking, and financial reporting. This system allows users to register, log in, and manage their income and expenses while providing monthly financial reports.

## Features

- User registration and authentication
- CRUD operations for income and expenses
- Budget creation and tracking
- Monthly financial reports
- Category-wise expense tracking (e.g., groceries, rent, entertainment)

## Technologies Used

- Node.js
- Express.js
- Prisma (ORM)
- JWT for authentication
- SQLite (or any other supported database by Prisma)
- dotenv for environment variable management

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Aiven (or another database supported by Prisma)

### Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd personal-finance-management
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root of the project and add the following variables:

    ```env
    DATABASE_URL="file:./dev.db" # Update this if using a different database
    JWT_SECRET="your_jwt_secret"
    PORT=3000
    ```

4. Set up the database:

    ```bash
    npx prisma migrate dev --name init
    npx prisma generate
    ```

5. Start the server:

    ```bash
    npm start
    ```

    The server should now be running on `http://localhost:3000`.

## API Endpoints

### User Registration

- **Endpoint**: `POST /user/register`
- **Description**: Registers a new user.
- **Body**:

    ```json
    {
      "email": "user@example.com",
      "password": "password123",
      "name": "Raj"
    }
    ```

### User Authentication

- **Endpoint**: `POST /user/login`
- **Description**: Authenticates a user and returns a JWT token.
- **Body**:

    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```

### Create a new Category

- **Endpoint**: `POST /categories`
- **Description**: Creates a new categories.
- **Headers**: 

    ```json
    {
      "Authorization": "Bearer <your_jwt_token>"
    }
    ```

- **Body**:

    ```json
    {
      "name":"Travelling"
    }
    ```
    ### Retrieve all Category

- **Endpoint**: `GET /categories`
- **Description**: Creates a new categories.
- **Headers**: 

    ```json
    {
      "Authorization": "Bearer <your_jwt_token>"
    }
    ```
### Create a Transaction

- **Endpoint**: `POST /transactions`
- **Description**: Creates a new transaction.
- **Headers**: 

    ```json
    {
      "Authorization": "Bearer <your_jwt_token>"
    }
    ```

- **Body**:

    ```json
    {
      "amount": 100.00,
      "type": "expense",
      "categoryId": 1
    }
    ```
    
### Retrieve a Transaction

- **Endpoint**: `GET /transactions`
- **Description**: Retrieve all transaction.
- **Headers**: 


### Update  Transaction

- **Endpoint**: `PUT /transactions/:id`
- **Description**: Update an old transaction.
- **Headers**: 

    ```json
    {
      "Authorization": "Bearer <your_jwt_token>"
    }
    ```

- **Body**:

    ```json
    {
      "amount": 500,
      "type": "expense",
      "categoryId": 1
    }
    ```

### Delete a Transaction

- **Endpoint**: `DELETE /transactions/:id`
- **Description**: Delete a transaction.
- **Headers**: 

    ```json
    {
      "Authorization": "Bearer <your_jwt_token>"
    }
    ```
  
### Create a Budget

- **Endpoint**: `POST /budgets`
- **Description**: Creates a new budget.
- **Headers**: 

    ```json
    {
      "Authorization": "Bearer <your_jwt_token>"
    }
    ```

- **Body**:

    ```json
    {
      "amount": 1500.00,
      "month": 5,
      "year": 2024
    }
    ```

### Monthly Financial Report

- **Endpoint**: `GET reports/monthly`
- **Description**: Retrieves the monthly financial report.
- **Headers**: 

    ```json
    {
      "Authorization": "Bearer <your_jwt_token>"
    }
    ```

- **Query Parameters**:
  - `month`: (integer) The month for the report.
  - `year`: (integer) The year for the report.
- **Example**:

    ```bash
    GET reports/monthly?month=5&year=2024
    ```
     ```json
    {
      "Authorization": "Bearer <your_jwt_token>"
    }
    ```


