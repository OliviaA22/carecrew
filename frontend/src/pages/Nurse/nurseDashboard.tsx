import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/ui/layout/PageLayout";
import { useAuth } from "../../pages/LogIn/AuthContext";
import useFetchPatients from "../../data/useFetchPatients";
import { Patient, MedicationItem } from "../../data/Types";
import { getNextMedication } from "../../hooks/Medication/MedicationTimeFunctions";
import MedicationSchedule from "../../components/ui/tables/MedicationSchedule";
import MedicationAdminModal from "../../hooks/Medication/MedicationAdminModal";
import MedicationConfirmation from "../../hooks/Medication/MedicationConfirmation";
import { usePostMedicationAdministration } from "../../data/usePostMedicationAdministration";
import { useNotifications } from "../../hooks/Notifications/NotificationProvider";

const NurseDashboard: React.FC = () => {
  const { notifications, markAsRead } = useNotifications();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedMedication, setSelectedMedication] =
    useState<MedicationItem | null>(null);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [administrationStatus, setAdministrationStatus] = useState("");
  const [administrationReason, setAdministrationReason] = useState("");
  const navigate = useNavigate();
  const { userData } = useAuth();
  const { patients, loading, error } = useFetchPatients(userData);
  const { postMedicationAdministration } = usePostMedicationAdministration();

  const sortedPatients = useMemo(() => {
    return patients.sort((a, b) => {
      const aNextMed = getNextMedication(a);
      const bNextMed = getNextMedication(b);
      if (!aNextMed && !bNextMed) return 0;
      if (!aNextMed) return 1;
      if (!bNextMed) return -1;
      return aNextMed.scheduled_time.localeCompare(bNextMed.scheduled_time);
    });
  }, [patients]);

  const unreadNotifications = useMemo(() => {
    return notifications.filter((notification) => !notification.is_read);
  }, [notifications]);

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(selectedPatient === patient ? null : patient);
  };

  const handleAdminister = (medication: MedicationItem, patient: Patient) => {
    setSelectedMedication(medication);
    setSelectedPatient(patient);
    setShowAdminModal(true);
  };

  const handleAdminConfirm = (status: string, reason: string) => {
    setAdministrationStatus(status);
    setAdministrationReason(reason);
    setShowAdminModal(false);
    setShowConfirmationModal(true);
  };

  const handleConfirmationComplete = async () => {
    if (!selectedMedication || !selectedPatient) return;

    try {
      await postMedicationAdministration({
        medication: selectedMedication,
        patient: selectedPatient,
        status: administrationStatus,
        reason: administrationReason,
      });

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
              {sortedPatients.length > 0 ? (
                sortedPatients.map((patient) => {
                  const nextMed = getNextMedication(patient);
                  return (
                    <div
                      key={patient.id}
                      className={`flex flex-col border-b border-blue-100 py-2 
                      transition-colors duration-200 w-full text-left focus:outline-big 
                      focus:ring-2 focus:ring-red-800 rounded-lg
                      ${
                        selectedPatient === patient
                          ? "bg-red-200 text-red-800"
                          : "hover:bg-red-100"
                      }`}
                    >
                      <div
                        className="flex flex-row items-center justify-between cursor-pointer"
                        onClick={() => handlePatientSelect(patient)}
                      >
                        <div className="flex flex-col">
                          <h2 className="font-medium">{`${patient.first_name} ${patient.last_name}`}</h2>
                          <span className="text-sm text-gray-500">
                            Room {patient.room_no}
                          </span>
                        </div>
                        <div className="text-gray-600">
                          {nextMed
                            ? `${nextMed.scheduled_time} - ${nextMed.medication.name} ${nextMed.dose}`
                            : "No upcoming medication"}
                        </div>
                      </div>
                      {nextMed && (
                        <div className="mt-2 text-right">
                          <button
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() => handleAdminister(nextMed, patient)}
                          >
                            Administer
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <p>No patients found</p>
              )}
            </div>
          </div>

          {/* Patient Detail or Notification List */}
          <div className="w-1/2 bg-blue-50 p-4 rounded-3xl overflow-auto">
            {selectedPatient ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-xl">Patient Details</h2>
                  <button
                    onClick={() => navigate(`/details/${selectedPatient.id}`)}
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
                    <strong>Ward ID:</strong> {selectedPatient.ward_id}
                  </p>
                  <p>
                    <strong>Room:</strong> {selectedPatient.room_no}
                  </p>
                  <p>
                    <strong>Diagnosis:</strong> {selectedPatient.diagnosis}
                  </p>
                  <p>
                    <strong>Medical Record Number:</strong>{" "}
                    {selectedPatient.medical_record_number}
                  </p>
                  <p>
                    <strong>Admission Date:</strong>{" "}
                    {selectedPatient.admission_date}
                  </p>
                </div>
                <MedicationSchedule
                  medicationPlans={selectedPatient.medication_plans}
                  patient={selectedPatient}
                />
              </>
            ) : (
              <>
                <h2 className="font-semibold text-xl mb-4">
                  Unread Notifications
                </h2>
                <div className="flex flex-col gap-2">
                  {unreadNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-center justify-between p-2 border-b"
                    >
                      <span>{notification.message}</span>
                      <input
                        type="checkbox"
                        onChange={() => markAsRead(notification.id)}
                        className="ml-2"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {showAdminModal && selectedMedication && selectedPatient && (
        <MedicationAdminModal
          medication={selectedMedication}
          patient={selectedPatient}
          canOnlyMarkNotGiven={false}
          onClose={() => setShowAdminModal(false)}
          onConfirm={handleAdminConfirm}
        />
      )}

      {showConfirmationModal && selectedMedication && selectedPatient && (
        <MedicationConfirmation
          medication={selectedMedication}
          patient={selectedPatient}
          status={administrationStatus}
          reason={administrationReason}
          onConfirm={handleConfirmationComplete}
          onCancel={() => setShowConfirmationModal(false)}
        />
      )}
    </PageLayout>
  );
};

export default NurseDashboard;
