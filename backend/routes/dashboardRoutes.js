const express = require("express");
const dashboardRouter = express.Router();
const dashboardController = require("../controllers/dashboardController");

const {authenticateUser} = require("../middleware/authUser");
const isLoggedIn  = require("../middleware/isLoggedIn");
const { roleCheck } = require("../middleware/roleCheck");



dashboardRouter.get('/hospitals', authenticateUser, roleCheck('admin'), dashboardController.getHospitals);

dashboardRouter.get('/wards', authenticateUser, roleCheck('admin'), dashboardController.getWards);

dashboardRouter.get('/medications', authenticateUser, dashboardController.getMedications);

dashboardRouter.get('/dashboard', authenticateUser, dashboardController.getDashboardData);

dashboardRouter.get('/medications/:med_id', authenticateUser, dashboardController.getMedicationById);

dashboardRouter.get('/nurses-ward/:ward_id', authenticateUser, roleCheck('admin'),  dashboardController.getNursesByWard);

dashboardRouter.get('/nurses-hospital/:hospital_id', authenticateUser, roleCheck('admin'), dashboardController.getNursesByHospital);



module.exports = dashboardRouter;