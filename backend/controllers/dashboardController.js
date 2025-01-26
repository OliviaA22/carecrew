const DashbordService = require("../services/dashboardService");

class DashboardController {


  async getWards(req, res, next) {
    try {
      const nurses = await DashbordService.getWards();
      res.status(201).json(nurses);
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

}

module.exports = new DashboardController();
