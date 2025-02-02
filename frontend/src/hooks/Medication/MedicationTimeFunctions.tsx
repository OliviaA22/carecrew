import { Patient } from "../../data/Types";

export const isWithinTimeConstraints = (scheduledTime: string): boolean => {
  const now = new Date();
  const scheduled = new Date(`${now.toDateString()} ${scheduledTime}`);
  const timeDiff = (scheduled.getTime() - now.getTime()) / (1000 * 60); // difference in minutes
  return timeDiff > -30 && timeDiff <= 30;
};

export const getNextMedication = (patient: Patient) => {
  const now = new Date();
  let nextMedication = null;

  for (const plan of patient.medication_plans) {
    for (const item of plan.medication_items) {
      const scheduledTime = new Date(
        `${now.toDateString()} ${item.scheduled_time}`
      );
      if (item.status === "due" && scheduledTime > now) {
        if (
          !nextMedication ||
          scheduledTime <
            new Date(`${now.toDateString()} ${nextMedication.scheduled_time}`)
        ) {
          nextMedication = item;
        }
      }
    }
  }

  return nextMedication;
};
