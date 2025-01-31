const db = require("../models");
const { Op } = require("sequelize");

const MedicationItem = db.MedicationItem;
const MedicationPlan = db.MedicationPlan;
const Notification = db.Notification;
const Patient = db.Patient;


class NotificationService {
  /**
   * Generate notifications for due medications in all wards.
   */

  async fetchDueMedications() {
    const now = new Date();
    const currentTime = now.toISOString().split("T")[1].slice(0, 5);
    const endTime = new Date(now.getTime() + 30 * 60 * 1000)
      .toISOString()
      .split("T")[1]
      .slice(0, 5);

    try {
      return await MedicationItem.findAll({
        where: {
          status: "due",
          [Op.or]: [
            db.Sequelize.literal(
              `JSON_CONTAINS(schedule, JSON_QUOTE("${currentTime}"))`
            ),
            db.Sequelize.literal(`
            EXISTS (
              SELECT schedule_time
              FROM JSON_TABLE(
                schedule,
                '$[*]' COLUMNS (schedule_time VARCHAR(5) PATH '$')
              ) AS jt
              WHERE schedule_time >= "${currentTime}" AND schedule_time <= "${endTime}"
            )
          `),
          ],
        },
        include: [
          {
            model: MedicationPlan,
            attributes: ["id", "patient_id"],
            required: true,
            include: [
              {
                model: Patient,
                // attributes: ["id", "first_name", "last_name", "ward_id"],
                required: true,
              },
            ],
          },
        ],
      });
    } catch (error) {
      console.error(`Error fetching due medications: ${error.message}`);
      return [];
    }
  }

  async processDueMedications() {
    console.log("Checking for due medications...");

    try {
      const dueMedications = await this.fetchDueMedications();
      if (dueMedications.length === 0) {
        console.log("No due medications found within the time range.");
        return;
      }

      for (const medication of dueMedications) {
        const medicationPlan = medication.medication_plan;
        const patient = medicationPlan.patient;

        // Check if a notification for this medication has already been created today
        const existingNotification = await Notification.findOne({
          where: {
            medication_item_id: medication.id,
            createdAt: {
              [Op.gte]: new Date().setHours(0, 0, 0, 0), // Only check for today's notifications
            },
          },
        });

        if (existingNotification) {
          console.log(
            `Skipping duplicate notification for medication ID: ${medication.id}`
          );
          continue;
        }

        // Create a new notification
        await Notification.create({
          patient_id: patient.id,
          ward_id: patient.ward_id,
          medication_item_id: medication.id,
          notification_type: "reminder",
          message: `Medication "${medication.medication_id}" is due for "${patient.first_name} ${patient.last_name}".`,
          is_read: false,
        });

        console.log(
          `Notification created for medication ID: ${medication.id}`
        );
      }
    } catch (error) {
      console.error(`Error processing notifications: ${error.message}`);
    }
  }

  async fetchMissedMedications() {
    const now = new Date();
    const pastTime = new Date(now.getTime() - 30 * 60 * 1000) // 30 minutes past
      .toISOString()
      .split("T")[1]
      .slice(0, 5);

    try {
      return await MedicationItem.findAll({
        where: {
          status: "missed",
          [Op.or]: [
            db.Sequelize.literal(
              `JSON_CONTAINS(schedule, JSON_QUOTE("${pastTime}"))`
            ),
            db.Sequelize.literal(`
            EXISTS (
              SELECT schedule_time
              FROM JSON_TABLE(
                schedule,
                '$[*]' COLUMNS (schedule_time VARCHAR(5) PATH '$')
              ) AS jt
              WHERE schedule_time < "${pastTime}"
            )
          `),
          ],
        },
        include: [
          {
            model: MedicationPlan,
            attributes: ["id", "patient_id"],
            required: true,
            include: [
              {
                model: Patient,
                required: true,
              },
            ],
          },
        ],
      });
    } catch (error) {
      console.error(`Error fetching missed medications: ${error.message}`);
      return [];
    }
  }

