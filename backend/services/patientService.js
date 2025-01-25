const { where } = require("sequelize");

db = require("../models");

const Ward = db.Ward;
const Patient = db.Patient;
const Hospital = db.Hospital;

class PatientService {
  async createPatient(data) {
    // Ensure the ward exists
    const ward = await Ward.findByPk(data.ward_id);
    if (!ward) {
      throw new Error("Invalid ward selected");
    }

    // Ensure the hospital exists
    const hospital = await Hospital.findByPk(data.hospital_id);
    if (!hospital) {
      throw new Error("Invalid hospital selected");
    }

    // Validate medical record number uniqueness
    const existingPatient = await Patient.findOne({
      where: { medical_record_number: data.medical_record_number },
    });
    if (existingPatient) {
      throw new Error("Medical record number already exists");
    }

    // Create the patient
    return await db.sequelize.transaction(async (t) => {
      const patient = await Patient.create(data, { transaction: t });
      return patient;
    });
  }

  async getAllPatients() {
    return await Patient.findAll({
      where: { active: true },
      include: [
        { model: Ward, attributes: ["name"] },
        { model: Hospital, attributes: ["name"] },
      ],
    });
  }

  async getPatientsByWard(wardId) {
    const ward = await Ward.findByPk(wardId);
    if (!ward) {
      throw new Error("Ward not found");
    }

    return await Patient.findAll({
      where: { ward_id: wardId, active: true },
      include: [{ model: Ward, attributes: ["name"] }],
    });
  }

  async getPatientsByHospital(hospitalId) {
    const hospital = await Hospital.findByPk(hospitalId);
    if (!hospital) {
      throw new Error("Hospital not found");
    }

    return await Patient.findAll({
      where: { hospital_id: hospitalId, active: true },
      include: [{ model: Ward, attributes: ["name"] }],
    });
  }

  async getPatientById(patientId) {
    const patient = await Patient.findByPk(patientId, {
      include: [
        { model: Ward, attributes: ["name"] },
        { model: Hospital, attributes: ["name"] },
      ],
    });

    if (!patient) {
      throw new Error("Patient not found");
    }

    return patient;
  }

  async updatePatient(patientId, data) {
    const patient = await Patient.findByPk(patientId);
    if (!patient) {
      throw new Error("Patient not found");
    }

    // Ensure ward and hospital exist if updating
    if (data.ward_id) {
      const ward = await Ward.findByPk(data.ward_id);
      if (!ward) {
        throw new Error("Invalid ward selected");
      }
    }
    if (data.hospital_id) {
      const hospital = await Hospital.findByPk(data.hospital_id);
      if (!hospital) {
        throw new Error("Invalid hospital selected");
      }
    }

    return await db.sequelize.transaction(async (t) => {
      await patient.update(data, { transaction: t });
      return patient;
    });
  }

  async dischargePatient(patientId) {
    const patient = await Patient.findByPk(patientId);
    if (!patient) {
      throw new Error("Patient not found");
    }

    if (!patient.active) {
      throw new Error("Patient is already discharged");
    }

    try {
      return await db.sequelize.transaction(async (t) => {
        await patient.update(
          { active: false, discharge_date: new Date() },
          { transaction: t }
        );
        return { message: "Patient deactivated successfully", patient };
      });
    } catch (error) {
      throw new Error("Error discharging patient: " + error.message);
    }
  }

  // async getPatientMedicationPlans(patientId) {
  //   const patient = await db.Patient.findByPk(patientId);
  //   if (!patient) {
  //     throw new Error("Patient not found");
  //   }

  //   return await patient.getMedicationPlans();
  // }
}

module.exports = new PatientService();
