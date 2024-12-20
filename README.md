# Vikram: Agile Methodology Project

## Overview

**Vikram** is a full-stack web application built following **Agile Methodology**. This project is designed to streamline team collaboration and enhance workflow efficiency. It uses **Next.js** for the frontend, **Tailwind CSS** for styling, and **TypeScript** for type safety. The backend is powered by **Node.js** and **Express.js**, with **MongoDB** and **Mongoose** for data management.

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS, TypeScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Version Control**: Git and GitHub

## Setup Instructions for VS Code

Follow the steps below to get **Vikram** running on your local machine using **VS Code**.

### 1. Prerequisites

Before setting up, ensure you have the following installed on your system:

- **Node.js** (v16 or later)
- **MongoDB** (either local or cloud-based)
- **VS Code** (or your preferred code editor)
- **Git** (for version control)

### 2. Clone the Repository

To clone the repository, run:

```bash
# Clone the project repository to your local machine
git clone https://github.com/Srinivasareddy23/vikram0.git

# Navigate to the project directory
cd vikram

# Install dependencies for the frontend
cd frontend
npm install

# Install dependencies for the backend
cd ../backend
npm install

# Start the backend server
cd backend
npm run dev

# Start the frontend server
cd ../frontend
npm run dev

# Frontend URL
http://localhost:3000

# Backend URL
http://localhost:5000
