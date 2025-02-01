import React, { useState, useEffect } from "react";
import PageLayout from "../../components/ui/layout/PageLayout";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axios/Axios";
import { MedicationPlan, MedicationItem, Patient } from "../../data/Types";
import MedicationSchedule from "../../components/ui/tables/MedicationSchedule";
import MedicationHistory from "../../components/ui/tables/MedicationHistory";

const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const patientResponse = await axiosInstance.get(`/api/patients/${id}`);
        setPatient(patientResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading)
    return (
      <PageLayout text="Patient Details">
        <div>Loading patient data...</div>
      </PageLayout>
    );
  if (error)
    return (
      <PageLayout text="Patient Details">
        <div>{error}</div>
      </PageLayout>
    );
  if (!patient)
    return (
      <PageLayout text="Patient Details">
        <div>No patient data found.</div>
      </PageLayout>
    );

  return (
    <PageLayout text="Patient Details">
      <div className="bg-gray-100 min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          {patient.first_name} {patient.last_name}
        </h1>

        {/* Basic Patient Info */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            Patient Information
          </h2>
          <div className="grid grid-cols-2 gap-6 divide-x divide-gray-200">
            <div>
              <p className="mb-2">
                <span className="font-semibold">Date of Birth:</span>{" "}
                {formatDate(patient.date_of_birth)}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Medical Record Number:</span>{" "}
                {patient.medical_record_number}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Diagnosis:</span>{" "}
                {patient.diagnosis}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Room Number:</span>{" "}
                {patient.room_no}
              </p>
            </div>
            <div className="pl-6">
              <p className="mb-2">
                <span className="font-semibold">Admission Date:</span>{" "}
                {formatDate(patient.admission_date)}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Discharge Date:</span>{" "}
                {patient.discharge_date
                  ? formatDate(patient.discharge_date)
                  : "Not discharged"}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Hospital:</span>{" "}
                {patient.hospital.name}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Ward:</span> {patient.ward.name}
              </p>
            </div>
          </div>
        </div>

        {/* Patient Notes */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            Patient Notes
          </h2>
          {patient.medication_plans[0]?.additional_notes ? (
            <p>{patient.medication_plans[0].additional_notes}</p>
          ) : (
            <p>No additional notes available.</p>
          )}
        </div>

        <MedicationSchedule medicationPlans={patient.medication_plans} />
        <MedicationHistory medicationPlans={patient.medication_plans} />
      </div>
    </PageLayout>
  );
};

export default PatientDetails;
