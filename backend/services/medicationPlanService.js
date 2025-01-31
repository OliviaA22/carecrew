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

    if (!data.patient_id || !data.created_by || !data.valid_from) {
      throw new Error("Missing required fields: patient_id, created_by, valid_from");
    }
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
      const medicationPlan = await MedicationPlan.create(
        { ...data,
          valid_until: data.valid_until || null, 
          additional_notes: data.additional_notes || null,
         },
        { transaction: t }
      );

      return medicationPlan;
    });
  }



  async addMedicationsToPlan(planId, medications) {
    if (!planId || !medications || medications.length === 0) {
      throw new Error("Missing required data: planId and medications are required.");
    }

    const medicationPlan = await MedicationPlan.findByPk(planId);
    if (!medicationPlan) throw new Error("Medication plan not found.");
  
    return await db.sequelize.transaction(async (t) => {
      const createdMedications = await MedicationItem.bulkCreate(
        medications.map(med => ({
          ...med,
          plan_id: planId,
          status: med.status || "due",
          scheduled_time: med.scheduled_time.slice(0, 5) 
        })),
        { transaction: t }
      );
  
      return { message: "Medications added successfully.", 
        medications: createdMedications };
    });
  }
  

  async getAllMedPlans() {
    return await MedicationPlan.findAll({
      include: [
        {
          model: Patient,
        },
        { model: MedicationItem,
          include: [
            {
              model: Medication,
            },
          ],
        }
      ],
    });
  }

  async getMedPlanById(planId) {
    if (!planId) throw new Error("Plan ID is required.");

    const medicationPlan = await MedicationPlan.findByPk(planId, {
      include: [
        {
        model: Patient,
      },
      { model: MedicationItem,
        include: [
          {
            model: Medication,
          },
        ],
      }],
    });

    if (!medicationPlan) throw new Error("Medication plan not found.");

    return medicationPlan;
  }


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


  async updateMedPlan(planId, updateData) {
    if (!planId) {
      throw new Error("Invalid request: Plan ID required.");
    }

    const medicationPlan = await MedicationPlan.findByPk(planId);
    if (!medicationPlan) throw new Error("Medication plan not found.");

    return await db.sequelize.transaction(async (t) => {
      await medicationPlan.update(updateData, { transaction: t });

      return { message: "Medication plan updated successfully.", medicationPlan };
    });
  }

  /**
   * Delete a medication plan.
   * Ensures associated medications are deleted to maintain integrity.
   */
  async deleteMedPlan(planId) {
    if (!planId) throw new Error("Plan ID is required.");

    return await db.sequelize.transaction(async (t) => {
      const medicationPlan = await MedicationPlan.findByPk(planId);
      if (!medicationPlan) throw new Error("Medication plan not found.");

      await MedicationItem.destroy({ where: { plan_id: planId }, transaction: t });
      await medicationPlan.destroy({ transaction: t });

      return { message: "Medication plan and associated medications deleted successfully." };
    });
  }



}

module.exports = new MedicationPlanService();
