import React, { useState } from "react";
import { MedicationItem, MedicationPlan, Patient } from "../../../data/Types";
import MedicationAdminModal from "../../../hooks/Medication/MedicationAdminModal";
import MedicationConfirmation from "../../../hooks/Medication/MedicationConfirmation";
import { useAuth } from "../../../pages/LogIn/AuthContext";
import { usePostMedicationAdministration } from "../../../data/usePostMedicationAdministration";

interface MedicationScheduleProps {
  medicationPlans: MedicationPlan[];
  patient: Patient;
}

const MedicationSchedule: React.FC<MedicationScheduleProps> = ({
  medicationPlans,
  patient,
}) => {
  const [selectedMedication, setSelectedMedication] =
    useState<MedicationItem | null>(null);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [administrationStatus, setAdministrationStatus] = useState("");
  const [administrationReason, setAdministrationReason] = useState("");
  const { userData } = useAuth();
  const { postMedicationAdministration } = usePostMedicationAdministration();

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

  const handleAdminister = (medication: MedicationItem) => {
    setSelectedMedication(medication);
    setShowAdminModal(true);
  };

  const handleAdminConfirm = (status: string, reason: string) => {
    setAdministrationStatus(status);
    setAdministrationReason(reason);
    setShowAdminModal(false);
    setShowConfirmationModal(true);
  };

  const handleConfirmationComplete = async () => {
    if (!selectedMedication || !userData) return;

    try {
      await postMedicationAdministration({
        medication: selectedMedication,
        patient: patient,
        status: administrationStatus,
        reason: administrationReason,
      });

      console.log(
        `Medication ${selectedMedication.medication.name} ${administrationStatus}. Reason: ${administrationReason}`
      );
      // Here you would typically update the medication status in your state or refetch the data
    } catch (error) {
      console.error("Error creating medication administration:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setShowConfirmationModal(false);
      setSelectedMedication(null);
      setAdministrationStatus("");
      setAdministrationReason("");
    }
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
          <th className="p-3 text-left font-semibold">Action</th>
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
            <td className="p-3">
              <button
                onClick={() => handleAdminister(item)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Administer
              </button>
            </td>
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

      {showAdminModal && selectedMedication && (
        <MedicationAdminModal
          medication={selectedMedication}
          patient={patient}
          canOnlyMarkNotGiven={false}
          onClose={() => setShowAdminModal(false)}
          onConfirm={handleAdminConfirm}
        />
      )}

      {showConfirmationModal && selectedMedication && (
        <MedicationConfirmation
          medication={selectedMedication}
          patient={patient}
          status={administrationStatus}
          reason={administrationReason}
          onConfirm={handleConfirmationComplete}
          onCancel={() => setShowConfirmationModal(false)}
        />
      )}
    </div>
  );
};

export default MedicationSchedule;
