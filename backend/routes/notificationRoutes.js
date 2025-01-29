// routes/appointments.js
const express = require('express');
const notificationRouter = express.Router();
const NotificationController = require("../controllers/notificationController");

const isLoggedIn = require("../middleware/isLoggedIn");
const { roleCheck } = require("../middleware/roleCheck");

const {authenticateUser} = require("../middleware/authUser");
// notificationRouter.post("/generate-due", NotificationController.generateDueMedicationNotifications);

notificationRouter.get("/ward", authenticateUser, NotificationController.getWardNotifications);

// notificationRouter.get("/patient/:patientId", NotificationController.getNotificationsForPatient);

// notificationRouter.patch("/:id/read", NotificationController.markNotificationAsRead);

// notificationRouter.delete("/:id", NotificationController.deleteNotification);



module.exports = notificationRouter;
