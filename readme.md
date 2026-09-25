# Technical Test - Todo Application

A full-stack Todo application consisting of:

- React Native + Expo mobile application
- React + Vite + Tailwind CSS web application
- Node.js + Apollo Server GraphQL backend
- AWS EC2 backend deployment
- Cloudflare Quick Tunnel for HTTPS access to the deployed GraphQL API

Both the mobile and web applications consume the same GraphQL API.

---

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

1. Setup Instructions
Prerequisites

The following tools are required for local development:

Node.js
npm
Git
Expo Go for mobile testing
A modern web browser
Backend

The backend is implemented using Node.js and Apollo Server.

Local Setup
Navigate to the backend folder:
