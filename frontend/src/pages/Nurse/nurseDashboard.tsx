import React, { useState, useEffect } from "react";
import PageLayout from "../../components/ui/layout/PageLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios/Axios";
import { useAuth } from "../../pages/LogIn/AuthContext"; // Adjust the import path as needed
import axios from "axios";

interface Patient {
  id: number;
  name: string;
  room: string;
  nextMedicationTime: string;
}

const NurseDashboard: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { userData } = useAuth();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        if (userData?.ward_id) {
          const response = await axiosInstance.get(
            `/api/patients/ward/${userData.ward_id}`
          );
          setPatients(response.data);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error("Axios error:", err.response?.data);
          setError(
            `Failed to fetch patients: ${
              err.response?.data?.message || err.message
            }`
          );
        } else {
          console.error("Unknown error:", err);
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [userData]);

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(selectedPatient === patient ? null : patient);
  };

  const navigateToDetails = () => {
    if (selectedPatient) {
      navigate("/details", { state: { patient: selectedPatient } });
    }
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

        {/* Patient List */}
        <div className="flex flex-col w-1/2 bg-blue-50 p-4 rounded-3xl overflow-auto">
          <h1 className="font-semibold text-xl mb-4">
            Upcoming Medication Administration
          </h1>
          <div className="flex flex-col gap-2">
            {patients.map((patient) => (
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
                  <h2
                    className={`font-medium ${
                      selectedPatient === patient ? "text-blue-900" : ""
                    }`}
                  >
                    {patient.name}
                  </h2>
                  <span
                    className={`text-sm ${
                      selectedPatient === patient
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    Room {patient.room}
                  </span>
                </div>
                <div
                  className={`text-gray-600 ${
                    selectedPatient === patient ? "text-blue-700" : ""
                  }`}
                >
                  {patient.nextMedicationTime}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* You can add more sections here as needed */}
      </div>
    </PageLayout>
  );
};

export default NurseDashboard;
