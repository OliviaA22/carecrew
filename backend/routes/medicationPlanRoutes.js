const express = require('express');
const medicationPlanRouter = express.Router();
const MedicationPlanController  = require('../controllers/medicationPlanController');

const isLoggedIn  = require("../middleware/isLoggedIn");
const { roleCheck } = require("../middleware/roleCheck");
const {authenticateUser} = require("../middleware/authUser");

medicationPlanRouter.get('/', authenticateUser,  MedicationPlanController.getAllMedPlans);

medicationPlanRouter.post('/new-plan',  authenticateUser, roleCheck('admin'), MedicationPlanController.createMedPlan);

medicationPlanRouter.get('/:patient_id',  authenticateUser, MedicationPlanController.getMedPlansForPatient);

medicationPlanRouter.get('/:id',  authenticateUser, MedicationPlanController.getMedPlanById);

// medicationPlanRouter.put('/:id', isLoggedIn, roleCheck('admin'), MedicationPlanController.updateBlog);

// medicationPlanRouter.delete('/:id', isLoggedIn, roleCheck('admin'), MedicationPlanController.deleteBlog);

module.exports = medicationPlanRouter;
