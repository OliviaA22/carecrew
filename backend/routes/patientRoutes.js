const express = require('express');
const patientRouter = express.Router();
const patientController = require('../controllers/patientController');

const isLoggedIn  = require("../middleware/isLoggedIn");
const { roleCheck } = require("../middleware/roleCheck");



patientRouter.post('/new-patient', isLoggedIn, roleCheck('admin'), patientController.createPatient);

patientRouter.get('/', isLoggedIn, roleCheck('admin'), patientController.getAllPatients);

patientRouter.get('/ward/:ward_id', isLoggedIn, patientController.getPatientsByWard);

patientRouter.get('/hospital/:hospital_id', isLoggedIn, roleCheck('admin'),  patientController.getPatientsByHospital);

patientRouter.get('/:id', isLoggedIn, patientController.getPatientById);

patientRouter.put('/:id', isLoggedIn, roleCheck('admin'),  patientController.updatePatient);

patientRouter.put('/discharge/:id', isLoggedIn, roleCheck('admin'),  patientController.dischargePatient);



module.exports = patientRouter;
