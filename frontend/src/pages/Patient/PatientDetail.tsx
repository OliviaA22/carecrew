import React from "react";
import PageLayout from "../../components/ui/layout/PageLayout";
import { AiOutlineFullscreen } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  room_no: number;
  admission_date: string;
  medical_record_number: string;
  medication_plans: {
    medication_name: string;
    dosage: string;
    frequency: string;
  }[];
}

const PatientDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  // Get patient data from location state
  const patient = location.state?.patient;

  // If no patient data is found, you could fetch it here using the id
  React.useEffect(() => {
    if (!patient && id) {
      // Fetch patient data using id
      // Example: fetchPatientData(id).then(data => setPatient(data));
    }
  }, [patient, id]);

  // If no patient data is found, handle accordingly
  if (!patient) {
    return (
      <PageLayout text="Patient Details">
        <div>Loading patient data...</div>
      </PageLayout>
    );
  }

  return (
    <PageLayout text="Patient Details">
      <div className="p-6 space-y-6">
        {/* Patient Base Data */}
        <div className="bg-blue-50 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Patient Information</h2>
          <p>
            <strong>Name:</strong> {patient.first_name} {patient.last_name}
          </p>
          <p>
            <strong>Room:</strong> {patient.room_no}
          </p>
          <p>
            <strong>Medical Record Number:</strong>{" "}
            {patient.medical_record_number}
          </p>
          <p>
            <strong>Admission Date:</strong>{" "}
            {new Date(patient.admission_date).toLocaleDateString()}
          </p>
        </div>

        {/* Medication Plans */}
        <div className="bg-blue-50 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Medication Plans</h2>
          {patient.medication_plans.map(
            (
              plan: {
                medication_name: string;
                dosage: string;
                frequency: string;
              },
              index: number
            ) => (
              <div key={index} className="mt-4 p-2 bg-white rounded">
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

        {/* Navigation Button */}
        <div className="flex justify-end">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            Back
            <AiOutlineFullscreen className="ml-2" />
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default PatientDetails;
