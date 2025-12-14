# Sweet Shop Application

A full-stack web application for managing a sweet shop inventory. This project consists of a Node.js/Express backend and a React frontend.

## Project Structure

- **Backend**: RESTful API built with Node.js, Express, and MongoDB.
- **Frontend**: Modern UI built with React, Vite, and Tailwind CSS.

## Features

### Backend
- **Authentication**: JWT-based auth with Role-Based Access Control (RBAC) for Users and Admins.
- **Sweets Management**: CRUD operations for sweets (Admin only for Create/Update/Delete).
- **Inventory System**: 
  - `purchase` endpoint to decrement stock.
  - `restock` endpoint to increment stock (Admin only).
- **Search**: Filter sweets by name and price.
- **Security**: Password hashing, input validation.

### Frontend
- **User Interface**: Responsive design using Tailwind CSS and shadcn/ui.
- **Dashboard**: View available sweets and real-time stock levels.
- **Interactivity**: 
  - Users can purchase sweets.
  - Real-time search and filtering.
- **Auth Integration**: Login and Register forms connected to the backend.

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Language**: TypeScript
- **Testing**: Jest & Supertest

### Frontend
- **Build Tool**: Vite
- **Framework**: React
- **Language**: TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **State Management**: TanStack Query

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)

### 1. Setup Backend

1. Navigate to the backend directory:
   ```bash
   cd BackEnd
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `BackEnd` root:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/sweetshop
   JWT_SECRET=your_super_secret_key
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:3000`.

### 2. Setup Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser.