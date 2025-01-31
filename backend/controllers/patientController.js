const PatientService = require("../services/patientService");

class PatientController {
  async createPatient(req, res, next) {
    try {
      const patient = await PatientService.createPatient(req.body);
      res.status(201).json(patient);
    } catch (error) {
      next(error);
    }
  }

  async getAllPatients(req, res, next) {
    try {
      const patients = await PatientService.getAllPatients();
      res.status(200).json(patients);
    } catch (error) {
      next(error);
    }
  }

  async getPatientsByHospital(req, res, next) {
    try {
      const patients = await PatientService.getPatientsByHospital(
        req.params.hospital_id
      );
      res.status(200).json(patients);
    } catch (error) {
      next(error);
    }
  }

  async getPatientsByWard(req, res, next) {
    try {
      const patients = await PatientService.getPatientsByWard(
        req.params.ward_id
      );
      res.status(200).json(patients);
    } catch (error) {
      next(error);
    }
  }

  async getPatientById(req, res, next) {
    try {
      const patient = await PatientService.getPatientById(req.params.id);
      res.status(200).json(patient);
    } catch (error) {
      next(error);
    }
  }

  async updatePatient(req, res, next) {
    try {
      const updatedPatient = await PatientService.updatePatient(
        req.params.id,
        req.body
      );
      res.status(200).json(updatedPatient);
    } catch (error) {
      next(error);
    }
  }

  async dischargePatient(req, res, next) {
    try {
      const result = await PatientService.dischargePatient(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  // async deletePatient(req, res, next) {
  //   try {
  //     const result = await PatientService.deletePatient(
  //       req.params.id
  //     );
  //     res.status(200).json({ message: result });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

module.exports = new PatientController();
