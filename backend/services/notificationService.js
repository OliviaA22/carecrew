

const db = require("../models");
const { Op } = require("sequelize");
const MedicationItem = db.MedicationItem;

const MedicationPlan = db.MedicationPlan;
const Notification = db.Notification;
const Patient = db.Patient;

class NotificationJobService {
  
  /**
   * Generate notifications for due medications in all wards.
   */
  // async generateNotificationsForWards() {
  //   console.log("Generating notifications...");
  
  //   try {
  //     // Query for due medications
  //     const dueMedications = await db.MedicationItem.findAll({
  //       where: { status: "due" },
  //       include: [
  //         {
  //           model: db.MedicationPlan,
  //           attributes: ["id", "patient_id"],
  //           required: true,
  //           include: [
  //             {
  //               model: db.Patient,
  //               attributes: ["id", "first_name", "last_name", "ward_id"],
  //               required: true,
  //             },
  //           ],
  //         },
  //       ],
  //     });
  
  //     console.log(`Found ${dueMedications.length} due medications.`);
  //     console.log("Due Medications Raw Data:", JSON.stringify(dueMedications, null, 2));
  
  //     // Loop through medications to create notifications
  //     for (const medication of dueMedications) {
  //       const medicationPlan = medication.medication_plan; // FIXED: use lowercase
  //       if (!medicationPlan) {
  //         console.error(`Skipping medication ID ${medication.id}: No associated MedicationPlan.`);
  //         continue;
  //       }
  
  //       const patient = medicationPlan.patient; // FIXED: use lowercase
  //       if (!patient) {
  //         console.error(`Skipping medication ID ${medication.id}: No associated Patient.`);
  //         continue;
  //       }
  
  //       console.log(`Processing medication ID ${medication.id} for patient ${patient.first_name} ${patient.last_name}.`);
  
  //       const message = `Medication "${medication.medication_id}" is due for patient "${patient.first_name} ${patient.last_name}".`;
  
  //       // Create notification
  //       try {
  //         await db.Notification.create({
  //           patient_id: patient.id,
  //           ward_id: patient.ward_id,
  //           notification_type: "reminder",
  //           message,
  //           is_read: false,
  //         });
  //         console.log(`Notification created successfully for patient ID: ${patient.id}, medication ID: ${medication.id}`);
  //       } catch (error) {
  //         console.error(`Error creating notification for patient ID ${patient.id}: ${error.message}`);
  //       }
  //     }
  //   } catch (error) {
  //     console.error(`Error generating notifications: ${error.message}`);
  //   }
  // }

  // async generateNotificationsForWards() {
  //   console.log("Generating notifications...");
  
  //   try {
  //     const now = new Date();
  //     const currentTime = now.toISOString().split("T")[1].slice(0, 5); // Current time in HH:mm
  //     const endTime = new Date(now.getTime() + 30 * 60 * 1000) // 30 minutes from now
  //       .toISOString()
  //       .split("T")[1]
  //       .slice(0, 5); // End time in HH:mm
  
  //     console.log(`Fetching medications scheduled between ${currentTime} and ${endTime}`);
  
  //     // Query for due medications within the next 30 minutes
  //     const dueMedications = await db.MedicationItem.findAll({
  //       where: {
  //         status: "due",
  //         [Op.or]: [
  //           // Check if the current time exists in the schedule array
  //           db.Sequelize.literal(
  //             `JSON_CONTAINS(schedule, JSON_QUOTE("${currentTime}"))`
  //           ),
  //           // Check if any time in the schedule is between `currentTime` and `endTime`
  //           db.Sequelize.literal(
  //             `EXISTS (
  //               SELECT schedule_time
  //               FROM JSON_TABLE(
  //                 schedule,
  //                 '$[*]' COLUMNS (schedule_time VARCHAR(5) PATH '$')
  //               ) AS jt
  //               WHERE schedule_time >= "${currentTime}" AND schedule_time <= "${endTime}"
  //             )`
  //           ),
  //         ],
  //       },
  //       include: [
  //         {
  //           model: db.MedicationPlan,
  //           attributes: ["id", "patient_id"],
  //           required: true,
  //           include: [
  //             {
  //               model: db.Patient,
  //               attributes: ["id", "first_name", "last_name", "ward_id"],
  //               required: true,
  //             },
  //           ],
  //         },
  //       ],
  //     });
  
