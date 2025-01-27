const express = require('express');
const medicationPlanRouter = express.Router();
const MedicationPlanController  = require('../controllers/medicationPlanController');

const isLoggedIn  = require("../middleware/isLoggedIn");
const { roleCheck } = require("../middleware/roleCheck");


medicationPlanRouter.get('/', MedicationPlanController.getAllMedPlans);

medicationPlanRouter.post('/new-plan', isLoggedIn, roleCheck('admin'), MedicationPlanController.createMedPlan);

medicationPlanRouter.get('/:patient_id', isLoggedIn, MedicationPlanController.getMedPlansForPatient);

medicationPlanRouter.get('/:id', isLoggedIn, MedicationPlanController.getMedPlanById);

// medicationPlanRouter.put('/:id', isLoggedIn, roleCheck('admin'), MedicationPlanController.updateBlog);

// medicationPlanRouter.delete('/:id', isLoggedIn, roleCheck('admin'), MedicationPlanController.deleteBlog);

module.exports = medicationPlanRouter;
