const cron = require("node-cron");
const NotificationService = require("../services/notificationService");


// Run every 5 minute to check for due medications
cron.schedule("*/20 * * * *", async () => { 
  try {
    await NotificationService.processDueMedications();
  } catch (error) {
    console.error("Error generating notifications:", error.message);
    return [];
  }
});

// Runs every 5 minutes to check for missed medications
cron.schedule("*/20 * * * *", async () => { 
  try {
    await NotificationService.processMissedMedications();
  } catch (error) {
    console.error("Error generating notifications:", error.message);
  }
});
