import React from "react";
import { MedicationItem, MedicationPlan } from "../../../data/Types";

interface MedicationHistoryProps {
  medicationPlans: MedicationPlan[];
}

const MedicationHistory: React.FC<MedicationHistoryProps> = ({
  medicationPlans,
}) => {
  const renderMedicationHistoryTable = (medications: MedicationItem[]) => (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-3 text-left font-semibold">Medication</th>
          <th className="p-3 text-left font-semibold">Dose</th>
          <th className="p-3 text-left font-semibold">Frequency</th>
          <th className="p-3 text-left font-semibold">Route</th>
          <th className="p-3 text-left font-semibold">Time</th>
          <th className="p-3 text-left font-semibold">Date</th>
          <th className="p-3 text-left font-semibold">Administered by</th>
        </tr>
      </thead>
      <tbody>
        {medications.map((item: MedicationItem) => (
          <tr key={item.id} className="border-b hover:bg-gray-50">
            <td className="p-3">{item.medication.name}</td>
            <td className="p-3">{item.dose}</td>
            <td className="p-3">{item.frequency}</td>
            <td className="p-3">{item.route_of_administration}</td>
            <td className="p-3">
              {new Date(item.time_administered).toLocaleTimeString()}
            </td>
            <td className="p-3">
              {new Date(item.time_administered).toLocaleDateString()}
            </td>
            <td className="p-3">{item.administered_by}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">
        Medication History
      </h2>
      {medicationPlans.map((plan) => {
        const completedMedications = plan.medication_items.filter(
          (item) => item.status === "completed"
        );
        return (
          <div key={plan.id} className="mb-6">
            <h3 className="text-xl font-medium mb-2">{plan.name}</h3>
            <div className="overflow-x-auto">
              {completedMedications.length > 0 ? (
                renderMedicationHistoryTable(completedMedications)
              ) : (
                <p>No completed medications.</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MedicationHistory;
