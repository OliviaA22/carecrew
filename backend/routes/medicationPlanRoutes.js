const express = require('express');
const medicationPlanRouter = express.Router();
const medicationPlanController  = require('../controllers/medicationPlanController');

const isLoggedIn  = require("../middleware/isLoggedIn");
const { roleCheck } = require("../middleware/roleCheck");
const {authenticateUser} = require("../middleware/authUser");


medicationPlanRouter.get("/", authenticateUser, medicationPlanController.getAllMedPlans);

medicationPlanRouter.post('/new-plan',  authenticateUser, roleCheck('admin'), medicationPlanController.createMedPlan);

medicationPlanRouter.post("/:planId/med-items", authenticateUser, roleCheck('admin'), medicationPlanController.addMedicationsToPlan);

medicationPlanRouter.get('/:id',  authenticateUser, medicationPlanController.getMedPlanById);

medicationPlanRouter.put("/:planId", authenticateUser, roleCheck('admin'), medicationPlanController.updateMedPlan);

// 🔹 Delete a medication plan
medicationPlanRouter.delete("/:id", authenticateUser, roleCheck('admin'), medicationPlanController.deleteMedPlan);



module.exports = medicationPlanRouter;
