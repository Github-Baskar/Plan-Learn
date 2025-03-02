# PLAN & LEARN (MERN-based AI-powered Learning Platform)

## 🚀 Overview
This project is an AI-powered learning platform built with the **MERN stack** (MongoDB, Express, React with Vite, and Node.js). It leverages **Google Gemini AI** to generate personalized study plans for users based on their learning preferences. The platform supports **Google OAuth and email-password authentication**, providing a seamless and secure login experience.

## 🛠️ Tech Stack
- **Frontend**: React (Vite) + TypeScript
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: Google OAuth & Email-Password (JWT-based authentication)
- **AI Integration**: Google Gemini AI
- **Hosting**: Vercel

## ✨ Features
- 🧠 **AI-Powered Study Plans**: Personalized learning paths using Google Gemini AI.
- 🔐 **Secure Authentication**: Supports Google OAuth and email-password login.
- 📚 **Schedule Management**: Users can explore, enroll in, and manage their schedules.
- 📈 **Progress Tracking**: Monitor study progress.
- ⚡ **Fast & Optimized**: Built with Vite for a high-performance frontend experience.

## 📦 Installation

### Prerequisites
- **Node.js** (v16+ recommended)
- **MongoDB** (local or cloud-based like MongoDB Atlas)
- **Google Developer Account** (for Gemini AI & OAuth setup)

### Steps to Run Locally

1. **Clone the repository**:
   ```sh
   git clone https://github.com/Github-Baskar/Plan-Learn.git
   
   cd Plan-Learn
   ```

2. **Install dependencies**:
   ```sh
   # Step-1: Install concurrently
   npm install
   
   # Step-2: Install backend and frontend dependencies
   npm install-all
   ```

3. **Set up environment variables**:
   Create a `.env` file in both `Plan-Learn/` and `frontend/` directories with the necessary credentials.
   
   **Example (`Plan-Learn/.env`):**
   ```env
   PORT
   NODE_ENV
   MONGO_URI
   JWT_SECRET
   ORIGIN_BASE_URL
   ```
   **Example (`frontend/.env`):**
   ```env
   VITE_GEMINI_API_KEY
   VITE_API_BASE_URL
   VITE_GOOGLE_CLIENT_ID
   VITE_GOOGLE_PROJECT_ID
   VITE_GOOGLE_CLIENT_SECRET
   ```

4. **Start the project**:
   ```sh
   npm run dev
   ```

5. **Access the app**:
   Open `http://localhost:3000` in your browser.

## 🏗️ Project Structure
```
Plan-Learn/
│── backend/                  # Backend (Node.js + Express + MongoDB)
│── frontend/                 # Frontend (React + Vite + TypeScript)
│── .gitignore
│── README.md
│── package.json              # Backend package.json
```

## 🔧 API Endpoints

### Authentication
- `POST /api/user`         – Register a new user
- `POST /api/user/auth`    – Login user
- `POST /api/user/signout` – Signout user

### Study Plans
- `POST /api/study-plan/overlapping`   – Checking study plan overlapping
- `POST /api/study-plan/add`           – Add study plan
- `GET /api/study-plans`               – Fetch personalized study plans list for user
- `GET /api/study-plan/{id}`           – Fetch selected study plan information
- `PUT /api/study-plan/{id}`           – Update selected study plan information
- `DELETE /api/study-plan/{id}`        – Delete selected study plan

## 🌐 Deployment
For production deployment, consider using:
- **Frontend**: Vercel Hosting
- **Backend**: Vercel Hosting
- **Database**: MongoDB Atlas

---
**Author:** Baskar ([GitHub](https://github.com/Github-Baskar))

