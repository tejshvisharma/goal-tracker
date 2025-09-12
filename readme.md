# 🎯 Goal Tracker Backend

This is the **backend service** for the Goal Tracker project, built with **Node.js, Express, and MongoDB**.  
It provides a complete API for **user authentication, goal management, and system health checks**.  
The frontend will be added later to interact with these APIs.  

---

## 🚀 Features

- **User Authentication**  
  - Register new users  
  - Login with JWT authentication  
  - Protected routes using middleware  

- **Goal Management**  
  - Create, Read, Update, Delete (CRUD) goals  
  - Link goals to authenticated users  
  - Validate incoming requests  

- **Health Monitoring**  
  - Simple endpoint to check API health status  

- **Error Handling & Validation**  
  - Centralized error handling  
  - Custom error and response utilities  
  - Input validation middleware  

---

## 📂 Project Structure

backend/
│── app.js # Express app configuration
│── server.js # Server entry point
│
├── controllers/ # Route controllers (business logic)
│ ├── goal.controllers.js
│ ├── health.controller.js
│ └── user.controllers.js
│
├── routes/ # API routes
│ ├── goal.routes.js
│ ├── health.routes.js
│ └── user.routes.js
│
├── models/ # Mongoose models
│ ├── goal.model.js
│ └── user.model.js
│
├── middleware/ # Custom middleware
│ ├── auth.middleware.js
│ ├── errorHandler.middleware.js
│ └── validate.middleware.js
│
├── utils/ # Utility helpers
│ ├── apiError.js
│ ├── apiResponse.js
│ └── asyncHandler.js
│
├── db/ # Database connection
│ └── db.js
│
└── public/ # Static files (for frontend later)
└── index.html


---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd <repo-folder>
2. **Install dependencies**
    ```bash
    npm install

3. **Setup environment variables**
    Create a .env file in the root directory with the following variables:

    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key

4. **Run the server**
    ```bash
    npm run dev   # for development (with nodemon)
    npm start     # for production

📡 API Endpoints
🔑 Authentication
Register User

POST /api/users/register
JSON
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}


✅ Response:
JSON
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "64f1a2b...",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "jwt_token_here"
  }
}

Login User

POST /api/users/login
JSON
{
  "email": "john@example.com",
  "password": "123456"
}


✅ Response:
JSON
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "64f1a2b...",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "jwt_token_here"
  }
}

🎯 Goals (Protected – requires Bearer Token)
Get All Goals

GET /api/goals
Headers:

Authorization: Bearer jwt_token_here


✅ Response:
JSON
{
  "success": true,
  "data": [
    {
      "_id": "64f1b3c...",
      "title": "Learn Node.js",
      "description": "Finish backend course",
      "user": "64f1a2b..."
    }
  ]
}

Create Goal

POST /api/goals
Headers:

Authorization: Bearer jwt_token_here


Body:
JSON
{
  "title": "Build a project",
  "description": "Work on fullstack app"
}


✅ Response:
JSON
{
  "success": true,
  "message": "Goal created successfully",
  "data": {
    "_id": "64f1b4d...",
    "title": "Build a project",
    "description": "Work on fullstack app",
    "user": "64f1a2b..."
  }
}

Update Goal

PUT /api/goals/:id
JSON
{
  "title": "Build a bigger project"
}


✅ Response:
JSON
{
  "success": true,
  "message": "Goal updated successfully",
  "data": {
    "_id": "64f1b4d...",
    "title": "Build a bigger project",
    "description": "Work on fullstack app",
    "user": "64f1a2b..."
  }
}

Delete Goal

DELETE /api/goals/:id
✅ Response:
JSON
{
  "success": true,
  "message": "Goal deleted successfully"
}

💓 Health Check

GET /api/health
✅ Response:
JSON
{
  "status": "OK",
  "uptime": 1234,
  "timestamp": "2025-09-12T10:15:00Z"
}

# 🛡️ Middleware

Auth Middleware → Protects routes with JWT

Validation Middleware → Validates incoming requests

Error Handler → Centralized error response system

**🛠️ Tech Stack**

Node.js – Server runtime

Express.js – Web framework

MongoDB & Mongoose – Database and ODM

JWT – Authentication

Nodemon – Dev tool

🚧 **Future Work**

Add frontend (React.js) for UI

Role-based authentication (Admin/User)

Advanced goal tracking features (deadlines, categories)

Unit & integration testing

📜 License

This project is licensed under the MIT License.


---


