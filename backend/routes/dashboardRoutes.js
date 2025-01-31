const express = require("express");
const dashboardRouter = express.Router();
const dashboardController = require("../controllers/dashboardController");

const {authenticateUser} = require("../middleware/authUser");
const isLoggedIn  = require("../middleware/isLoggedIn");
const { roleCheck, roleAuthCheck } = require("../middleware/roleCheck");

dashboardRouter.get('/hospitals', authenticateUser, roleCheck('admin'), dashboardController.getHospitals);

dashboardRouter.get('/wards', authenticateUser, roleCheck('admin'), dashboardController.getWards);

dashboardRouter.get('/nurses-ward/:ward_id', authenticateUser, roleCheck('admin'),  dashboardController.getNursesByWard);

dashboardRouter.get('/nurses-hospital/:hospital_id', authenticateUser, roleCheck('admin'), dashboardController.getNursesByHospital);

dashboardRouter.get('/dashboard', authenticateUser, dashboardController.getDashboardData);


module.exports = dashboardRouter;