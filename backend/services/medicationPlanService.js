db = require("../models");

const User = db.User;
const MedicationPlan = db.MedicationPlan;
const Medication = db.Medication;
const Patient = db.Patient;
const MedicationItem = db.MedicationItem;
const MedicationAdministration = db.MedicationAdministration;

class MedicationPlanService {
  // async createMedPlan(data) {
  //   // Ensure patient exists
  //   const patient = await Patient.findByPk(data.patient_id);
  //   if (!patient) throw new Error("Patient not found.");

  //   // Validate medications
  //   if (!data.medications || data.medications.length === 0) {
  //     throw new Error("At least one medication is required for the plan.");
  //   }

  //   return await db.sequelize.transaction(async (t) => {
  //     // Create the medication plan
  //     const medicationPlan = await MedicationPlan.create(data, {
  //       transaction: t,
  //     });

  //     // Add medications to the plan
  //     for (const med of data.medications) {
  //       await MedicationItem.create(
  //         {
  //           plan_id: medicationPlan.id,
  //           medication_id: med.medication_id,
  //           dose: med.dose,
  //           frequency: med.frequency,
  //           route_of_administration: med.route_of_administration,
  //           instructions: med.instructions,
  //           start_date: med.start_date,
  //           end_date: med.end_date,
  //           schedule: med.schedule,
  //           recurrence: med.recurrence || "daily",
  //           status: med.status || "due",
  //         },
  //         { transaction: t }
  //       );
  //     }

  //     return medicationPlan;
  //   });
  // }
  async createMedPlan(data) {
    // Ensure patient exists
    const patient = await Patient.findByPk(data.patient_id);
    if (!patient) throw new Error("Patient not found.");

    // Check if the patient already has an active medication plan
    const existingPlan = await MedicationPlan.findOne({
      where: { patient_id: data.patient_id },
    });

    if (existingPlan) {
      throw new Error("This patient already has an active medication plan.");
    }

    return await db.sequelize.transaction(async (t) => {
      // Create the medication plan
      const medicationPlan = await MedicationPlan.create(
        { data },
        { transaction: t }
      );

      return medicationPlan;
    });
  }

  async getAllMedPlans() {
    const plans = await MedicationPlan.findAll({
      include: [
        {
          model: Patient,
        },
      ],
    });
    return plans;
  }

  async getMedPlanById(planId) {
    const plan = await MedicationPlan.findByPk(planId, {
      include: [
        {
          model: Patient,
        },
        {
          model: MedicationItem,
          include: [
            {
              model: Medication,
              attributes: ["name"],
            },
          ],
        },
      ],
    });
    return plan;
  }

  async addMedicationsToPlan(planId, medications) {
    const medicationPlan = await MedicationPlan.findByPk(planId);
    if (!medicationPlan) throw new Error("Medication plan not found.");
  
    if (!medications || medications.length === 0) {
      throw new Error("At least one medication is required.");
    }
  
    return await db.sequelize.transaction(async (t) => {
      const createdMedications = await MedicationItem.bulkCreate(
        medications.map(med => ({
          ...med,
          plan_id: planId,
          status: med.status || "due",
        })),
        { transaction: t }
      );
  
      return { message: "Medications added successfully.", medications: createdMedications };
    });
  }
  
  // Get all medications for a patient during a shift

  async getMedPlansForPatient(patientId) {
    try {
      const currentDate = new Date().toISOString().split("T")[0];

      const plans = await MedicationPlan.findAll({
        where: {
          patient_id: patientId,
          status: "active",
          valid_from: { [db.Sequelize.Op.lte]: currentDate },
          [db.Sequelize.Op.or]: [
            { valid_until: { [db.Sequelize.Op.gte]: currentDate } },
            { valid_until: null },
          ],
        },
        include: [
          {
            model: MedicationItem,
            as: "medication_items",
            include: [
              {
                model: Medication,
                as: "medication",
                attributes: ["name", "description", "dosage_form", "strength"],
              },
            ],
          },
        ],
      });

      return plans;
    } catch (error) {
      console.error("Error in getting Plans for Patient:", error);
      throw error;
    }
  }

  async getMedPlansForDoctor(doctorId) {
    const plans = await MedicationPlan.findAll({
      where: { created_by: doctorId },
    });
    return plans;
  }

  async updateMedPlan(planId, updates) {
    const plan = await MedicationPlan.findByPk(planId);
    if (!plan) {
      throw new Error("Plan not found");
    }
    await plan.update(updates);
    return plan;
  }

  async deleteMedPlan(planId) {
    const result = await MedicationPlan.destroy({
      where: { id: planId },
    });
    if (result === 0) {
      throw new Error("Plan not found or already deleted.");
    }
    return "Plan deleted successfully.";
  }
}

module.exports = new MedicationPlanService();
