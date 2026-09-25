# Technical Test - Todo Application

A full-stack Todo application consisting of a React Native mobile app, React web app, and Node.js GraphQL backend.

The project demonstrates a shared GraphQL API consumed by both mobile and web clients, with the backend deployed on AWS EC2.

## Project Structure

```text
tech-test/
├── backend/                 # Node.js + Apollo GraphQL
│   ├── src/
│   │   └── server.js
│   ├── package.json
│   └── package-lock.json
│
├── mobile/                  # React Native + Expo
│   ├── app/
│   ├── src/
│   │   └── api/
│   ├── package.json
│   └── package-lock.json
│
├── web/                     # React + Vite + Tailwind CSS
│   ├── src/
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

# 1. Setup Instructions

## Prerequisites

The following tools are required for local development:

- Node.js
- npm
- Git
- Expo Go for mobile testing
- A modern web browser

## Backend

The backend is implemented using Node.js and Apollo Server.

### Local Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the GraphQL server:

```bash
node src/server.js
```

The GraphQL API will be available at:

```text
http://localhost:4000/
```

Apollo Server also provides a GraphQL interface that can be used to test queries and mutations.

### Backend Storage

The backend currently uses in-memory arrays for users and todos.

This was chosen because the technical test allows in-memory storage and it keeps the implementation simple within the available time.

Because the data is stored in memory:

- Users are reset whenever the server restarts.
- Todos are reset whenever the server restarts.
- No external database is required.

For a production application, persistent database storage would be used instead.

---

## Web Application

The web application is built using React, Vite, Apollo Client, and Tailwind CSS.

### Local Setup

Navigate to the web folder:

```bash
cd web
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will display the local development URL, normally similar to:

```text
http://localhost:5173/
```

### GraphQL API Configuration

The web application uses the `VITE_API_URL` environment variable.

Create a `.env` file inside the `web` directory:

```env
VITE_API_URL=http://localhost:4000/
```

For local development, the backend must be running on port `4000`.

For the deployed web application, `VITE_API_URL` points to the publicly accessible GraphQL API.

---

## Mobile Application

The mobile application is built using React Native and Expo.

### Local Setup

Navigate to the mobile folder:

```bash
cd mobile
```

Install dependencies:

```bash
npm install
```

Start Expo:

```bash
npx expo start
```

The application can then be opened using:

- Expo Go on a physical Android/iOS device
- Android Emulator
- iOS Simulator

### GraphQL API Configuration

The GraphQL endpoint is configured in:

```text
mobile/src/api/apollo.ts
```

The deployed mobile application currently uses:

```typescript
const httpLink = new HttpLink({
  uri: "https://switching-loud-accept-renaissance.trycloudflare.com/",
});
```

This allows the mobile application to communicate with the GraphQL backend deployed on AWS EC2 through Cloudflare.

For local development, the API URL can instead point to a locally accessible backend.

---

# 2. Application Features

## Authentication

The application supports:

- User signup
- User login
- Dummy token-based authentication
- Logout

Authentication is intentionally simplified for the technical test.

The backend returns a token after successful signup or login, and the clients store the token locally.

### Mobile

Authentication data is stored using:

```text
AsyncStorage
```

### Web

Authentication data is stored using:

```text
localStorage
```

---

## Todo Features

Authenticated users can:

- View their todos
- Create new todos
- Update todo titles
- Mark todos as completed
- Delete todos
- Log out

Todos are user-scoped on the backend.

A user can only access and modify their own todo items.

---

# 3. GraphQL API

The backend exposes a GraphQL API using Apollo Server.

## Query

### Get Todos

```graphql
query {
  todos {
    id
    title
    completed
    userId
  }
}
```

## Mutations

### Signup

```graphql
mutation {
  signup(
    email: "user@example.com"
    password: "password123"
  ) {
    user {
      id
      email
    }
    token
  }
}
```

### Login

