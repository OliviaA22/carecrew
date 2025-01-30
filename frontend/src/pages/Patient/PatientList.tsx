import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/ui/layout/PageLayout";

interface Patient {
  id: string;
  name: string;
  room: string;
  age: number;
}

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch patients data from API
    // This is a placeholder. Replace with actual API call
    const fetchPatients = async () => {
      const response = await fetch("/api/patients");
      const data = await response.json();
      setPatients(data);
    };

    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePatientClick = (patientId: string) => {
    navigate(`/patient/${patientId}`);
  };

  const handleAddNewPatient = () => {
    navigate("/add-patient");
  };

  return (
    <PageLayout text="Patient List">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Patient List</h1>
          <button
            onClick={handleAddNewPatient}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add New Patient
          </button>
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

        <div className="bg-blue-50 p-4 rounded-lg shadow-md">
          {filteredPatients.map((patient) => (
            <button
              key={patient.id}
              onClick={() => handlePatientClick(patient.id)}
              className="w-full mb-2 p-2 border-b text-left hover:bg-blue-100 transition-colors"
            >
              <h3 className="font-semibold">{patient.name}</h3>
              <p>Room: {patient.room}</p>
              <p>Age: {patient.age}</p>
            </button>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default PatientList;
