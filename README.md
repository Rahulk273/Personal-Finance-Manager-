# Personal-Finance-Manager-
A web application to track expenses and budgets.

## Tech Stack
- Node.js, Express.js
- MongoDB, Mongoose
- JWT Authentication
- Render (Deployment)

## Live Backend URL
👉 [https://personal-finance-manager-3as2.onrender.com]

## 🔧 Setup Instructions
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/personal-finance-manager.git

## Install dependencies:

cd personal-finance-manager
npm install

## Set environment variables in .env:

MONGO_URI=mongodb+srv://your-db-uri
JWT_SECRET=your-secret-key
PORT=5000

## Start the server:
npm start






 Personal Finance Manager API Documentation
🚀 Base URL : [https://personal-finance-manager-3as2.onrender.com](url)

Live Backend URL:

https://your-app.onrender.com

🔹 Authentication APIs
✅ 1️⃣ Register User

📌 Endpoint:

POST /api/auth/register

📌 Request Body (JSON):

{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "securepassword"
}

📌 Response (201 - Created):

{
  "message": "User registered successfully"
}

📌 Errors:

    400 Bad Request: Email already exists

✅ 2️⃣ Login User

📌 Endpoint:

POST /api/auth/login

📌 Request Body (JSON):

{
  "email": "johndoe@example.com",
  "password": "securepassword"
}

📌 Response (200 - OK):

{
  "message": "Login successful",
  "token": "your_jwt_token"
}

📌 Errors:

    401 Unauthorized: Invalid email or password

🔹 Transactions APIs
✅ 3️⃣ Add Transaction

📌 Endpoint:

POST /api/transactions

📌 Headers:

Authorization: Bearer your_jwt_token

📌 Request Body (JSON):

{
  "amount": 500,
  "type": "expense",
  "category": "Food",
  "description": "Dinner at a restaurant",
  "date": "2024-04-03"
}

📌 Response (201 - Created):

{
  "message": "Transaction added successfully",
  "transaction": {
    "id": "65f8c3...",
    "amount": 500,
    "type": "expense",
    "category": "Food",
    "description": "Dinner at a restaurant",
    "date": "2024-04-03"
  }
}

📌 Errors:

    400 Bad Request: Missing required fields

🔹 Budget APIs
✅ 4️⃣ Add Budget

📌 Endpoint:

POST /api/budget

📌 Headers:

Authorization: Bearer your_jwt_token

📌 Request Body (JSON):

{
  "category": "Food",
  "limit": 5000,
  "startDate": "2024-04-01",
  "endDate": "2024-04-30"
}

📌 Response (201 - Created):

{
  "message": "Budget created successfully",
  "budget": {
    "id": "65f8d5...",
    "category": "Food",
    "limit": 5000,
    "startDate": "2024-04-01",
    "endDate": "2024-04-30"
  }
}

✅ 5️⃣ Get All Budgets

📌 Endpoint:

GET /api/budget

📌 Headers:

Authorization: Bearer your_jwt_token

📌 Response (200 - OK):

[
  {
    "id": "65f8d5...",
    "category": "Food",
    "limit": 5000,
    "startDate": "2024-04-01",
    "endDate": "2024-04-30"
  }
]

✅ 6️⃣ Add Budget Alert

📌 Endpoint:

POST /api/budget/alert

📌 Headers:

Authorization: Bearer your_jwt_token

📌 Request Body (JSON):

{
  "budgetId": "65f8d5...",
  "alertPercentage": 80
}

📌 Response (201 - Created):

{
  "message": "Budget alert set successfully",
  "alert": {
    "id": "65f8e1...",
    "budgetId": "65f8d5...",
    "alertPercentage": 80
  }
}

📌 Errors:

    400 Bad Request: Invalid budgetId




