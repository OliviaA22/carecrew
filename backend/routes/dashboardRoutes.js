const express = require("express");
const dashboardRouter = express.Router();
const dashboardController = require("../controllers/dashboardController");

const {authenticateUser} = require("../middleware/authUser");
const isLoggedIn  = require("../middleware/isLoggedIn");
const { roleCheck } = require("../middleware/roleCheck");

dashboardRouter.get('/hospitals', dashboardController.getHospitals);
dashboardRouter.get('/wards', dashboardController.getWards);
dashboardRouter.get('/dashboard', authenticateUser, dashboardController.getDashboardData);


module.exports = dashboardRouter;