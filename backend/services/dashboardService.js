const axios = require("axios");
const db = require("../models");
bcrypt = require("bcryptjs");

const User = db.User;
const Op = db.Op;
const Ward = db.Ward;
const Hospital = db.Hospital;
const Patient = db.Patient;
const MedicationItem = db.MedicationItem;
const Notification = db.Notification;
const MedicationPlan = db.MedicationPlan;
const Medication = db.Medication;



class DashboardService {

  async getHospitals() {
    const hospitals = await Hospital.findAll();
    return hospitals;
  }

  async getWards() {
    const wards = await Ward.findAll();
    return wards;
  }

  async getMedications() {
    const medications = await Medication.findAll();
    return medications;
  }

  async getNurses() {
    const nurse = await User.findAll({
      where: {
        role: "nurse",
      },
      include: [
        {
          model: Ward,
          attributes: ["name"], // Only include ward name
        },
      ],
    });
    return nurse;
  }

  async getNursesByWard(wardId) {
    const ward = await Ward.findByPk(wardId);
    if (!ward) {
      throw new Error("Ward not found");
    }

    return await User.findAll({
      where: { 
        ward_id: wardId, 
        role: "nurse",
      },
      include: [{ model: Ward, attributes: ["name"] }],
    });
  }

  async getNursesByHospital(hospitalId) {
    const hospital = await Hospital.findByPk(hospitalId);
    if (!hospital) {
      throw new Error("Hospital not found");
    }

    return await User.findAll({
      where: { 
        hospital_id: hospitalId, 
        role: "nurse" 
      },
      include: [{ model: Ward, attributes: ["name"] }],
    });
  }

  async getMedicationById(medId) {
    const medication = await Medication.findByPk(medId);
    return medication;
  }
  
  async getDashboardData(nurseId) {
    if (!nurseId) throw new Error("Nurse ID is required");
   const nurse = await User.findByPk(nurseId, {
      attributes: ["id", "first_name", "last_name", "ward_id"],
    });
  
    if (!nurse || !nurse.ward_id) {
      throw new Error("Nurse not found or ward ID is missing.");
    }
    const assignedPatients = await Patient.findAll({
      where: { ward_id: nurse.ward_id },
      include: [
        {
          model: MedicationPlan,
          attributes: ["id", "name", "valid_from", "valid_until", "additional_notes"],
          include: [
            {
              model: MedicationItem,
              include: [
                {
                  model: Medication,
                  attributes: ["id", "name", "strength", "dosage_form", "description"],
                },
              ],
            },
          ],
        },
      ],
    });
  
    if (!assignedPatients.length) {
      return { message: "No patients found for the nurse's ward.", assignedPatients: [] };
    }
  
    return { assignedPatients };
  }
  

}

module.exports = new DashboardService();
