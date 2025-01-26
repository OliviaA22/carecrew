const express = require("express");
const dashboardRouter = express.Router();
const dashboardController = require("../controllers/dashboardController");




dashboardRouter.get('/hospitals', dashboardController.getHospitals);
dashboardRouter.get('/wards', dashboardController.getWards);


module.exports = dashboardRouter;