# 🎯 Goal Tracker Backend

This is the **backend service** for the Goal Tracker project, built with **Node.js, Express, and MongoDB**.  
It provides APIs for **user authentication, goal management, and health monitoring**.  
The **frontend (React)** will be added later to interact with these APIs.  

---

## 🚀 Features

✅ **User Authentication**
- Register new users  
- Login with JWT authentication  
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
- Input validation middleware  

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

## 📡 API Endpoints
## 🔑 Authentication user & Goals
    ```base
    | Method | Endpoint            | Description               | Auth Required |
    |--------|---------------------|---------------------------|---------------|
    | POST   | /api/users/register | Register a new user       | ❌            |
    | POST   | /api/users/login    | Login and get JWT         | ❌            |
    | GET    | /api/goals          | Get all goals             | ✅            |
    | POST   | /api/goals          | Create a new goal         | ✅            |
    | PUT    | /api/goals/:id      | Update a goal             | ✅            |
    | DELETE | /api/goals/:id      | Delete a goal             | ✅            |
    | GET    | /api/health         | API health check          | ❌            |




# 🛡️ Middleware

- Auth Middleware → Protects routes with JWT

- Validation Middleware → Validates incoming requests

- Error Handler → Centralized error response system

**🛠️ Tech Stack**

- Node.js – Server runtime

- Express.js – Web framework

- MongoDB & Mongoose – Database and ODM

- JWT – Authentication

- Nodemon – Dev tool

🚧 **Future Work**

- Add frontend (React.js) for UI

- Role-based authentication (Admin/User)

- Advanced goal tracking features (deadlines, categories)

- Unit & integration testing

📜 License

- This project is licensed under the MIT License.


---


