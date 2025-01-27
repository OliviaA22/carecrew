const NotificationService = require("../services/notificationJobService");

class NotificationController {

  async generateDueMedicationNotifications(req, res, next) {
    try {
      await NotificationService.generateDueMedicationNotifications();
      res.status(200).json({ message: "Due medication notifications generated successfully." });
    } catch (error) {
      next(error);
    }
  }

  async getNotificationsForNurse(req, res, next) {
    try {
      const nurseId = req.params.nurseId;
      const notifications = await NotificationService.getNotificationsForNurse(nurseId);
      res.status(200).json(notifications);
    } catch (error) {
      next(error);
    }
  }

  async getNotificationsForPatient(req, res, next) {
    try {
      const patientId = req.params.patientId;
      const notifications = await NotificationService.getNotificationsForPatient(patientId);
      res.status(200).json(notifications);
    } catch (error) {
      next(error);
    }
  }

  async markNotificationAsRead(req, res, next) {
    try {
      const notificationId = req.params.id;
      const notification = await NotificationService.markNotificationAsRead(notificationId);
      res.status(200).json({ message: "Notification marked as read.", notification });
    } catch (error) {
      next(error);
    }
  }

  async deleteNotification(req, res, next) {
    try {
      const notificationId = req.params.id;
      const response = await NotificationService.deleteNotification(notificationId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }


}

module.exports = new NotificationController();