```graphql
mutation {
  login(
    email: "user@example.com"
    password: "password123"
  ) {
    user {
      id
      email
    }
    token
  }
}
```

### Create Todo

```graphql
mutation {
  createTodo(title: "Complete technical test") {
    id
    title
    completed
    userId
  }
}
```

### Update Todo

```graphql
mutation {
  updateTodo(
    id: "1"
    title: "Complete technical test"
    completed: true
  ) {
    id
    title
    completed
  }
}
```

### Delete Todo

```graphql
mutation {
  deleteTodo(id: "1")
}
```

---

# 4. Architecture

## Overall Architecture

```text
                         Internet
                            │
              ┌─────────────┴─────────────┐
              │                           │
              ▼                           ▼
       React Web App               React Native App
          Vercel                       Expo
              │                           │
              │                           │
              └──────────┬────────────────┘
                         │
                         │ HTTPS / GraphQL
                         ▼
              ┌──────────────────────┐
              │ Cloudflare Quick     │
              │ Tunnel               │
              └──────────┬───────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │ AWS EC2              │
              │ Ubuntu               │
              │                      │
              │ PM2                  │
              │   │                  │
              │   ▼                  │
              │ Node.js              │
              │ Apollo Server        │
              │ GraphQL :4000        │
              └──────────┬───────────┘
                         │
                         ▼
                  In-Memory Storage
```

---

# 5. Architecture Decisions

## Backend

### Node.js + Apollo Server

Node.js with Apollo Server was selected to implement the GraphQL API.

Apollo Server provides a straightforward way to define:

- GraphQL schema
- Queries
- Mutations
- Resolver logic
- Request context

GraphQL provides a single API layer shared by both the mobile and web applications.

### User-Scoped Todos

Todos are associated with a user ID.

The backend checks the authenticated user before returning or modifying todo items.

This ensures that a user can only access and modify their own todo items through the normal GraphQL operations.

### In-Memory Storage

In-memory arrays were selected because the technical test allows either in-memory or simple file-based persistence.

This keeps the implementation simple and allows more time to be spent on:

- GraphQL integration
- Authentication flow
- Mobile development
- Web development
- Cloud deployment

For a production system, a persistent database such as PostgreSQL, MySQL, or MongoDB would be more appropriate.

### Authentication

The authentication system uses a simple token-based approach because the technical test specifies dummy authentication.

The implementation is intentionally lightweight.

For a production application, the following would be added:

- Password hashing
- Secure authentication tokens
- Token expiration
- Refresh tokens where appropriate
- Persistent user storage
- Input validation
- Rate limiting
- More comprehensive authorization

---

## Mobile

### React Native + Expo

React Native with Expo was selected for cross-platform mobile development.

Expo simplifies development and testing while allowing the application to be run on physical devices and emulators.

### Apollo Client

Apollo Client is used to communicate with the GraphQL backend.

It handles:

- GraphQL queries
- GraphQL mutations
- Client-side caching
- Authentication headers

### AsyncStorage

AsyncStorage is used to store authentication information locally on the mobile device.

This allows the application to retain the authentication token between application sessions.

### Navigation

Expo Router is used for application navigation.

Expo Router is built on top of React Navigation and provides file-based navigation for the application.

The navigation structure separates the authentication screen from the Todo screen and allows authenticated users to move between application states.

---

## Web

### React + Vite

React and Vite were used to build the web application.

Vite provides a lightweight development and production build environment.

### Tailwind CSS

Tailwind CSS is used for styling and responsive UI implementation.

It provides:

- Responsive layouts
- Consistent spacing
- Responsive components
- Utility-based styling

### Apollo Client

The web application uses Apollo Client to communicate with the same GraphQL backend used by the mobile application.

This keeps the backend logic centralized while allowing each client to have its own UI.

---

# 6. API Communication

Both clients communicate with the same GraphQL API:

