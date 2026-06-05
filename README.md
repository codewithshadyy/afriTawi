````md
# AfriTawi API

AfriTawi is a modern marketplace API platform built to empower local creatives, rural artisans, designers, and sellers in Kenya by allowing them to showcase and market their products online.

---

# Features

## Authentication
- User Registration
- Email Verification
- Login & Logout
- JWT Authentication
- Refresh Tokens
- Forgot Password
- Reset Password
- Role-Based Authorization

## Product Management
- Create Products
- Update Products
- Delete Products
- Product Search
- Filtering
- Pagination
- Product Ownership Validation
- Cloudinary Image Uploads

## Profile Management
- Seller Profiles
- Public Seller Pages
- County Assignment
- Avatar Uploads

## Admin Features
- Category Management
- County Management
- Audit Logging
- User Monitoring

---

# Tech Stack

## Backend
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM

## Authentication
- JWT
- bcrypt

## Media Storage
- Cloudinary

## Documentation
- Swagger / OpenAPI

---

# Database Relationships

## User & Profile
- User hasOne Profile
- Profile belongsTo User

## County & Profile
- County hasMany Profiles
- Profile belongsTo County

## User & Product
- User hasMany Products
- Product belongsTo User

## Category & Product
- Category hasMany Products
- Product belongsTo Category

---

# Installation

## Clone Repository

```bash
git clone <your-repository-url>
cd afritawi-api
````

## Install Dependencies

```bash
npm install
```

## Environment Variables

Create a `.env` file:

```env
PORT=4545

DB_NAME=creatives
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=localhost

JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret

EMAIL_USER=your_email
EMAIL_PASS=your_email_password

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

# Run Server

## Development

```bash
npm run dev
```

## Production

```bash
npm start
```

---

# API Documentation

Swagger Documentation:

```bash
http://localhost:4545/api-docs
```

---

# Authentication Routes

| Method | Endpoint                        | Description     |
| ------ | ------------------------------- | --------------- |
| POST   | /api/auth/signup                | Register user   |
| POST   | /api/auth/login                 | Login user      |
| POST   | /api/auth/logout                | Logout user     |
| POST   | /api/auth/forgot-password       | Forgot password |
| PUT    | /api/auth/reset-password/:token | Reset password  |
| GET    | /api/auth/verify-email/:token   | Verify email    |

---

# Product Routes

| Method | Endpoint          | Description        |
| ------ | ----------------- | ------------------ |
| GET    | /api/products     | Get all products   |
| GET    | /api/products/:id | Get single product |
| POST   | /api/products     | Create product     |
| PUT    | /api/products/:id | Update product     |
| DELETE | /api/products/:id | Delete product     |

---

# Profile Routes

| Method | Endpoint                | Description           |
| ------ | ----------------------- | --------------------- |
| POST   | /api/profiles           | Create profile        |
| GET    | /api/profiles/:username | Public seller profile |
| PUT    | /api/profiles/:id       | Update profile        |
| DELETE | /api/profiles/:id       | Delete profile        |

---

# Category Routes

| Method | Endpoint            | Description     |
| ------ | ------------------- | --------------- |
| GET    | /api/categories     | Get categories  |
| POST   | /api/categories     | Create category |
| PUT    | /api/categories/:id | Update category |
| DELETE | /api/categories/:id | Delete category |

---

# County Routes

| Method | Endpoint          | Description       |
| ------ | ----------------- | ----------------- |
| GET    | /api/counties     | Get counties      |
| GET    | /api/counties/:id | Get single county |
| POST   | /api/counties     | Create county     |
| PUT    | /api/counties/:id | Update county     |
| DELETE | /api/counties/:id | Delete county     |

---

# Audit Log Routes

| Method | Endpoint  | Description    |
| ------ | --------- | -------------- |
| GET    | /api/logs | Get audit logs |

---

# Image Uploads

Images are uploaded using:

* Multer
* Cloudinary

Supported:

* Product Images
* Seller Avatars

---

# Security Features

* JWT Authentication
* Protected Routes
* Admin Authorization
* Password Hashing
* Email Verification
* Refresh Token Handling
* Token Blacklisting

---

# Search & Filtering

Supported:

* Product Search
* Category Filtering
* County Filtering
* Pagination

---

# Example Product Response

```json
{
  "id": 1,
  "name": "Handmade Sandals",
  "price": "2500.00",
  "image_url": "https://cloudinary-url.com/image.jpg",
  "seller": {
    "username": "shadrack"
  },
  "category": {
    "name": "Fashion"
  },
  "county": {
    "name": "Kisii"
  }
}
```

---

# Future Improvements

* Payments Integration
* Cart System
* Order Management
* Messaging System
* Wishlist
* Reviews & Ratings
* Mobile App

---

# Author

AfriTawi API built by a passionate Kenyan software developer shadrack kipkoech(codewithshadyy) focused on empowering local creatives through technology.

---


```
