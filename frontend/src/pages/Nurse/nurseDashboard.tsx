import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios/Axios";
import PageLayout from "../../components/ui/layout/PageLayout";
import { useAuth } from "../../pages/LogIn/AuthContext"; // Adjust the import path as needed
import useFetchPatients from "../../data/useFetchPatients";
import { Patient, MedicationPlan } from "../../data/Types";

const NurseDashboard: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const navigate = useNavigate();
  const { userData } = useAuth();
  const { patients, loading, error } = useFetchPatients(userData);

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(selectedPatient === patient ? null : patient);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <PageLayout text="Dashboard">
      <div className="h-full flex flex-col px-14 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col gap-2 mb-4">
          <h1 className="text-3xl font-semibold text-blue-500">
            Welcome Nurse {userData?.first_name || "Guest"}!
          </h1>
          <div className="flex flex-col">
            <span>
              <strong>{patients.length} patients</strong> are admitted to your
              ward currently!
            </span>
            <span>
              Don't forget to check the documentation before entering the room.
            </span>
          </div>
        </div>

        <div className="flex flex-row gap-4">
          {/* Patient List */}
          <div className="flex flex-col w-1/2 bg-blue-50 p-4 rounded-3xl overflow-auto">
            <h1 className="font-semibold text-xl mb-4">
              Upcoming Medication Administration
            </h1>
            <div className="flex flex-col gap-2">
              {patients.length > 0 ? (
                patients.map((patient) => (
                  <button
                    key={patient.id}
                    onClick={() => handlePatientSelect(patient)}
                    className={`flex flex-row items-center justify-between 
                      border-b border-blue-100 py-2 
                      transition-colors 
                      duration-200 
                      w-full 
                      text-left 
                      focus:outline-big 
                      focus:ring-2 
                      focus:ring-red-800 
                      rounded-lg
                      ${
                        selectedPatient === patient
                          ? "bg-red-200 text-red-800"
                          : "hover:bg-red-100"
                      }`}
                  >
                    <div className="flex flex-col">
                      <h2 className="font-medium">{`${patient.first_name} ${patient.last_name}`}</h2>
                      <span className="text-sm text-gray-500">
                        Room {patient.room_no}
                      </span>
                    </div>
                    <div className="text-gray-600">
                      Admitted:{" "}
                      {new Date(patient.admission_date).toLocaleDateString()}
                    </div>
                  </button>
                ))
              ) : (
                <p>No patients found</p>
              )}
            </div>
          </div>

          {/* Patient Detail Component */}
          {selectedPatient && (
            <div className="w-1/2 bg-blue-50 p-4 rounded-3xl overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-xl">Patient Details</h2>
                <button
                  onClick={() =>
                    window.open(
                      `/details/${selectedPatient.id}`,
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                  aria-label="Expand patient details"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <p>
                  <strong>Name:</strong> {selectedPatient.first_name}{" "}
                  {selectedPatient.last_name}
                </p>
                <p>
                  <strong>Room:</strong> {selectedPatient.room_no}
                </p>
                <p>
                  <strong>Medical Record Number:</strong>{" "}
                  {selectedPatient.medical_record_number}
                </p>
                <p>
                  <strong>Admission Date:</strong>{" "}
                  {new Date(
                    selectedPatient.admission_date
                  ).toLocaleDateString()}
                </p>
                <h3 className="font-semibold mt-4">Medication Plans</h3>
                {(selectedPatient.medication_plans || []).map(
                  (plan: MedicationPlan, index: number) => (
                    <div key={index} className="bg-white p-2 rounded">
                      <p>
                        <strong>Medication:</strong> {plan.medication_name}
                      </p>
                      <p>
                        <strong>Dosage:</strong> {plan.dosage}
                      </p>
                      <p>
                        <strong>Frequency:</strong> {plan.frequency}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default NurseDashboard;
