const express = require("express");
const dashboardRouter = express.Router();
const dashboardController = require("../controllers/dashboardController");

const {authenticateUser} = require("../middleware/authUser");


dashboardRouter.get('/hospitals', dashboardController.getHospitals);
dashboardRouter.get('/wards', dashboardController.getWards);
dashboardRouter.get('/dashboard', authenticateUser, dashboardController.getDashboardData);


module.exports = dashboardRouter;