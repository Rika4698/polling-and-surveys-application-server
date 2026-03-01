# 📊 Polling and Survey Application - Server

  <a href="https://polling-and-surveys-application-server.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Website-Live_Link-darkgreen?style=for-the-badge&logo=vercel" alt="Live Website" />
  </a>

## 📖 Overview

This backend server powers the Polling and Survey Application. It features a secure and efficient RESTful API capable of handling complex survey logic, real-time voting mechanisms, role-based access control, and secure payment processing. Designed for high performance and clean architecture, this server manages the core logic and integrations required for a seamless polling experience.

---

## ✨ Key Features

- **🔐 Secure Authentication**: JWT-based authentication system to protect API endpoints and securely manage user sessions.
- **🛡️ Role-Based Access Control (RBAC)**: Distinct permissions for `Admin`, `Surveyor`, and `Pro-User` accounts, ensuring proper data governance and feature gating.
- **📋 Comprehensive Survey Management**: Complete CRUD operations to create, read, update, delete, publish, and unpublish surveys with detailed configurations.
- **🗳️ Dynamic Voting Logic**: Real-time voting engine supporting diverse structures (yes/no, multiple-choice constraints, like/dislike interactions) while strictly preventing duplicate votes.
- **💬 Engagement Tools**: Built-in system for users to leave comments on surveys and securely report inappropriate content directly to administrators.
- **💳 Payment Integration**: Fully integrated Stripe gateway to smoothly handle pro-user subscriptions, premium upgrades, and payment history logging.

---

## 🛠️ Technology Stack

### 🟢 Core Architecture
*   **Node.js**: Asynchronous event-driven JavaScript runtime built on Chrome's V8 engine.
*   **Express.js**: Fast, unopinionated, minimalist web framework for building the REST APIs.

### 🍃 Database
*   **MongoDB**: NoSQL database for flexible data modeling and scalable storage.

### 🛡️ Security & Integrations
*   **JSON Web Tokens (JWT)**: Used for secure, stateless authentication and authorization.
*   **Stripe API**: Integrated payment processing gateway for handling pro-user transactions safely.

### 🧰 Utilities
*   **CORS**: Middleware to securely enable Cross-Origin Resource Sharing.
*   **Dotenv**: Zero-dependency module that loads environment variables from a `.env` file.
*   **Moment.js**: Library for parsing, validating, manipulating, and formatting dates/timestamps easily.

---

## 🚀 Installation & Setup

Follow these precise steps to get a local copy of the server up and running easily.

### Prerequisites

Ensure you have the following installed on your local development machine:
- **Node.js**: (Version 14.x or higher recommended)
- **MongoDB**: A local instance or a valid MongoDB Atlas cloud cluster.
- **Stripe Account**: For testing payment processing routes.

### 1️⃣ Clone or Navigate to the Directory

```bash
# If cloning from a repository
git clone <your-repo-url>

# Navigate into the project folder
cd polling-and-surveys-application-server
```

### 2️⃣ Install Dependencies

Install all necessary NPM packages required for the server environment:

```bash
npm install
```

### 3️⃣ Configure Environment Variables

The server requires specific credentials to connect to databases and external APIs. 

1. Create a root file named `.env`.
2. Add the following configuration keys to your `.env` file. **Replace the placeholder values** with your actual credentials:

```env
# Server Port Configuration
PORT=5000

# MongoDB Database Credentials
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password

# JWT Authentication Secret
ACCESS_TOKEN_SECRET=your_super_secret_jwt_key_here

# Stripe Payment Gateway Secret
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
```

> ⚠️ **Security Note:** Never commit your `.env` file to version control. Ensure `.env` is listed in your `.gitignore`.

### 4️⃣ Start the Development Server

Once the environment is properly configured, launch the server:

```bash
npm run dev
```

If successful, your terminal should display the following output:
```bash
> polling-and-survey-application-server@1.0.0 start
> node index.js

Pinged your deployment. You successfully connected to MongoDB!
Polling and Survey application on port 5000
```
Your backend is now active and listening at `http://localhost:5000` 🚀.

---

## 🔗 Key API Endpoints Reference

### 🔐 Authentication
* `POST /jwt` - Generate a JWT access token upon successful user sign-in.

### 👤 User Management
* `GET /user` - Retrieve all registered users (`Admin` only).
* `POST /user` - Register and store a newly created user in the database.
* `DELETE /user/:id` - Permanently remove a user record (`Admin` only).
* `GET /user/admin/:email` - Validate administrative permissions for an active user.
* `GET /user/surveyor/:email` - Validate surveyor role permissions.
* `GET /user/pro/:email` - Validate active pro-user subscription status.
* `PATCH /user/*/:id` - Endpoints to securely modify and upgrade user roles.

### 📋 Survey Workflows
* `GET /survey` - Retrieve all available published surveys.
* `GET /survey/:id` - Fetch comprehensive details mapped to a specific survey.
* `GET /survey/mostVote` - Gather the top 6 most-voted, published surveys for highlights.
* `GET /survey/sortByTotalVote` - Fetch surveys accurately sorted by overall voting metrics.
* `POST /survey` - Instantiate and save a new survey questionnaire.
* `PUT /survey/update/:id` - Implement changes or updates to existing survey setups.
* `PATCH /survey/:id` - Administer survey statuses (publish/unpublish) and append admin feedback.
* `DELETE /survey/:id` - Safely remove a discontinued survey.
* `PUT /updateSurvey/:id` - Submit unique user vote patterns, selections, or generic sentiment insights without duplicates.

### 💬 Engagement (Comments & Reports)
* `GET /surveyComments/:id` - Read publicly documented comments for a specific survey thread.
* `POST /addComment/:id` - Append a new discussion point to an open survey thread.
* `DELETE /deleteComment/:id/:commentId` - Erase individual user comments elegantly.
* `POST /surveyReport/:id` - Allow users to securely flag/alert administrators to policy violations on corresponding surveys.

### 💳 Billing & Payments
* `POST /create-payment-intent` - Generate a secure Stripe payment intent configuration.
* `POST /payment` - Save and safely process confirmed transaction metadata.
* `GET /payment` - Aggregate and retrieve financial transaction logs (`Admin` only).

---

## 📄 License & Legal

This application architecture operates under the **ISC** License.