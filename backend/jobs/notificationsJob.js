const cron = require("node-cron");
const NotificationService = require("../services/notificationJobService");

// Generate notifications for medications due within 30 minutes
cron.schedule("*/5 * * * *", async () => {
  console.log("Running job: Generate due medication notifications");
  try {
    await NotificationService.generateDueMedicationNotifications();
    console.log("Due medication notifications sent successfully.");
  } catch (error) {
    console.error(
      "Error generating due medication notifications:",
      error.message
    );
  }
});

// Generate notifications for skipped medications
cron.schedule("*/10 * * * *", async () => {
  console.log("Running job: Generate skipped medication notifications");
  try {
    await NotificationService.generateSkippedMedicationNotifications();
    console.log("Skipped medication notifications sent successfully.");
  } catch (error) {
    console.error(
      "Error generating skipped medication notifications:",
      error.message
    );
  }
});
