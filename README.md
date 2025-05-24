# 🐞 SnugBug - E-commerce Website for 0 to 5 Year Olds

SnugBug is a full-stack e-commerce web application tailored for babies and toddlers aged 0 to 5 years. It allows users to browse products, search items, register/login as a customer or seller, add items to cart, and much more.

---

## 📁 Project Structure

ecommerce-snugbug/ ├── backend/ # Spring Boot backend (Java + Spring Data JPA) └── frontend/ # React + Vite + TypeScript frontend

---

## 🛠️ Tech Stack

### 🚀 Frontend
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

### 🔧 Backend
- [Spring Boot](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [JWT Authentication](https://jwt.io/)
- [BCrypt](https://mvnrepository.com/artifact/org.springframework.security/spring-security-crypto)
- Microsoft SQL Server

---

## 🔑 Features

- 🧸 Product catalog for babies (0–5 years)
- 🔍 Global product search
- 🛒 Shopping cart with quantity tracking
- 🔐 JWT-based authentication for customers and sellers
- 🧾 Seller dashboard to add/manage products
- 📱 Responsive UI with a playful and modern look

---

## 🧩 Getting Started

### 🖥️ Frontend

```bash
--- frontend code
cd ecommerce-snugbug
npm install
npm run dev
Runs on: http://localhost:5173
---backend code
cd backend
./mvnw spring-boot:run
Runs on: http://localhost:8080

Make sure to configure your application.properties with correct SQL Server DB credentials.
