db = require("../models");

const User = db.User;
const MedicationPlan = db.MedicationPlan;
const Medication = db.Medication;
const Patient = db.Patient;
const MedicationItem = db.MedicationItem;
const MedicationAdministration = db.MedicationAdministration;

class MedicationPlanService {
  async createMedPlan(data) {
    // Ensure patient exists
    const patient = await Patient.findByPk(data.patient_id);
    if (!patient) throw new Error("Patient not found.");

    // Validate medications
    if (!data.medications || data.medications.length === 0) {
      throw new Error("At least one medication is required for the plan.");
    }

    return await db.sequelize.transaction(async (t) => {
      // Create the medication plan
      const medicationPlan = await MedicationPlan.create(data, {
        transaction: t,
      });

      // Add medications to the plan
      for (const med of data.medications) {
        await MedicationItem.create(
          {
            plan_id: medicationPlan.id,
            medication_id: med.medication_id,
            dose: med.dose,
            frequency: med.frequency,
            route_of_administration: med.route_of_administration,
            instructions: med.instructions,
            start_date: med.start_date,
            end_date: med.end_date,
            schedule: med.schedule,
            recurrence: med.recurrence || "daily",
            status: med.status || "due",
          },
          { transaction: t }
        );
      }

      return medicationPlan;
    });
  }

  async getAllMedPlans() {
    const plans = await MedicationPlan.findAll({
      include: [
        {
          model: Patient,
          attributes: ["first_name", "last_name", "medical_record_number"],
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
          attributes: ["first_name", "last_name", "medical_record_number"],
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

  /**
   * Update the status of a specific medication item.
   * @param {number} medicationItemId - ID of the medication item.
   * @param {string} status - New status of the medication (e.g., 'administered', 'missed').
   * @param {string|null} notes - Optional notes for skipped medications.
   * @returns {Promise<Object>} - Updated medication item.
   */
  async updateMedicationStatus(medicationItemId, status, notes = null) {
    const medicationItem = await MedicationItem.findByPk(medicationItemId);
    if (!medicationItem) throw new Error("Medication item not found");

    // Update the medication item
    return await medicationItem.update({ status, skipped_notes: notes });
  }

  /**
   * Log a medication administration record.
   * @param {Object} logData - Data for the administration record.
   * @param {number} logData.medication_item_id - ID of the medication item.
   * @param {number} logData.patient_id - ID of the patient.
   * @param {number} logData.administered_by - ID of the nurse who administered the medication.
   * @param {string} logData.status - Status of administration ('administered', 'skipped').
   * @param {string|null} logData.notes - Optional notes for skipped medications.
   * @returns {Promise<Object>} - The created medication administration record.
   */
  async logMedicationAdministration(logData) {
    // Validate medication item exists
    const medicationItem = await MedicationItem.findByPk(
      logData.medication_item_id
    );
    if (!medicationItem) throw new Error("Medication item not found");

    // Validate patient exists
    const patient = await Patient.findByPk(logData.patient_id);
    if (!patient) throw new Error("Patient not found");

    // Create medication administration record
    return await MedicationAdministration.create(logData);
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
