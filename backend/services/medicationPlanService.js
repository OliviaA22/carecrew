db = require("../models");

const User = db.User;
const MedicationPlan = db.MedicationPlan;
const Medication = db.Medication;
const Patient = db.Patient;
const MedicationItem = db.MedicationItem;
const MedicationAdministration = db.MedicationAdministration;

class MedicationPlanService {
  async createMedPlan(data) {
    if (!data.patient_id || !data.created_by || !data.valid_from) {
      throw new Error(
        "Missing required fields: patient_id, created_by, valid_from"
      );
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
        {
          ...data,
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
      throw new Error(
        "Missing required data: planId and medications are required."
      );
    }

    const medicationPlan = await MedicationPlan.findByPk(planId);
    if (!medicationPlan) throw new Error("Medication plan not found.");

    return await db.sequelize.transaction(async (t) => {
      const createdMedications = await MedicationItem.bulkCreate(
        medications.map((med) => ({
          ...med,
          plan_id: planId,
          status: med.status || "due",
          scheduled_time: med.scheduled_time.slice(0, 5),
        })),
        { transaction: t }
      );

      return {
        message: "Medications added successfully.",
        medications: createdMedications,
      };
    });
  }

  async getAllMedPlans() {
    return await MedicationPlan.findAll({
      include: [
        {
          model: Patient,
        },
        {
          model: MedicationItem,
          include: [
            {
              model: Medication,
            },
          ],
        },
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
        {
          model: MedicationItem,
          include: [
            {
              model: Medication,
            },
          ],
        },
      ],
    });

    if (!medicationPlan) throw new Error("Medication plan not found.");

    return medicationPlan;
  }


  async createMedicationAdministration(data) {
    const medicationItem = await MedicationItem.findByPk(data.med_item_id);
    if (!medicationItem) throw new Error("Medication item not found.");

    const patient = await Patient.findByPk(data.patient_id);
    if (!patient) throw new Error("Patient not found.");

    const nurse = await User.findByPk(data.administered_by);
    if (!nurse) throw new Error("Nurse not found.");

    return await db.sequelize.transaction(async (t) => {
      const newRecord = await MedicationAdministration.create(data, { transaction: t });
      await medicationItem.update(
        { status: "completed" },
        { transaction: t }
      );

      return newRecord;
    });
  }

  async getAllMedicationAdministrations() {
    return await MedicationAdministration.findAll({
      include: [
        {
          model: MedicationItem,
          attributes: ["id", "dose", "frequency", "route_of_administration"],
        },
        { model: Patient, attributes: ["id", "first_name", "last_name"] },
        {
          model: User,
          as: "administeredBy",
          attributes: ["id", "first_name", "last_name"],
        },
      ],
    });
  }

  async getMedicationAdministrationById(id) {
    const record = await MedicationAdministration.findByPk(id, {
      include: [
        {
          model: MedicationItem,
          attributes: ["id", "dose", "frequency", "route_of_administration"],
        },
        { model: Patient, attributes: ["id", "first_name", "last_name"] },
        {
          model: User,
          as: "administeredBy",
          attributes: ["id", "first_name", "last_name"],
        },
      ],
    });

    if (!record) throw new Error("Medication administration record not found.");
    return record;
  }

  async updateMedicationAdministration(id, updates) {
    const record = await MedicationAdministration.findByPk(id);
    if (!record) throw new Error("Medication administration record not found.");

    await record.update(updates);
    return record;
  }

  async updateMedPlan(planId, updateData) {
    if (!planId) {
      throw new Error("Invalid request: Plan ID required.");
    }

    const medicationPlan = await MedicationPlan.findByPk(planId);
    if (!medicationPlan) throw new Error("Medication plan not found.");

    return await db.sequelize.transaction(async (t) => {
      await medicationPlan.update(updateData, { transaction: t });

      return {
        message: "Medication plan updated successfully.",
        medicationPlan,
      };
    });
  }

  async deleteMedicationAdministration(id) {
    const record = await MedicationAdministration.findByPk(id);
    if (!record) throw new Error("Medication administration record not found.");

    await record.destroy();
    return {
      message: "Medication administration record deleted successfully.",
    };
  }

  async deleteMedPlan(planId) {
    if (!planId) throw new Error("Plan ID is required.");

    return await db.sequelize.transaction(async (t) => {
      const medicationPlan = await MedicationPlan.findByPk(planId);
      if (!medicationPlan) throw new Error("Medication plan not found.");

      await MedicationItem.destroy({
        where: { plan_id: planId },
        transaction: t,
      });
      await medicationPlan.destroy({ transaction: t });

      return {
        message:
          "Medication plan and associated medications deleted successfully.",
      };
    });
  }
}

module.exports = new MedicationPlanService();
