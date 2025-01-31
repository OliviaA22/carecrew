import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/ui/layout/PageLayout";
import { useAuth } from "../../pages/LogIn/AuthContext";
import useFetchPatients from "../../data/useFetchPatients";
import { useQueryClient } from "@tanstack/react-query";

interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  room_no: string;
  date_of_birth: string;
  admission_date: string;
  next_medication_time?: string;
}

const PatientList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { userData } = useAuth();
  const { patients, loading, error } = useFetchPatients(userData);
  const queryClient = useQueryClient();

  const filteredPatients = patients.filter((patient) =>
    `${patient.first_name} ${patient.last_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handlePatientClick = (patientId: number) => {
    navigate(`/details/${patientId}`);
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
              {filteredPatients.map((patient) => (
                <tr
                  key={patient.id}
                  onClick={() => handlePatientClick(patient.id)}
                  className="hover:bg-gray-100 hover:bg-opacity-50 cursor-pointer transition-colors duration-200 ease-in-out"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{`${patient.first_name} ${patient.last_name}`}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {patient.room_no}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(patient.date_of_birth).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(patient.admission_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{"N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
};

export default PatientList;
