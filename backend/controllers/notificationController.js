const NotificationService = require("../services/notificationService");

class NotificationController {

  async getWardNotifications(req, res, next) {
    try {
      const { ward_id } = req.user; 
      if (!ward_id) {
        return res.status(400).json({ message: "Ward ID is missing for the nurse." });
      }
      const notifications = await NotificationService.getWardNotifications(ward_id);
      res.status(200).json(notifications);
    } catch (error) {
      next(error);
    }
  }

  async markNotificationAsRead(req, res, next) {
    try {
      const { id } = req.params;
      const response = await NotificationService.markNotificationAsRead(id);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

}

module.exports = new NotificationController();