```text
React Native ──────┐
                   │
                   ▼
             GraphQL API
                   │
                   ▼
          Node.js + Apollo
                   │
                   ▼
              Backend
                   ▲
                   │
React Web ─────────┘
```

This keeps the backend logic and data operations centralized while allowing each client to have its own user interface.

---

# 7. Cloud Deployment

## AWS EC2

The GraphQL backend is deployed to an AWS EC2 instance running Ubuntu.

The backend runs as:

```text
AWS EC2
   │
   ▼
Ubuntu
   │
   ▼
Node.js
   │
   ▼
Apollo Server
   │
   ▼
GraphQL API :4000
```

The EC2 instance allows the backend to run independently of the development computer.

---

## PM2

PM2 is used to manage the Node.js process.

The backend can be started with:

```bash
pm2 start src/server.js --name todo-api
```

PM2 provides:

- Process management
- Automatic application restart
- Application status monitoring
- Startup persistence

The PM2 process is configured to start automatically when the EC2 instance boots.

Check the application status with:

```bash
pm2 status
```

View application logs with:

```bash
pm2 logs todo-api
```

Save the current PM2 process configuration with:

```bash
pm2 save
```

---

## Cloudflare Quick Tunnel

Cloudflare Quick Tunnel provides a public HTTPS endpoint for the GraphQL backend.

The tunnel forwards requests to the Apollo Server running locally on the EC2 instance:

```text
HTTPS Request
      │
      ▼
Cloudflare Quick Tunnel
      │
      ▼
localhost:4000
      │
      ▼
Apollo Server
```

The current public API endpoint is:

```text
https://switching-loud-accept-renaissance.trycloudflare.com/
```

The Cloudflare tunnel is configured as a systemd service on the EC2 instance so that it continues running after the SSH session is closed.

The service is managed using:

```bash
sudo systemctl status cloudflared-quick
```

The service can be started with:

```bash
sudo systemctl start cloudflared-quick
```

The service is configured to start automatically when the EC2 instance boots.

> **Note:** Cloudflare Quick Tunnel URLs are temporary and may change if the tunnel is recreated. A production deployment would use a named Cloudflare Tunnel with a stable domain.

---

# 8. Live Deployment

## Web Application

The React web application is deployed using Vercel.

Live application:

https://to-do-list-nu-nine-93.vercel.app/

## Backend

The GraphQL backend is deployed on AWS EC2 and exposed through Cloudflare Quick Tunnel.

Public GraphQL endpoint:

https://switching-loud-accept-renaissance.trycloudflare.com/

The same GraphQL backend is used by both the deployed web application and the mobile application.

---

# 9. Environment Configuration

## Web

For local development:

```env
VITE_API_URL=http://localhost:4000/
```

For the deployed Vercel application:

```env
VITE_API_URL=https://switching-loud-accept-renaissance.trycloudflare.com/
```

The `VITE_API_URL` value is a public API endpoint and does not contain credentials or secrets.

## Mobile

The deployed mobile application currently points to:

```typescript
const httpLink = new HttpLink({
  uri: "https://switching-loud-accept-renaissance.trycloudflare.com/",
});
```

For local development, this can be changed to the appropriate local backend address.

---

# 10. Security Considerations

This project is designed as a technical-test implementation rather than a production-ready authentication system.

The following areas would require additional work for production:

- Password hashing
- Secure token generation
- Token expiration
- Persistent database storage
- HTTPS configuration with a permanent domain
- Input validation
- Error handling
- Rate limiting
- Production logging
- Secrets management
- Proper authentication and authorization
- Database backups

The current authentication and in-memory storage are intentionally simplified to satisfy the technical-test requirements.

---

# 11. Time Taken

| Module | Time Taken |
|---|---:|
| Backend | 30 minutes |
| Mobile | 1 hour |
| Web | 1 hour |
| **Total** | **2 hours 30 minutes** |

Cloud deployment was completed as an additional deployment step using AWS EC2, PM2, and Cloudflare.

---

