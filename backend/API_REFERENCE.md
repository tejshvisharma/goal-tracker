# Goal Tracker API Reference (Frontend)

Last updated: 2026-04-14
API version: v1

This document reflects the current backend behavior in code.

## 1. Base Information

- Base URL (local): http://localhost:<PORT>
- API prefix: /api/v1
- Content type: application/json
- Auth token type: JWT access token (expires in 24h)

## 2. Authentication Contract

Protected routes accept either of these:

1. Browser flow: accessToken in httpOnly cookie
2. Mobile/API client flow: Authorization header with Bearer token

The auth middleware checks cookie token first, then Bearer token.

Register and login responses both:

1. Set Set-Cookie: accessToken
2. Return data.accessToken in JSON response

## 3. Response Format

### 3.1 Success envelope

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "data": {}
}
```

### 3.2 Error envelope

```json
{
  "statusCode": 400,
  "message": "Error message",
  "errors": [],
  "success": false
}
```

### 3.3 Validation error envelope (422)

```json
{
  "statusCode": 422,
  "message": "Received data is not valid",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ],
  "success": false
}
```

## 4. Endpoint Reference

### 4.1 Health

GET /api/v1/healthcheck/

Auth required: No

Success 200:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "API is alive",
  "data": {}
}
```

### 4.2 User and Auth

POST /api/v1/user/register

Auth required: No

Request body:

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "123456"
}
```

Validation:

1. username required
2. email must be valid
3. password minimum length 6

Success 201 includes Set-Cookie plus JSON accessToken:

```json
{
  "success": true,
  "statusCode": 201,
  "message": "User registered successfully",
  "data": {
    "_id": "665fa...",
    "username": "john_doe",
    "email": "john@example.com",
    "accessToken": "<jwt-token>"
  }
}
```

POST /api/v1/user/login

Auth required: No

Request body:

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

Validation:

1. email must be valid
2. password required

Success 200 includes Set-Cookie plus JSON accessToken.

GET /api/v1/user/me

Auth required: Yes (cookie or Bearer)

Request body: none

Success 200:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "getting user information",
  "data": {
    "_id": "665fa...",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

GET /api/v1/user/all-users

Auth required: Yes (cookie or Bearer)

Success 200 returns list of users without password.

### 4.3 Goals

All goal routes require auth (cookie or Bearer).

GET /api/v1/goals/

Success 200:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Fetched successfully",
  "data": {
    "goals": []
  }
}
```

POST /api/v1/goals/

Request body:

```json
{
  "title": "Run 5 km"
}
```

Validation:

1. title required
2. title max length 100

PUT /api/v1/goals/:id

Validation:

1. id must be MongoDB ObjectId
2. title required
3. title max length 100

DELETE /api/v1/goals/:id

Validation:

1. id must be MongoDB ObjectId

## 5. Frontend Integration Notes

1. Browser clients: send credentials with requests so cookies are included.
2. Mobile clients: use Authorization: Bearer <token> with data.accessToken.
3. Handle 401 by redirecting to login.
4. Handle 422 by mapping errors array entries to field-level form errors.

## 6. Quick cURL Examples

Register:

```bash
curl -X POST http://localhost:5000/api/v1/user/register \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"username":"john_doe","email":"john@example.com","password":"123456"}'
```

Login:

```bash
curl -X POST http://localhost:5000/api/v1/user/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"email":"john@example.com","password":"123456"}'
```

Get profile using cookie:

```bash
curl -X GET http://localhost:5000/api/v1/user/me \
  -b cookies.txt
```

Get profile using Bearer:

```bash
curl -X GET http://localhost:5000/api/v1/user/me \
  -H "Authorization: Bearer <TOKEN>"
```
