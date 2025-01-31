const ShiftService = require("../services/shiftService");

class ShiftController {

  async getShifts(req, res, next) {
    try {
      const shifts = await ShiftService.getShifts();
      res.status(200).json(shifts);
    } catch (error) {
      next(error);
    }
  }

  async startShift(req, res, next) {
    try {
      const nurseId = req.user.id;
      const shift = await ShiftService.startShift(nurseId);
      res.status(201).json({ message: "Shift started successfully.", shift });
    } catch (error) {
      next(error);
    }
  }

  async endShift(req, res, next) {
    try {
      const nurseId = req.user.id;
      const { notes } = req.body; // Get handover notes from request body
      const shift = await ShiftService.endShift(nurseId, notes);
      res.status(200).json({ message: "Shift ended successfully.", shift });
    } catch (error) {
      next(error);
    }
  }


  }
  


  module.exports = new ShiftController();