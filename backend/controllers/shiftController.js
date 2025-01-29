const ShiftService = require("../services/shiftService");

class ShiftController {
    /**
     * Retrieve all pending tasks and administered medications for the shift handover.
     * @param {Request} req - Express request object.
     * @param {Response} res - Express response object.
     * @param {Function} next - Express next middleware function.
     */
    async getShiftHandover(req, res, next) {
      try {
        const nurseId = req.user.id; // Logged-in nurse ID
        const handoverData = await ShiftService.getShiftHandover(nurseId);
        res.status(200).json(handoverData);
      } catch (error) {
        next(error);
      }
    }
  
    /**
     * Update shift notes and mark the shift as completed.
     * @param {Request} req - Express request object.
     * @param {Response} res - Express response object.
     * @param {Function} next - Express next middleware function.
     */
    async completeShift(req, res, next) {
      try {
        const nurseId = req.user.id; // Logged-in nurse ID
        const { notes } = req.body;
        const updatedShift = await ShiftService.completeShift(nurseId, notes);
        res.status(200).json(updatedShift);
      } catch (error) {
        next(error);
      }
    }
  }
  


  module.exports = new ShiftController();