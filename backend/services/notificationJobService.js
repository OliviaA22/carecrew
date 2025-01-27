

const db = require("../models");
const { Op } = require("sequelize");
const MedicationItem = db.MedicationItem;
const Notification = db.Notification;

class NotificationJobService {
  /**
   * Get medications due for notification within the next 30 minutes.
   */
  async getMedicationsDueForNotification() {
    const currentTime = new Date();
    const thirtyMinutesLater = new Date(currentTime.getTime() + 30 * 60 * 1000);

    const medicationsDue = await MedicationItem.findAll({
      where: {
        status: "due", // Medications due for administration
        start_date: { [Op.lte]: currentTime }, // Active start date
        end_date: { [Op.or]: [{ [Op.gte]: currentTime }, { [Op.is]: null }] }, // Valid end date or ongoing
        schedule: { [Op.ne]: null }, // Ensure schedule exists
      },
      include: [
        {
          model: db.MedicationPlan, // Direct relationship with MedicationPlan
          include: [
            {
              model: db.Patient, // Direct relationship with Patient via MedicationPlan
              attributes: ["id", "first_name", "last_name"],
            },
          ],
        },
      ],
    });

    return medicationsDue.filter((medication) => {
      const scheduleTimes = medication.schedule || [];
      return scheduleTimes.some((time) => {
        try {
          // Safer time parsing
          const [hours, minutes] = time.split(":").map(Number);
          const scheduledTime = new Date(currentTime);
          scheduledTime.setHours(hours, minutes, 0, 0);
          return scheduledTime > currentTime && scheduledTime <= thirtyMinutesLater;
        } catch (error) {
          console.error(`Error parsing schedule time: ${time}`, error);
          return false; // Skip invalid times
        }
      });
    });
  }

  /**
   * Generate notifications for medications due within 30 minutes.
   */
  async generateDueMedicationNotifications() {
    const medications = await this.getMedicationsDueForNotification();

    for (const medication of medications) {
      const patient = medication.MedicationPlan.Patient;

      try {
        const [results, metadata] = await db.sequelize.query('SELECT 1+1 AS result;');
        console.log('Database connection test result:', results[0].result); // Should print 2
    
        await Notification.create({
          nurse_id: medication.nurse_id,
          patient_id: patient.id,
          notification_type: "reminder",
          message: `Reminder: Medication ${medication.id} for patient ${patient.first_name} ${patient.last_name} is due in 30 minutes.`,
        });
      } catch (error) {
        console.error("Error creating notification:", error);
        // Consider more robust error handling (e.g., retry logic)
      }
    }
  }

  async generateSkippedMedicationNotifications() {
    try {
      const skippedMedications = await MedicationItem.findAll({
        where: {
          status: "missed", // Medications marked as missed
        },
        include: [
          {
            model: db.MedicationPlan,
            include: [
              {
                model: db.Patient,
                attributes: ["id", "first_name", "last_name"],
              },
            ],
          },
        ],
      });

      for (const medication of skippedMedications) {
        const patient = medication.MedicationPlan.Patient;
        try {
          await Notification.create({
            nurse_id: medication.nurse_id,
            patient_id: patient.id,
            notification_type: "alert",
            message: `Alert: Medication ${medication.id} for patient ${patient.first_name} ${patient.last_name} was skipped.`,
          });
        } catch (error) {
          console.error(`Error creating skipped medication notification for medication ${medication.id}:`, error);
          // Consider more robust error handling
        }
      }
    } catch (error) {
        console.error("Error fetching skipped medications:", error);
    }
  }

