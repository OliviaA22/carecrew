const DashbordService = require("../services/dashboardService");

class DashboardController {


  async getWards(req, res, next) {
    try {
      const wards = await DashbordService.getWards();
      res.status(201).json(wards);
    } catch (error) {
      next(error);
    }
  }

  async getHospitals(req, res, next) {
    try {
      const hospitals = await DashbordService.getHospitals();
      res.status(201).json(hospitals);
    } catch (error) {
      next(error);
    }
  }

    /**
   * Fetch dashboard data for the logged-in nurse.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
    async getDashboardData(req, res, next) {
      try {
        const dashboardData = await DashbordService.getDashboardData(req.user.id);
        res.status(200).json(dashboardData);
      } catch (error) {
        next(error);
      }
    }


}

module.exports = new DashboardController();
