# 🎯 Goal Tracker (Backend + Minimal UI)

This project includes a **Node.js + Express + MongoDB backend** and a **minimal React UI** to demonstrate backend functionality end to end.  
The UI is intentionally lightweight and is used to test authentication, role-based access, and goal CRUD flows from a browser.

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

✅ **Minimal UI Demo (React + Vite)**

- Register and login pages
- Dashboard to create, edit, delete, and view goals
- Admin-only page for viewing users
- Route protection with role-based guard in the frontend

✅ **Dockerized Development Setup**

- Single command startup using Docker Compose
- MongoDB, backend, and frontend run as separate services
- Persistent MongoDB data and hot reload-friendly bind mounts

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
├── Dockerfile
└── src/
   ├── app.js
   ├── server.js
   ├── controllers/
   ├── routes/
   ├── models/
   ├── middleware/
   ├── validators/
   ├── utils/
   └── db/

frontend/
├── Dockerfile
└── src/
   ├── App.jsx
   ├── api/
   ├── components/
   └── pages/

docker-compose.yml
```

     ---

## ⚙️ Installation & Setup

### Option A: Docker (Recommended)

1. **Prerequisites**
   - Docker Desktop (or Docker Engine + Compose plugin)

2. **Configure backend environment for Docker**
   - Update `backend/.env` (or copy from `backend/.env.example`) with these values:

   ```env
   PORT=5000
   MONGO_URI=mongodb://mongodb:27017/goal-tracker
   JWT_SECRET=change_this_to_a_secure_secret
   API_BASE_URL=http://localhost:5173
   NODE_ENV=development
   MONGO_RETRY_DELAY_MS=5000
   ```

   - Important: For Docker Compose networking, MongoDB host must be `mongodb` (service name), not `localhost`.

3. **Start all services**

   ```bash
   docker compose up --build
   ```

4. **Open applications**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

5. **Stop services**

   ```bash
   docker compose down
   ```

### Docker Service Details

| Service  | Port Mapping  | Notes                                      |
| -------- | ------------- | ------------------------------------------ |
| mongodb  | internal only | Uses named volume `mongo_data`             |
| backend  | 5000:5000     | Depends on `mongodb`, reads `backend/.env` |
| frontend | 5173:5173     | Depends on `backend`                       |

### Docker Networking Rules

- Backend connects to MongoDB using `mongodb://mongodb:27017/goal-tracker`.
- Frontend (browser context) calls backend at `http://localhost:5000`.
- Do not use `localhost` for container-to-container calls.

### Hot Reload + Volumes

- Backend bind mount: `./backend:/app`
- Frontend bind mount: `./frontend:/app`
- Anonymous dependencies are protected using named volumes:
  - `backend_node_modules:/app/node_modules`
  - `frontend_node_modules:/app/node_modules`

### CORS and Cookies

- Backend CORS allows `http://localhost:5173`.
- Backend CORS has `credentials: true` enabled.
- Axios client has `withCredentials: true` enabled.

### Option B: Run Without Docker

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```

2. **Install dependencies**

   ```bash
   cd backend
   npm install

   cd ../frontend
   npm install

   cd ..
   ```

3. **Setup environment variables (backend)**
   Create a `.env` file inside `backend/` with the following variables:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   API_BASE_URL=http://localhost:5173
   NODE_ENV=development
   ```

4. **Run backend and frontend**

   In terminal 1:

   ```bash
   cd backend
   npm run start
   ```

   In terminal 2:

   ```bash
   cd frontend
   npm run dev
   ```

5. **Open the app**

   Visit `http://localhost:5173`

   Frontend API base URL currently points to `http://localhost:5000/api/v1`.

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

## 🖥️ Frontend Routes (Minimal UI)

| Route      | Description                           |
| ---------- | ------------------------------------- |
| /login     | Login page                            |
| /register  | User registration page                |
| /dashboard | Protected goal dashboard (CRUD goals) |
| /admin     | Admin-only users listing page         |
| /forbidden | Access denied page                    |

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

- React + Vite – Minimal frontend UI

- React Router + Axios – Routing and API calls

- Docker + Docker Compose – Containerized local development

## 📈 Scalability Notes

Current state:

- Backend API is separated from frontend and can be scaled independently.
- JWT-based auth keeps the API mostly stateless, which is friendly for horizontal scaling.
- MongoDB stores users/goals centrally, so multiple API instances can share the same data.

Recommended next steps for higher traffic:

- Add DB indexes for frequent filters/lookups (for example, userId and createdAt on goals).
- Add pagination on list endpoints to avoid large payloads.
- Add rate limiting and stricter security headers at the API layer.
- Introduce caching for frequently requested read operations.
- Add observability (structured logs, metrics, tracing) and health probes.
- Use a reverse proxy/load balancer and run multiple backend instances.

# 🚧 Future Work

- Unit & integration testing

## 📘 API Docs

- API contract is documented in backend/API_REFERENCE.md

---
