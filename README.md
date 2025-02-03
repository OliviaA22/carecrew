# CareCrew: A Nurse-Centric Hospital Management App

## Overview

CareCrew is a hospital management system designed to **optimize nurses' workflows**, reduce medication errors, and **enhance patient care**. The platform **digitizes documentation, automates medication administration tracking, and streamlines shift handovers**, ensuring nurses can focus on their core responsibility—**caring for patients**.

## Features

- **Nurse-Centric Dashboard**: Provides an overview of assigned patients, pending tasks, and upcoming medication schedules.
- **Patient Management**: Nurses can view assigned patients, access their medical history, and document real-time observations.
- **Medication Administration Workflow**:
  - Nurses mark medications as **administered** or **skipped** with notes explaining the reason.
  - Automatic **reminders for scheduled medications**.
  - **Real-time alerts** for missed or critical medications.
- **Shift Handover Automation**:
  - Nurses start and end their shifts with a **single click**.
  - The system automatically compiles pending tasks for the incoming nurse.
- **Real-Time Documentation**:
  - Nurses can log **observations, incidents, and care plan updates** while attending to patients.
- **Notifications & Alerts**:
  - Alerts for **medications due in 30 minutes**.
  - Notifications for **missed or overdue medications**.
  - Critical alerts for **urgent patient needs**.

## Target Market

CareCrew is designed for **hospitals and healthcare facilities** looking to digitize nurse workflows, reduce administrative burdens, and improve patient safety. Our solution is ideal for **public and private hospitals**, **nursing homes**, and **rehabilitation centers**.

## Tech Stack

CareCrew leverages a **scalable and efficient technology stack** to provide a **robust hospital management system**.

### Backend

- **Node.js**: Event-driven, non-blocking I/O runtime for scalable applications.
- **Express.js**: A minimalist and fast web framework for building APIs.
- **Sequelize**: ORM for handling **MySQL** database interactions.
- **MySQL**: Relational database management system.
- **Cron Jobs**: For scheduled tasks like **medication reminders and missed medication alerts**.

### Frontend

- **React**: Enables a dynamic and responsive experience with its component-based architecture.
- **TypeScript**: Adds static types to JavaScript, improving developer productivity and code quality.

### Dependencies

- **Axios**: Utilized for making HTTP requests from the frontend to the backend services.
- **Bcryptjs**: Ensures the security of user data through hashing and salting of passwords.
- **Body-parser**: Middleware for parsing incoming request bodies.
- **Cors**: Enables Cross-Origin Resource Sharing (CORS).
- **Dotenv**: For loading environment variables.
- **Express**: A fast, unopinionated, minimalist web framework for building RESTful APIs.
- **Jsonwebtoken (JWT)**: Implements JSON Web Tokens for secure transmission of information.
- **MySQL2**: A MySQL client for Node.js focused on performance.
- **Nodemon**: Simplifies development by automatically restarting the server.
- **Sequelize**: A promise-based Node.js ORM for various databases including MySQL, providing features like transaction support, relations, eager and lazy loading.
- **React Hook Form**: Simplifies form handling and validation for the frontend.
- **React Router**: Manages navigation and routing within the application frontend.
- **Chart.js & React-Chartjs-2**: For data visualization and charting.
- **Date-fns & React Datepicker**: For date manipulation and date picking functionalities.
- **Vite**: Provides a fast development environment with next-generation frontend tooling.
- **Tailwind CSS**: Utility-first CSS framework configured with custom screen sizes, font families, colors, and box shadows.
- **Bootstrap**: Another CSS framework used to style the application.

## Installation and Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/OliviaA22/carecrew
   ```

2. **Install dependencies for the backend:**

    ```bash
    cd backend
    npm install
    ```

3. **Install dependencies for the frontend:**

    ```bash
    cd ../frontend
    npm install
    npm install vite@latest --save-dev
    ```

The application is publicly accessible via `https://carecrew-medassist.netlify.app`

To open the frontend in developer mode run `npm run dev` from the frontend directory
   The admin access to the website is: email `olivia.okoro@mail.com` and password: `securePassword123`
   The nurse 1 access to the website is: email `max.schneider@example.com` and password: `securePassword456`
   The nurse 2 access to the website is: email `robert.scott@nurse.com` and password: `securePassword123`

5. **Set up environment variables:**
   - The backend uses some APIs and variables that cannot be disclosed and cannot work properly without the required credentials.

6. **Run the backend server:**

   ```bash
   cd backend
   npm run dev (in development mode)
   npm start (production)
   ```

CareCrew aims to revolutionize hospital workflows by enhancing nurse efficiency, reducing medication errors, improving documentation, and ensuring safe medication administration. 🚀
