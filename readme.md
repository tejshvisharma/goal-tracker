# 🎯 Goal Tracker Backend

This is the **backend service** for the Goal Tracker project, built with **Node.js, Express, and MongoDB**.  
It provides APIs for **user authentication, goal management, and health monitoring**.  
The API currently supports both browser and mobile clients.

---

## 🚀 Features

✅ **User Authentication**

- Register new users
- Login with JWT authentication
- HttpOnly cookie + Bearer token auth support
- Protected routes using middleware

✅ **Goal Management**

- Create, Read, Update, Delete (CRUD) goals
- Link goals to authenticated users
- Validate incoming requests

✅ **Health Monitoring**

- API health check endpoint

✅ **Error Handling & Validation**

- Centralized error handling
- Custom error and response utilities
- Input validation middleware wired on user and goal routes

---

## 📂 Project Structure

```plaintext
backend/
│── app.js                 # Express app configuration
│── server.js              # Server entry point
│
├── controllers/           # Route controllers (business logic)
│   ├── goal.controllers.js
│   ├── health.controller.js
│   └── user.controllers.js
│
├── routes/                # API routes
│   ├── goal.routes.js
│   ├── health.routes.js
│   └── user.routes.js
│
├── models/                # Mongoose models
│   ├── goal.model.js
│   └── user.model.js
│
├── middleware/            # Custom middleware
│   ├── auth.middleware.js
│   ├── errorHandler.middleware.js
│   └── validate.middleware.js
│
├── validators/            # Route validators
│   ├── goal.validators.js
│   └── user.validators.js
│
├── utils/                 # Utility helpers
│   ├── apiError.js
│   ├── apiResponse.js
│   └── asyncHandler.js
│
├── db/                    # Database connection
│   └── db.js
│
└── public/                # Static files (for frontend later)
    └── index.html

```

     ---

## ⚙️ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**
   Create a .env file in the root directory with the following variables:

   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   API_BASE_URL=http://localhost:5173
   NODE_ENV=development

4. **Run the server**
   ```bash
   node backend/server.js
   npx nodemon backend/server.js
   ```

## 📡 API Endpoints

## 🔑 Authentication user & Goals

| Method | Endpoint               | Description          | Auth Required       |
| ------ | ---------------------- | -------------------- | ------------------- |
| POST   | /api/v1/user/register  | Register a new user  | No                  |
| POST   | /api/v1/user/login     | Login and get JWT    | No                  |
| GET    | /api/v1/user/me        | Current user profile | Yes (cookie/header) |
| GET    | /api/v1/user/all-users | List all users       | Yes (cookie/header) |
| GET    | /api/v1/goals          | Get user goals       | Yes (cookie/header) |
| POST   | /api/v1/goals          | Create goal          | Yes (cookie/header) |
| PUT    | /api/v1/goals/:id      | Update goal          | Yes (cookie/header) |
| DELETE | /api/v1/goals/:id      | Delete goal          | Yes (cookie/header) |
| GET    | /api/v1/healthcheck    | API health check     | No                  |

# 🛡️ Middleware

- Auth Middleware → Protects routes with JWT
- Supports accessToken from cookie and Authorization Bearer header

- Validation Middleware → Validates incoming requests

- Error Handler → Centralized error response system

# 🛠️ Tech Stack

- Node.js – Server runtime

- Express.js – Web framework

- MongoDB & Mongoose – Database and ODM

- JWT – Authentication

- Nodemon – Dev tool

# 🚧 Future Work

- Add frontend (React.js) for UI

- Role-based authentication (Admin/User)

- Advanced goal tracking features (deadlines, categories)

- Unit & integration testing

# 📜 License

- This project is licensed under the MIT License.

## 📘 API Docs

- Frontend API contract is documented in API_REFERENCE.md

---
