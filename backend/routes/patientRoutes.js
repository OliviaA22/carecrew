const express = require('express');
const patientRouter = express.Router();
const patientController = require('../controllers/patientController');

const {authenticateUser} = require("../middleware/authUser");
const { roleCheck } = require("../middleware/roleCheck");



patientRouter.post('/new-patient', authenticateUser, roleCheck('admin'), patientController.createPatient);

patientRouter.get('/', authenticateUser, roleCheck('admin'), patientController.getAllPatients);

patientRouter.get('/ward/:ward_id', authenticateUser, patientController.getPatientsByWard);

patientRouter.get('/hospital/:hospital_id', authenticateUser, roleCheck('admin'),  patientController.getPatientsByHospital);

patientRouter.get('/:id', authenticateUser, patientController.getPatientById);

patientRouter.put('/:id', authenticateUser, roleCheck('admin'),  patientController.updatePatient);

patientRouter.put('/discharge/:id', authenticateUser, roleCheck('admin'),  patientController.dischargePatient);



module.exports = patientRouter;
