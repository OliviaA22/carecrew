import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/ui/layout/PageLayout";
import { useAuth } from "../../pages/LogIn/AuthContext";
import useFetchPatients from "../../data/useFetchPatients";
import { useQueryClient } from "@tanstack/react-query";
import { Patient, MedicationPlan } from "../../data/Types";

const PatientList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { userData } = useAuth();
  const { patients, loading, error } = useFetchPatients(userData);
  const queryClient = useQueryClient();

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) =>
      `${patient.first_name} ${patient.last_name}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [patients, searchQuery]);

  const getNextMedication = (patient: Patient) => {
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

  const handlePatientClick = (patient: Patient) => {
    const medicationPlanId = patient.medication_plans[0]?.id;
    navigate(`/details/${patient.id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <PageLayout text="Patient List">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Patient List</h1>
        </div>

        <div className="input-box">
          <input
            type="search"
            name="search-form"
            id="search-form"
            className="search-input w-full p-2 border rounded"
            placeholder="Search patients"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ward
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date of Birth
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admission Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Medication
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => {
                const nextMed = getNextMedication(patient);
                return (
                  <tr
                    key={patient.id}
                    onClick={() => handlePatientClick(patient)}
                    className="hover:bg-gray-100 hover:bg-opacity-50 cursor-pointer transition-colors duration-200 ease-in-out"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">{`${patient.first_name} ${patient.last_name}`}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{`${patient.ward_id}`}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {patient.room_no}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(patient.date_of_birth).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(patient.admission_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {nextMed
                        ? `${nextMed.scheduled_time} - ${nextMed.medication.name} ${nextMed.dose}`
                        : "No upcoming medication"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
};

export default PatientList;