  //     console.log(`Found ${dueMedications.length} due medications.`);
  //     console.log("Due Medications Raw Data:", JSON.stringify(dueMedications, null, 2));
  
  //     // Process medications and create notifications
  //     for (const medication of dueMedications) {
  //       const medicationPlan = medication.medication_plan; // Access MedicationPlan
  //       const patient = medicationPlan.patient; // Access Patient
  
  //       console.log(`Processing medication ID ${medication.id} for patient ${patient.first_name} ${patient.last_name}.`);
  
  //       const message = `Medication "${medication.medication_id}" is due for patient "${patient.first_name} ${patient.last_name}".`;
  
  //       // Create notification
  //       try {
  //         await db.Notification.create({
  //           patient_id: patient.id,
  //           ward_id: patient.ward_id,
  //           notification_type: "reminder",
  //           message,
  //           is_read: false,
  //         });
  //         console.log(`Notification created successfully for patient ID: ${patient.id}, medication ID: ${medication.id}`);
  //       } catch (error) {
  //         console.error(`Error creating notification for patient ID ${patient.id}: ${error.message}`);
  //       }
  //     }
  //   } catch (error) {
  //     console.error(`Error generating notifications: ${error.message}`);
  //   }
  // }
  
/**
   * Fetch medications that are due within the next 30 minutes.
   * @returns {Promise<Array>} List of due medications.
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
          // Exact match in JSON schedule
          db.Sequelize.literal(`JSON_CONTAINS(schedule, JSON_QUOTE("${currentTime}"))`),
          // Check if any time in the schedule falls within the next 30 minutes
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
              attributes: ["id", "first_name", "last_name", "ward_id"],
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

/**
 * Process due medications and create notifications.
 */
async processMedicationsForNotifications() {
  console.log("Generating notifications...");

  try {
    const dueMedications = await this.fetchDueMedications();
    if (dueMedications.length === 0) {
      console.log("No due medications found within the time range.");
      return;
    }

    for (const medication of dueMedications) {
      const medicationPlan = medication.medication_plan;
      const patient = medicationPlan.patient;

      const message = `Medication "${medication.medication_id}" is due for patient "${patient.first_name} ${patient.last_name}".`;

      // Create notification
      await Notification.create({
        patient_id: patient.id,
        ward_id: patient.ward_id,
        notification_type: "reminder",
        message,
        is_read: false,
      });

      console.log(`Notification created for patient ID: ${patient.id}, medication ID: ${medication.id}`);
    }
  } catch (error) {
    console.error(`Error processing notifications: ${error.message}`);
  }
}

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
        attributes: ["id", "first_name", "last_name"],
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

  
  // async generateSkippedMedicationNotifications() {
  //   try {
  //     const skippedMedications = await MedicationItem.findAll({
  //       where: {
  //         status: "missed", // Medications marked as missed
  //       },
  //       include: [
  //         {
  //           model: MedicationPlan,
  //           include: [
  //             {
  //               model: Patient,
  //               attributes: ["id", "first_name", "last_name"],
  //             },
  //           ],
  //         },
  //       ],
  //     });

  //     for (const medication of skippedMedications) {
  //       const patient = medication.MedicationPlan.Patient;
  //       try {
  //         await Notification.create({
  //           nurse_id: medication.nurse_id,
  //           patient_id: patient.id,
  //           notification_type: "alert",
  //           message: `Alert: Medication ${medication.id} for patient ${patient.first_name} ${patient.last_name} was skipped.`,
  //         });
  //       } catch (error) {
  //         console.error(`Error creating skipped medication notification for medication ${medication.id}:`, error);
  //         // Consider more robust error handling
  //       }
  //     }
  //   } catch (error) {
  //       console.error("Error fetching skipped medications:", error);
  //   }
  // }

}

module.exports = new NotificationJobService();
