# Smart Pantry Dashboard

A full-stack application for managing pantry inventory. This project features a secure REST API built with Spring Boot and a dynamic, responsive frontend build with React and Typescript.

## Tech Stack
* **Backend:** Java, Spring Boot, Spring Security, Spring Data JPA
* **Database:** H2 (In-Memory)
* **Frontend:** React, Typescript, Vite
* **Build Tools:** Maven (Backend), npm (Frontend)

---

## How to run App

This project is split into a Java backend (in the root directory) and a React frontend (in the `/frontend` directory). You will need to run both simultaneously in separate terminal windows.

### 1. Start the backend (Spring Boot)
Open a terminal in the **root** directory of the project and run:

## For windows
./mvnw.cmd spring-boot:run

## For Mac/Linux
./mvnw spring-boot:run

*The backend API will start on `http://localhost:8080`*

### 2. Start the frontend (React + Vite)
1. Open a new terminal window
2. Navigate to frontend directory => cd frontend
3. Install dependencies and start development server => 
    * npm install
    * npm run dev
*The frontend will be typically available at http://localhost:5173.
---

## Architecture Decisions 

### Why H2 instead of PostgreSQL?
For this iteration, I chose the H2 database.
* **Justification:** My goal was to maximize the time spent developing the logic and the user experience.

## Future Improvements

If I had more time to expand this project, I would focus on the following:
1. **Database Migration:** Swap H2 for PostgreSQL.
2. **Robust Authentication:** Upgrade the current Spring Security implementation to use JWTs.
3. **Improving react skills:** Develop my React skills to move beyond a "basic" UI. The goal would be to implement more advanced design patterns.

---



