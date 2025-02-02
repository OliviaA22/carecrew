const db = require("../models");
const User = db.User;
const MedicationItem = db.MedicationItem;
const MedicationAdministration = db.MedicationAdministration;
const Patient = db.Patient;
const Ward = db.Ward;
const Shift = db.Shift;

class ShiftService {

  async startShift(nurseId) {
    if (!nurseId) {
      throw new Error("Nurse ID is required to start a shift.");
    }
    const activeShift = await Shift.findOne({
      where: { nurse_id: nurseId, status: "in progress" },
    });

    if (activeShift) {
      throw new Error("You already have an active shift.");
    }
    const newShift = await Shift.create({
      nurse_id: nurseId,
      start_time: new Date(),
      status: "in progress",
      notes,
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


  async endShift(nurseId, notes) {
    if (!nurseId) {
      throw new Error("Nurse ID is required to end a shift.");
    }
    const activeShift = await Shift.findOne({
      where: { nurse_id: nurseId, status: "in progress" },
    });

    if (!activeShift) {
      throw new Error("No active shift found to end.");
    }
    await activeShift.update({
      end_time: new Date(),
      status: "completed",
      notes,
    });

    return activeShift;
  }
}

module.exports = new ShiftService();
