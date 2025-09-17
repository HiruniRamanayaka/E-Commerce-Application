# Coffee Shop E-Commerce Web Application

This is a full-stack **E-Commerce website** for a coffeeshop developed as part of **Assignment 3 – E-Commerce Website Development**.  
The project allows users to view products, see detailed information, add items to a shopping cart, manage their orders, and contact via email.  
It also includes **authentication (login/signup)** and **Redux state management** for bonus features.

---

## 📌 Table of Contents
- [Features](#-features)  
- [Technology Stack](#-technology-stack)  
- [Project Structure](#-project-structure)  
- [Setup Instructions](#-setup-instructions)  
- [Seeding Database](#-seeding-database)  
- [Resend Email API Setup](#-resend-email-api-setup)  
- [High-Level Architecture](#-high-level-architecture)  
- [Author](#-author)  

---

## 📌 Features

### 🛒 Core Features
- View all products
- View details of a single product
- Add products to the cart
- View and manage cart items
- View and manage orders
- Contact page email submission (via Resend API) for public users

### ✨ Bonus Features
- User authentication (Login / Sign-Up with JWT)
- Redux state management for cart, orders and authentication
- Responsive UI with Tailwind CSS

---

## 🔧 Technology Stack

### Frontend
- React.js
- Redux Toolkit (State Management)
- React Router (Navigation)
- Tailwind CSS (Styling)

### Backend
- Node.js with Express
- MongoDB (Database)
- JWT (Authentication)
- Mongoose (ODM)
- Resend Email API (Contact page)

---

## 📂 Project Structure
```bash
/frontend
├── src
│ ├── app (store.js)
│ ├── assets
│ ├── components
│ ├── pages (Home, Products, Product.jsx, Contact, Login, SignUp, etc.)
│ ├── features (cartSlice, authSlice, orderSlice)
│ ├── utils (PrivateRoutes)
│ ├── api.js
│ ├── App.jsx
│ └── main.jsx
/backend
├── models (Product, User, Cart, Employee, Order)
├── routes (productRoutes, userRoutes, cartRoutes, auth, email)
├── controllers (authController, cartController, emailController, employeeController, orderController, productController)
├── services
│ └── emailServices.js # Resend integration
│ └── authServices.js
├── middleware (authMiddleware, authorizeRole, errorMiddleware)
├── .env
├── seeds.js 
└── server.js
```

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/HiruniRamanayaka/E-Commerce-Application.git
cd ecommerce-app
```

### 2️⃣Backend Setup
```bash
cd backend
npm install
```

### Create a .env file in /backend:
```bash
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
RESEND_API_KEY=<your-resend-api-key>
EMAIL_FROM=<your-email-address>
PORT=5000
```

## Seed the database (optional, to add sample products and employees):
```bash
    node seed.js
```

- Start the backend:
```bash
    node server.js
```

- Backend runs on http://localhost:5000

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

- Frontend runs on http://localhost:5173 (Vite)

## 🔑 Resend Email API Setup

- Go to [Resend](https://resend.com/) and create an account.
- Once logged in, navigate to API Keys in your dashboard.
- Click Create API Key and copy the key.
- Add this key to your .env file:
```bash
    RESEND_API_KEY=<your-resend-api-key>
    EMAIL_FROM=<your-email-address>
```
- RESEND_API_KEY → The key you copied from Resend.
- EMAIL_FROM → The email address that will appear as the sender (can be your verified email in Resend).

## High level Architecture
[High level architecture](https://res.cloudinary.com/dgjs19uyt/image/upload/v1758131444/High-Level_Architectural_Diagram_ctthcp.jpg)

## 👩‍💻 Author
**Name**: R.K.H.K. Ramanayaka  
**Student ID**: SE/2021/024  