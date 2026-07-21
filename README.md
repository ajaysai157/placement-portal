# 🎓 Placement Portal

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application that connects **Students** and **Recruiters** through a modern placement platform. Students can browse and apply for jobs, while recruiters can post jobs and manage applications through dedicated dashboards.

## 🌐 Live Demo

**Frontend:** https://placement-portal-topaz.vercel.app/

**Backend API:** https://placement-portal-backend-s4n0.onrender.com/

---

## ✨ Features

### 👨‍🎓 Student

- User Registration & Login
- JWT Authentication
- Complete Profile Management
- Upload Profile Picture
- Upload Resume
- Browse Available Jobs
- Search & Filter Jobs
- Apply for Jobs
- View Applied Jobs
- Student Dashboard

### 👨‍💼 Recruiter

- Secure Login
- Recruiter Dashboard
- Create Job Posts
- Edit Job Posts
- Delete Job Posts
- View Applicants
- Accept / Reject Applications

### 🔐 Authentication

- JWT Based Authentication
- Password Hashing using bcrypt
- Role-Based Authorization
- Protected Routes

### ☁️ Media Uploads

- Cloudinary Integration
- Profile Picture Upload
- Resume Upload

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- CSS3
- React Icons
- Vite

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- Multer
- Cloudinary

## Deployment

- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas
- Media Storage → Cloudinary

---

# 📁 Project Structure

```
placement-portal/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/ajaysai157/placement-portal.git
```

```bash
cd placement-portal
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder.

```env
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret

FRONTEND_URL=http://localhost:5173
```

Run the backend:

```bash
npm start
```

---

## Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file inside the frontend folder.

```env
VITE_API_URL=http://localhost:5000/api
```

Run the frontend:

```bash
npm run dev
```

---

# 📡 API Base URL

Local

```
http://localhost:5000/api
```

Production

```
https://placement-portal-backend-s4n0.onrender.com/api
```

---

# 📸 Screenshots

> Screenshots will be added soon.

- Home Page
- Login
- Register
- Student Dashboard
- Recruiter Dashboard
- Job Listings
- Job Details
- Profile
- Applications

---

# 📌 Future Improvements

- Forgot Password
- Email Verification
- Notifications
- Saved Jobs
- Company Logos
- Pagination
- Admin Dashboard
- Interview Scheduling
- Email Notifications

---

# 📚 Learning Outcomes

This project helped me gain hands-on experience with:

- Building Full-Stack MERN Applications
- REST API Development
- JWT Authentication
- Role-Based Authorization
- MongoDB & Mongoose
- Cloudinary Integration
- Image & Resume Uploads
- Deployment using Render & Vercel
- Environment Variables
- CORS Configuration
- Git & GitHub Workflow

---

# 👨‍💻 Author

**Ajaysai**

GitHub:
https://github.com/ajaysai157

LinkedIn:
(Add your LinkedIn Profile URL)

---

## ⭐ If you like this project

Please consider giving this repository a ⭐ on GitHub.