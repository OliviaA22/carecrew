const NotificationService = require("../services/notificationService");

class NotificationController {

   /**
   * Retrieve notifications for the logged-in nurse.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
   async getWardNotifications(req, res, next) {
    try {
      if (!req.user.ward_id) {
        return res.status(400).json({ message: "Ward ID is missing for the nurse." });
      }
      const notifications = await NotificationService.getWardNotifications(req.user.ward_id);
      res.status(200).json(notifications);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Mark a notification as read.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async markNotificationRead(req, res, next) {
    try {
      const notificationId = req.params.id;
      const updatedNotification = await NotificationService.markNotificationRead(notificationId);
      res.status(200).json(updatedNotification);
    } catch (error) {
      next(error);
    }
  }

}

module.exports = new NotificationController();