  async getNotificationsForNurse(nurseId) {
    try {
      return await Notification.findAll({
        where: { nurse_id: nurseId },
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      console.error(`Error fetching notifications for nurse ${nurseId}:`, error);
      return []; // Or throw the error, depending on your error handling strategy
    }
  }

  async getNotificationsForPatient(patientId) {
    try {
      return await Notification.findAll({
        where: { patient_id: patientId },
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      console.error(`Error fetching notifications for patient ${patientId}:`, error);
      return []; // Or throw the error
    }
  }

  async markNotificationAsRead(id) {
    try {
      const notification = await Notification.findByPk(id);
      if (!notification) {
        throw new Error("Notification not found."); // Throw error if not found
      }
      return await notification.update({ is_read: true });
    } catch (error) {
      console.error(`Error marking notification ${id} as read:`, error);
      throw error; // Re-throw the error after logging
    }
  }

  async deleteNotification(id) {
    try {
      const notification = await Notification.findByPk(id);
      if (!notification) {
        throw new Error("Notification not found."); // Throw error if not found
      }
      await notification.destroy();
      return { message: "Notification deleted successfully." };
    } catch (error) {
      console.error(`Error deleting notification ${id}:`, error);
      throw error; // Re-throw the error after logging
    }
  }

}

module.exports = new NotificationJobService();



// const db = require("../models");

// const Op = db.Op;
// const MedicationItem = db.MedicationItem;
// const Notification = db.Notification;
// const Patient = db.Patient;

// class NotificationService {

//   async getMedicationsDueForNotification() {
//     const currentTime = new Date();
//     const thirtyMinutesLater = new Date(currentTime.getTime() + 30 * 60 * 1000);

//     // Query medications due in the next 30 minutes
//     const medicationsDue = await MedicationItem.findAll({
//       where: {
//         status: "due", // Only fetch medications with status 'due'
//         start_date: { [Op.lte]: currentTime }, // Start date <= current time
//         end_date: { [Op.is]: null }, // Only include medications with null end date (ongoing)
//         schedule: {
//           [Op.ne]: null, // Ensure schedule exists
//         },
//       },
//       include: [
//         {
//           model: db.Patient,
//           attributes: ["id", "first_name", "last_name"],
//         },
//         {
//           model: db.User,
//           as: "nurse",
//           attributes: ["id", "first_name", "last_name"],
//         },
//       ],
//     });

//     // Filter medications with schedules within the next 30 minutes
//     const filteredMedications = medicationsDue.filter((medication) => {
//       const scheduleTimes = medication.schedule; // Array of schedule times

//       return scheduleTimes.some((time) => {
//         try {
//           // Construct full scheduled time. This is safer than string concat.
//           const [hours, minutes] = time.split(":").map(Number);
//           const scheduledTime = new Date(currentTime);
//           scheduledTime.setHours(hours, minutes, 0, 0);

//           return (
//             scheduledTime > currentTime && scheduledTime <= thirtyMinutesLater
//           );
//         } catch (error) {
//           console.error(`Error parsing schedule time: ${time}`, error);
//           return false; // Skip invalid times
//         }
//       });
//     });

//     return filteredMedications;
//   }

//   async generateDueMedicationNotifications() {
//     const medications = await this.getMedicationsDueForNotification();

//     // Generate notifications for each due medication
//     for (const medication of medications) {
//       try {
//         await Notification.create({
//           nurse_id: medication.nurse_id, // Assigned nurse
//           patient_id: medication.patient_id,
//           notification_type: "reminder",
//           message: `Reminder: Medication ${medication.id} for patient ${medication.Patient.first_name} ${medication.Patient.last_name} is due in 30 minutes.`,
//         });
//       } catch (error) {
//         console.error(
//           `Error creating notification for medication ${medication.id}`,
//           error
//         );
//         // ToDo: Consider adding error handling/logging here, perhaps retry logic or a dead-letter queue
//       }
//     }
//   }
//   async getNotificationsForNurse(nurseId) {
//     return await db.Notification.findAll({
//       where: { nurse_id: nurseId },
//       order: [["createdAt", "DESC"]],
//     });
//   }

//   async getNotificationsForPatient(patientId) {
//     return await db.Notification.findAll({
//       where: { patient_id: patientId },
//       order: [["createdAt", "DESC"]],
//     });
//   }

//   async markNotificationAsRead(id) {
//     const notification = await db.Notification.findByPk(id);
//     if (!notification) {
//       throw new Error("Notification not found.");
//     }
//     return await notification.update({ is_read: true });
//   }

//   async deleteNotification(id) {
//     const notification = await db.Notification.findByPk(id);
//     if (!notification) {
//       throw new Error("Notification not found.");
//     }
//     await notification.destroy();
//     return { message: "Notification deleted successfully." };
//   }
