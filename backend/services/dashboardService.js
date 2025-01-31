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


  
  async getDashboardData(nurseId) {
    if (!nurseId) throw new Error("Nurse ID is required");
  
    // Retrieve the nurse's details, including their ward
    const nurse = await User.findByPk(nurseId, {
      attributes: ["id", "first_name", "last_name", "ward_id"],
    });
  
    if (!nurse || !nurse.ward_id) {
      throw new Error("Nurse not found or ward ID is missing.");
    }
  
    // Fetch assigned patients along with their medication plans and medication items
    const assignedPatients = await Patient.findAll({
      where: { ward_id: nurse.ward_id },
      include: [
        {
          model: MedicationPlan,
          attributes: ["id", "name", "valid_from", "valid_until", "additional_notes"],
          include: [
            {
              model: MedicationItem,
              attributes: [
                "id",
                "medication_id",
                "dose",
                "frequency",
                "route_of_administration",
                "instructions",
                "start_date",
                "end_date",
                "schedule",
                "recurrence",
                "status",
              ],
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
  
  // async getDashboardData(nurseId) {
  //   if (!nurseId) throw new Error("Nurse ID is required");
  
  //   // Retrieve the nurse's details, including their ward
  //   const nurse = await db.User.findByPk(nurseId, {
  //     attributes: ["id", "first_name", "last_name", "ward_id"],
  //   });
  
  //   if (!nurse || !nurse.ward_id) {
  //     throw new Error("Nurse not found or ward ID is missing.");
  //   }
  
  //   // Fetch assigned patients along with their medication plans and medication items
  //   const assignedPatients = await db.Patient.findAll({
  //     where: { ward_id: nurse.ward_id },
  //     include: [
  //       {
  //         model: db.MedicationPlan, // Include the medication plans for the patient
  //         include: [
  //           {
  //             model: db.MedicationItem, // Include medication items within each plan
  //             include: [
  //               {
  //                 model: db.Medication, // Include details of the medication (name, strength, etc.)
  //                 attributes: ["id", "name", "strength", "dosage_form", "description"],
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   });
  
  //   return { assignedPatients };
  // }

}

module.exports = new DashboardService();
