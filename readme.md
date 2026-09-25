# Technical Test – Full Stack Application

A simple full-stack To-Do application built as part of a technical assessment.

The project consists of:

- Mobile App – React Native + Expo
- Backend API – Node.js + GraphQL + Apollo Server
- Web App – React + Vercel *(to be implemented)*

## Architecture

```text
                    ┌─────────────────────┐
                    │   React Native      │
                    │   Expo Mobile App   │
                    └──────────┬──────────┘
                               │
                               │ GraphQL
                               │
                    ┌──────────▼──────────┐
                    │    Node.js API      │
                    │   Apollo Server     │
                    └──────────┬──────────┘
                               │
                         In-Memory Data
                         ┌─────┴─────┐
                         │           │
                      Users        Todos

The GraphQL backend is hosted separately from the mobile application and provides authentication and user-scoped To-Do operations.

1. Mobile App
Technology Stack
React Native
Expo SDK 57
TypeScript
Expo Router
Apollo Client 4
GraphQL
AsyncStorage
Features
Authentication
Login with email and password
Create a new account
Dummy token-based authentication
Authentication token stored locally using AsyncStorage
Logout functionality
To-Do Management
View user's To-Do items
Create new To-Do items
Mark To-Do items as completed
Delete To-Do items
User-scoped data through the GraphQL API
Loading and empty states
Basic error handling
Client-side Caching

Apollo Client's InMemoryCache is used for client-side GraphQL caching.

This allows data retrieved from the GraphQL API to be cached locally during the application session.

Persistent offline synchronization is not implemented.

mobile/
├── src/
│   ├── api/
│   │   ├── apollo.ts
│   │   └── operations.ts
│   │
│   ├── app/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   └── todo.tsx
│   │
│   ├── screens/
│   │   └── LoginScreen.tsx
│   │
│   ├── components/
│   ├── constants/
│   └── hooks/
│
├── assets/
├── app.json
├── package.json
└── tsconfig.json

Running the Mobile App

Install dependencies:

npm install

Start Expo:

npx expo start

For testing on a physical device, the phone and development computer should be connected to the same network.

The GraphQL API URL is configured in:

src/api/apollo.ts

Example:

const httpLink = new HttpLink({
  uri: "http://192.168.0.124:4000/",
});

Replace the IP address with the development machine's local IP address when necessary.

2. Backend API
Technology Stack
Node.js
GraphQL
Apollo Server
JavaScript
In-memory data storage
Features
Authentication

The backend provides:

signup
login

Authentication is intentionally simplified for the technical assessment.

A successful login/signup returns a dummy token such as:

user-1

The mobile application stores the token locally and sends it with subsequent GraphQL requests:

Authorization: Bearer user-1
To-Do CRUD

The API supports:

Create Todo
Read Todos
Update Todo
Delete Todo

Todos are associated with a user through:

userId

The API checks the authenticated user before returning or modifying To-Do items.

GraphQL Operations
Queries
todos

Returns To-Do items belonging to the authenticated user.

Mutations
signup(email, password)
login(email, password)

createTodo(title)

updateTodo(id, title, completed)

deleteTodo(id)
Backend Structure
backend/
├── server.js
├── package.json
└── node_modules/
Running the Backend

Install dependencies:

npm install

Start the server:

node server.js

The GraphQL server runs on:

http://localhost:4000/

Apollo Sandbox can be used to test the GraphQL API.

3. Data Storage

The current backend uses in-memory arrays:

const users = [];
const todos = [];

This was chosen because the assessment allows:

In-memory storage
Simple file-based persistence such as lowdb
Important limitation

Data is lost when the backend process is restarted.

For example:

Start server
    ↓
Create account
    ↓
Create todos
    ↓
Stop server
    ↓
Start server again
    ↓
Data is reset

For a production application, a persistent database would be used instead.

4. Authentication Flow
Mobile App
    │
    │ signup / login
    ▼
GraphQL API
    │
    │ returns token
    ▼
AsyncStorage
    │
    │ stores token
    ▼
Apollo Client
    │
    │ Authorization: Bearer <token>
    ▼
GraphQL API
    │
    ▼
User-scoped Todos

The authentication implementation is intentionally simplified for the assessment and should not be considered production-grade authentication.

In a production application, passwords would be securely hashed and authentication would use a proper token/session mechanism.

5. User-Scoped Todo Design

Each To-Do item contains:

id
title
completed
userId

When retrieving To-Dos, the backend filters them using the authenticated user's ID.

This prevents one authenticated user from receiving another user's To-Dos through the normal API operations.

6. Design Decisions
Why GraphQL?

GraphQL allows the mobile and web clients to consume the same API while requesting only the fields they need.

Why Apollo Server?

Apollo Server provides a straightforward way to define the GraphQL schema and resolvers and is suitable for a small Node.js GraphQL API.

Why Apollo Client?

Apollo Client provides:

GraphQL query/mutation handling
Client-side caching
Loading and error states
Integration with React Native
Why Expo Router?

Expo Router provides file-based navigation for the Expo application and is built on React Navigation.

The current navigation structure is:

Login
  │
  ▼
Todo List
Why in-memory storage?

The assessment explicitly allows in-memory persistence. It keeps the implementation lightweight and allows the focus to remain on GraphQL integration and application functionality.

7. Current Status
Mobile
 React Native + Expo setup
 Login
 Signup
 Logout
 GraphQL integration
 Authentication token handling
 View todos
 Create todos
 Update/complete todos
 Delete todos
 Client-side GraphQL cache
 Persistent offline synchronization
Backend
 Node.js setup
 Apollo Server
 GraphQL schema
 Login
 Signup
 User-scoped authentication
 Create todo
 Read todos
 Update todo
 Delete todo
 In-memory data storage
Web
 React application
 GraphQL integration
 Login/signup
 To-Do CRUD
 Vercel deployment
AWS
 Deployment
 Architecture / deployment documentation
8. Future Improvements

For a production application, the following improvements could be made:

Persistent database such as PostgreSQL
Password hashing
JWT or secure session-based authentication
Input validation
Persistent offline cache
Offline mutation queue and synchronization
Automated tests
CI/CD pipeline
HTTPS
Production monitoring and logging
9. Notes

This project was developed as a technical assessment demonstrating:

Full-stack development
React Native application development
GraphQL API integration
Apollo Client and Apollo Server
Authentication flow
User-scoped data access
Client-side caching
API and frontend separation