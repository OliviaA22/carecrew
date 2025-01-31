const db = require("../models");
const User = db.User;
const MedicationItem = db.MedicationItem;
const MedicationAdministration = db.MedicationAdministration;
const Patient = db.Patient;
const Ward = db.Ward;
const Shift = db.Shift;

class ShiftService {
  /**
   * Start a new shift for a nurse.
   * @param {number} nurseId - ID of the nurse starting the shift.
   * @returns {Promise<Object>} - The created shift record.
   */
  async startShift(nurseId) {
    if (!nurseId) {
      throw new Error("Nurse ID is required to start a shift.");
    }

    // Check if the nurse already has an active shift
    const activeShift = await Shift.findOne({
      where: { nurse_id: nurseId, status: "in progress" },
    });

    if (activeShift) {
      throw new Error("You already have an active shift.");
    }

    // Create a new shift record
    const newShift = await Shift.create({
      nurse_id: nurseId,
      start_time: new Date(),
      status: "in progress",
    });

    return newShift;
  }

  async getShifts() {
    return await Shift.findAll({
      include: [
        {
          model: User,
          attributes: ["first_name", "last_name"],
        },
      ],
    });
  }

  /**
   * End the current shift for a nurse.
   * @param {number} nurseId - ID of the nurse ending the shift.
   * @param {string} notes - Handover notes for the next shift.
   * @returns {Promise<Object>} - The updated shift record.
   */
  async endShift(nurseId, notes) {
    if (!nurseId) {
      throw new Error("Nurse ID is required to end a shift.");
    }

    // Find the active shift
    const activeShift = await Shift.findOne({
      where: { nurse_id: nurseId, status: "in progress" },
    });

    if (!activeShift) {
      throw new Error("No active shift found to end.");
    }

    // Update the shift record
    await activeShift.update({
      end_time: new Date(),
      status: "completed",
      notes,
    });

    return activeShift;
  }
}

module.exports = new ShiftService();
