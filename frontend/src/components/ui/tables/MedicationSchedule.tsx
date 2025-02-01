import React from "react";
import { MedicationItem, MedicationPlan } from "../../../data/Types";

interface MedicationScheduleProps {
  medicationPlans: MedicationPlan[];
}

const MedicationSchedule: React.FC<MedicationScheduleProps> = ({
  medicationPlans,
}) => {
  const groupAndFilterMedications = (
    medications: MedicationItem[],
    status: string
  ) => {
    return medications
      .filter((item) => item.status === status)
      .reduce<Record<string, MedicationItem>>((acc, item) => {
        if (!acc[item.medication.name]) {
          acc[item.medication.name] = item;
        }
        return acc;
      }, {});
  };

  const renderMedicationScheduleTable = (
    medications: Record<string, MedicationItem>
  ) => (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-3 text-left font-semibold">Medication</th>
          <th className="p-3 text-left font-semibold">Dose</th>
          <th className="p-3 text-left font-semibold">Frequency</th>
          <th className="p-3 text-left font-semibold">Route</th>
          <th className="p-3 text-left font-semibold">Next Administration</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(medications).map((item: MedicationItem) => (
          <tr key={item.id} className="border-b hover:bg-gray-50">
            <td className="p-3">{item.medication.name}</td>
            <td className="p-3">{item.dose}</td>
            <td className="p-3">{item.frequency}</td>
            <td className="p-3">{item.route_of_administration}</td>
            <td className="p-3">{item.scheduled_time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">
        Medication Schedule
      </h2>
      {medicationPlans.map((plan) => {
        const dueMedications = groupAndFilterMedications(
          plan.medication_items,
          "due"
        );
        return (
          <div key={plan.id} className="mb-6">
            <h3 className="text-xl font-medium mb-2">{plan.name}</h3>
            <p className="mb-4">
              <span className="font-semibold">From:</span> {plan.valid_from}{" "}
              <span className="font-semibold ml-4">To:</span> {plan.valid_until}
            </p>
            <div className="overflow-x-auto">
              {Object.keys(dueMedications).length > 0 ? (
                renderMedicationScheduleTable(dueMedications)
              ) : (
                <p>No due medications.</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MedicationSchedule;
