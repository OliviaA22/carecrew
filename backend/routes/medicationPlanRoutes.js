const express = require('express');
const medicationPlanRouter = express.Router();
const medicationPlanController  = require('../controllers/medicationPlanController');

const isLoggedIn  = require("../middleware/isLoggedIn");
const { roleCheck } = require("../middleware/roleCheck");
const {authenticateUser} = require("../middleware/authUser");


medicationPlanRouter.get("/", authenticateUser, medicationPlanController.getAllMedPlans);

medicationPlanRouter.post('/new-plan',  authenticateUser, roleCheck('admin'), medicationPlanController.createMedPlan);

medicationPlanRouter.post("/:planId/med-items", authenticateUser, roleCheck('admin'), medicationPlanController.addMedicationsToPlan);

medicationPlanRouter.post("/adminstration", authenticateUser, medicationPlanController.createMedicationAdministration);

medicationPlanRouter.get("/adminstration", authenticateUser, roleCheck('admin'), medicationPlanController.getAllMedicationAdministrations);

medicationPlanRouter.get("/adminstration/:id", authenticateUser, roleCheck('admin'), medicationPlanController.getMedicationAdministrationById);

medicationPlanRouter.put("/adminstration/:id", authenticateUser, medicationPlanController.updateMedicationAdministration);

medicationPlanRouter.delete("/adminstration/:id", authenticateUser, roleCheck('admin'), medicationPlanController.deleteMedicationAdministration);

medicationPlanRouter.get('/:id',  authenticateUser, medicationPlanController.getMedPlanById);

medicationPlanRouter.put("/:planId", authenticateUser, roleCheck('admin'), medicationPlanController.updateMedPlan);

medicationPlanRouter.delete("/:id", authenticateUser, roleCheck('admin'), medicationPlanController.deleteMedPlan);



module.exports = medicationPlanRouter;



