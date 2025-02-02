import React from "react";
import { MedicationItem, Patient } from "../../data/Types";

interface MedicationConfirmationProps {
  medication: MedicationItem;
  patient: Patient;
  status: string;
  reason: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const MedicationConfirmation: React.FC<MedicationConfirmationProps> = ({
  medication,
  patient,
  status,
  reason,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">
          Confirm Medication Administration
        </h2>
        <p>
          <strong>Patient:</strong> {patient.first_name} {patient.last_name}
        </p>
        <p>
          <strong>Medication:</strong> {medication.medication.name}
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>
        {status === "skipped" && (
          <p>
            <strong>Reason:</strong> {reason}
          </p>
        )}
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicationConfirmation;