  async processMissedMedications() {
    console.log("Checking for missed medications...");

    try {
      const missedMedications = await this.fetchMissedMedications();
      if (missedMedications.length === 0) {
        console.log("No missed medications found.");
        return;
      }

      for (const medication of missedMedications) {
        const medicationPlan = medication.medication_plan;
        const patient = medicationPlan.patient;

        // Mark the medication as missed
        await medication.update({ status: "missed" });

        // ✅ Check if a notification for this missed dose already exists
        const existingNotification = await Notification.findOne({
          where: {
            medication_item_id: medication.id,
            notification_type: "alert",
            createdAt: {
              [Op.gte]: new Date().setHours(0, 0, 0, 0), // Prevent duplicate notifications for today
            },
          },
        });

        // ✅ Skip if a notification already exists
        if (existingNotification) {
          console.log(
            `Skipping duplicate missed medication notification for medication ID: ${medication.id}`
          );
          continue;
        }
        // Create a new notification for the missed medication
        await Notification.create({
          patient_id: patient.id,
          ward_id: patient.ward_id,
          medication_item_id: medication.id,
          notification_type: "alert",
          message: `Medication "${medication.medication_id}" was missed for "${patient.first_name} ${patient.last_name}". Immediate action required!`,
          is_read: false,
        });

        console.log(
          `Missed medication notification created for ID: ${medication.id}`
        );
      }
    } catch (error) {
      console.error(`Error processing missed medications: ${error.message}`);
    }
  }

  /**
   * Fetch medications that are due within the next 30 minutes.
   * @returns {Promise<Array>} List of due medications.
   */
  // async fetchDueMedications() {
  //   const now = new Date();
  //   const currentTime = now.toISOString().split("T")[1].slice(0, 5);
  //   const endTime = new Date(now.getTime() + 30 * 60 * 1000)
  //     .toISOString()
  //     .split("T")[1]
  //     .slice(0, 5);

  //   try {
  //     return await MedicationItem.findAll({
  //       where: {
  //         status: "due",
  //         [Op.or]: [
  //           // Exact match in JSON schedule
  //           db.Sequelize.literal(
  //             `JSON_CONTAINS(schedule, JSON_QUOTE("${currentTime}"))`
  //           ),
  //           // Check if any time in the schedule falls within the next 30 minutes
  //           db.Sequelize.literal(`
  //           EXISTS (
  //             SELECT schedule_time
  //             FROM JSON_TABLE(
  //               schedule,
  //               '$[*]' COLUMNS (schedule_time VARCHAR(5) PATH '$')
  //             ) AS jt
  //             WHERE schedule_time >= "${currentTime}" AND schedule_time <= "${endTime}"
  //           )
  //         `),
  //         ],
  //       },
  //       include: [
  //         {
  //           model: MedicationPlan,
  //           attributes: ["id", "patient_id"],
  //           required: true,
  //           include: [
  //             {
  //               model: Patient,
  //               attributes: ["id", "first_name", "last_name", "ward_id"],
  //               required: true,
  //             },
  //           ],
  //         },
  //       ],
  //     });
  //   } catch (error) {
  //     console.error(`Error fetching due medications: ${error.message}`);
  //     return [];
  //   }
  // }

  // /**
  //  * Process due medications and create notifications.
  //  */
  // async processMedicationsForNotifications() {
  //   console.log("Generating notifications...");

  //   try {
  //     const dueMedications = await this.fetchDueMedications();
  //     if (dueMedications.length === 0) {
  //       console.log("No due medications found within the time range.");
  //       return;
  //     }

  //     for (const medication of dueMedications) {
  //       const medicationPlan = medication.medication_plan;
  //       const patient = medicationPlan.patient;

  //       const message = `Medication "${medication.medication_id}" is due for "${patient.first_name} ${patient.last_name}".`;

  //       // Create notification
  //       await Notification.create({
  //         patient_id: patient.id,
  //         ward_id: patient.ward_id,
  //         notification_type: "reminder",
  //         message,
  //         is_read: false,
  //       });

  //       console.log(
  //         `Notification created for patient ID: ${patient.id}, medication ID: ${medication.id}`
  //       );
  //     }
  //   } catch (error) {
  //     console.error(`Error processing notifications: ${error.message}`);
  //   }
  // }

  /**
   * Fetch notifications for the logged-in nurse based on their assigned ward.
   * @param {number} wardId - The ward ID of the logged-in nurse.
   * @returns {Promise<Array>} - List of notifications for the ward.
   */
  async getWardNotifications(wardId) {
    return await Notification.findAll({
      where: {
        ward_id: wardId,
        is_read: false,
      },
      include: [
        {
          model: Patient,
        },
      ],
      order: [["createdAt", "DESC"]],
    });
  }

  /**
   * Mark a notification as read.
   * @param {number} notificationId - The ID of the notification to mark as read.
   * @returns {Promise<Object>} - Updated notification.
   */
  async markNotificationRead(notificationId) {
    const notification = await Notification.findByPk(notificationId);
    if (!notification) {
      throw new Error("Notification not found");
    }

    await notification.update({ is_read: true });
    return notification;
  }
}

module.exports = new NotificationService();
