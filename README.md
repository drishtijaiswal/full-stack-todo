# 📝 Full Stack ToDo Management App

A full-featured ToDo application built with **React (Vite)** and **Spring Boot** that supports:

- 🔐 JWT-based Authentication & Authorization
- 👥 Role-based Access Control (Admin & User)
- 🗂️ Task CRUD Operations
- 🐬 MySQL Database Integration
- 🐳 Docker Support

---

## 🚀 Tech Stack

### Backend (Spring Boot)
- Java, Spring Boot, Spring Security
- JWT Authentication
- JPA & Hibernate (MySQL)
- RESTful APIs
- Dockerized

### Frontend (Vite + React)
- Vite, React.js, Axios
- JWT Token Storage in localStorage
- Role-based UI rendering

---

## 🔐 Features

- **User Signup / Login**
- **JWT Token-Based Auth**
- **Admin & User Roles**
- **Users can manage their own tasks**
- **Admins can view all users’ tasks**
- **Protected routes based on roles**

---

## 🧪 Example Roles

### Admin

- **Username:** `admin@example.com`  
- **Password:** `admin123`  
- **Role:** `ADMIN`

### User

- **Username:** `user@example.com`  
- **Password:** `user123`  
- **Role:** `USER`

## 🛠️ Environment Variables

### Backend (`backend/.env`)
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=todo_db
DB_USER=your_mysql_user
DB_PASS=your_mysql_pass

JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=604800000
