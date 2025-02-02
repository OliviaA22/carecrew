const db = require("../models");
const { Op } = require("sequelize");

const MedicationItem = db.MedicationItem;
const MedicationPlan = db.MedicationPlan;
const Notification = db.Notification;
const Patient = db.Patient;

class NotificationService {
  async createNotification(data) {
    try {
      await Notification.create({ ...data, is_read: false });
      console.log(
        `Notification created for medication ID: ${data.medication_item_id}`
      );
    } catch (error) {
      console.error(`Error creating notification: ${error.message}`);
    }
  }

  /**
   * Fetch medications that are due for administration within the next 30 minutes
   */
  async fetchDueMedications() {
    const now = new Date();
    const currentTime = now.toISOString().split("T")[1].slice(0, 5);
    const endTime = new Date(now.getTime() + 30 * 60 * 1000)
      .toISOString()
      .split("T")[1]
      .slice(0, 5);

      return await MedicationItem.findAll({
        where: {
          status: "due",
          scheduled_time: { [Op.between]: [currentTime, endTime] },
        },
        include: [
          {
            model: MedicationPlan,
            include: [
              {
                model: Patient,
              },
            ],
          },
        ],
      });
  }

  async processDueMedications() {
    console.log("Checking for due medication notifications...");
      const dueMedications = await this.fetchDueMedications();
      if (dueMedications.length === 0) {
        console.log("No due medications at this time.");
        return;
      }

      for (const medication of dueMedications) {
        const patient = medication.medication_plan.patient;

        // Check if a notification already exists for this medication item today
        const existingNotification = await Notification.findOne({
          where: {
            medication_item_id: medication.id,
            notification_type: "reminder",
            createdAt: { [Op.gte]: new Date().setHours(0, 0, 0, 0) }, // Check for today's notifications
          },
        });

        if (existingNotification) {
          console.log(
            `Skipping duplicate notification for medication ID: ${medication.id}`
          );
          continue;
        }

        await this.createNotification({
          ward_id: patient.ward_id,
          patient_id: patient.id,
          medication_item_id: medication.id,
          notification_type: "reminder",
          message: `REMINDER: Medication is due for "${patient.first_name} ${patient.last_name}" at ${medication.scheduled_time}.`,
        });
      }
  }

  async fetchMissedMedications() {
      const now = new Date();
      const pastTime = new Date(now.getTime() - 30 * 60 * 1000)
        .toISOString()
        .split("T")[1]
        .slice(0, 5);
      const currentTime = now.toISOString().split("T")[1].slice(0, 5);

      const missedMedications = await MedicationItem.findAll({
        where: {
          status: "due",
          scheduled_time: {
            [Op.between]: [pastTime, currentTime],
          },
        },
        include: [
          {
            model: MedicationPlan,
            attributes: ["id", "patient_id"],
            include: [
              {
                model: Patient,
                attributes: ["id", "first_name", "last_name", "ward_id"],
              },
            ],
          },
        ],
      });
      return missedMedications;
  }

  async checkExistingMissedNotification(medicationId) {
    return await Notification.findOne({
      where: {
        medication_item_id: medicationId,
        notification_type: "alert",
        createdAt: { [Op.gte]: new Date().setHours(0, 0, 0, 0) },
      },
    });
  }

  async processMissedMedications() {
    console.log("Checking for missed medications...");

      const missedMedications = await this.fetchMissedMedications();
      if (missedMedications.length === 0) {
        console.log("No missed medications.");
        return;
      }

      for (const medication of missedMedications) {
        const patient = medication.medication_plan.patient;

        const existingAlert = await this.checkExistingMissedNotification(
          medication.id
        );
        if (existingAlert) {
          console.log(
            `Skipping duplicate missed medication alert for ID: ${medication.id}`
          );
          continue;
        }

        await this.createNotification({
          ward_id: patient.ward_id,
          patient_id: patient.id,
          medication_item_id: medication.id,
          notification_type: "alert",
          message: `ALERT: Medication scheduled at ${medication.scheduled_time} was missed for "${patient.first_name} ${patient.last_name}". Immediate action required!`,
        });
      }
  }

  async getWardNotifications(wardId) {
      if (!wardId) {
        throw new Error("Ward ID is required to fetch notifications.");
      }
  
      const notifications = await Notification.findAll({
        where: {
          ward_id: wardId,
          is_read: false,
        },
        include: [
          {
            model: Patient,
            attributes: ["id", "first_name", "last_name"],
          },
          {
            model: MedicationItem,
            attributes: ["id", "scheduled_time", "status"],
            include: [
              {
                model: MedicationPlan,
                attributes: ["id", "name"],
              },
            ],
          },
        ],
        order: [["createdAt", "DESC"]], 
      });
  
      return notifications;
  }

  async markNotificationAsRead(notificationId) {
    const notification = await Notification.findByPk(notificationId);
    if (!notification) throw new Error("Notification not found.");
  
    await notification.update({ is_read: true });
  
    return { message: "Notification marked as read successfully." };
  }

}

module.exports = new NotificationService();
