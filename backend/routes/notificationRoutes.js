// routes/appointments.js
const express = require('express');
const notificationRouter = express.Router();
const notificationController = require("../controllers/notificationController");

const isLoggedIn = require("../middleware/isLoggedIn");
const { roleCheck } = require("../middleware/roleCheck");

const {authenticateUser} = require("../middleware/authUser");

notificationRouter.get("/ward", authenticateUser, notificationController.getWardNotifications);

notificationRouter.put("/:id", authenticateUser, notificationController.markNotificationAsRead);



module.exports = notificationRouter;
