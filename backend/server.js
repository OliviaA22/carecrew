require("dotenv").config();

const express = require("express");
const cors = require("cors");

require("./jobs/notificationsJob.js"); // Initialize cron jobs

const userRoutes = require("./routes/userRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const medicationPlanRoutes = require("./routes/medicationPlanRoutes.js");
const notificationRoutes = require("./routes/notificationRoutes.js");
const patientRoutes = require("./routes/patientRoutes.js");
const dashboardRoutes = require("./routes/dashboardRoutes.js")
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");


const allowedOrigins = [
  'http://localhost:5173',
  'http://host.docker.internal:5173',
  'http://127.0.0.1:5173',

];

const app = express();


app.set("trust proxy", 1);

// Configure CORS to allow requests from the frontend origin locally or via docker
app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);

app.use("/api/med-plans", medicationPlanRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/patients", patientRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/search", dashboardRoutes)


app.use(errorHandler);

//port
const PORT = process.env.PORT || 6000;

//server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
