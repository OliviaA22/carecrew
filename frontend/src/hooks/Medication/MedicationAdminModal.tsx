import React, { useState } from "react";
import { MedicationItem, Patient } from "../../data/Types";

interface MedicationAdminModalProps {
  medication: MedicationItem;
  patient: Patient;
  canOnlyMarkNotGiven: boolean;
  onClose: () => void;
  onConfirm: (status: string, reason: string) => void;
}

const MedicationAdminModal: React.FC<MedicationAdminModalProps> = ({
  medication,
  patient,
  canOnlyMarkNotGiven,
  onClose,
  onConfirm,
}) => {
  const [administrationStatus, setAdministrationStatus] = useState("");
  const [reason, setReason] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const handleConfirm = () => {
    if (administrationStatus === "not-given" && !reason) {
      setValidationMessage(
        "Please select a reason for not giving the medication."
      );
      return;
    }
    setValidationMessage("");
    onConfirm(administrationStatus, reason);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">
          Medication Administration for {patient.first_name} {patient.last_name}{" "}
          (room {patient.room_no})
        </h2>
        <div className="mb-4">
          <p>
            <strong>Medication:</strong> {medication.medication.name}
          </p>
          <p>
            <strong>Dose:</strong> {medication.dose}
          </p>
          <p>
            <strong>Route:</strong> {medication.route_of_administration}
          </p>
          <p>
            <strong>Time:</strong> {medication.scheduled_time}
          </p>
          <p>
            <strong>Instructions:</strong> {medication.instructions}
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">
            Administration Status:
          </label>
          <div className="flex justify-around">
            {!canOnlyMarkNotGiven && (
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-6 w-6 text-green-600"
                  name="status"
                  value="given"
                  onChange={() => setAdministrationStatus("given")}
                />
                <span className="ml-2 text-lg">Given</span>
              </label>
            )}
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-6 w-6 text-red-600"
                name="status"
                value="not-given"
                onChange={() => setAdministrationStatus("not-given")}
              />
              <span className="ml-2 text-lg">Not Given</span>
            </label>
          </div>
        </div>
        {administrationStatus === "not-given" && (
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Reason:</label>
            <select
              className="w-full p-2 border rounded"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="">Select a reason</option>
              <option value="Operation">Operation</option>
              <option value="Refused">Refused</option>
              <option value="Nausea">Nausea</option>
              <option value="Other">Other</option>
            </select>
            {reason === "Other" && (
              <textarea
                className="w-full p-2 border rounded mt-2"
                placeholder="Please specify the reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            )}
          </div>
        )}
        {validationMessage && (
          <p className="text-red-500 mb-4">{validationMessage}</p>
        )}
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            onClick={handleConfirm}
            disabled={
              !administrationStatus ||
              (administrationStatus === "not-given" &&
                reason === "Select a reason")
            }
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicationAdminModal;
