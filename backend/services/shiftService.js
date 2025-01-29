const db = require("../models");
const User = db.User;
const MedicationItem = db.MedicationItem;
const MedicationAdministration = db.MedicationAdministration;
const Patient = db.Patient;
const Ward = db.Ward;
const Shift = db.Shift;

  class ShiftService {
    /**
     * Get shift handover details for a nurse.
     * @param {number} nurseId - ID of the logged-in nurse.
     * @returns {Promise<Object>} - Pending tasks and administered medications.
     */
    async getShiftHandover(nurseId) {
      const nurse = await User.findByPk(nurseId);
      if (!nurse) throw new Error("Nurse not found");
  
      // Fetch pending tasks
      const pendingTasks = await MedicationItem.findAll({
        where: {
          status: ["due", "missed"],
        },
        include: [
          {
            model: Patient,
            where: { ward_id: nurse.ward_id },
            attributes: ["id", "first_name", "last_name"],
          },
        ],
      });
  
      // Fetch administered medications for the shift
      const administeredMedications = await MedicationAdministration.findAll({
        where: {
          administered_by: nurseId,
        },
        include: [
          {
            model: Patient,
            attributes: ["id", "first_name", "last_name"],
          },
        ],
      });
  
      return { pendingTasks, administeredMedications };
    }
  
    /**
     * Complete the shift and update notes.
     * @param {number} nurseId - ID of the logged-in nurse.
     * @param {string} notes - Handover notes for the next nurse.
     * @returns {Promise<Object>} - Updated shift details.
     */
    async completeShift(nurseId, notes) {
      const shift = await Shift.findOne({
        where: { nurse_id: nurseId, status: "in progress" },
      });
  
      if (!shift) throw new Error("No active shift found for this nurse.");
  
      // Mark shift as completed and update notes
      await shift.update({
        status: "completed",
        notes,
      });
  
      return shift;
    }
  }
  
  module.exports = new ShiftService();
  