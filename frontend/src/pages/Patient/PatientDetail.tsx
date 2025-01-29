import React from "react";
import PageLayout from "../../components/ui/layout/PageLayout";
import { AiOutlineFullscreen } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";

// Define the Patient interface
interface Patient {
  id: string;
  name: string;
  room: string;
  age: number;
  medicationPlan: string[];
  medicationSchedule: { time: string; medication: string }[];
  notes: string[];
  history: string[];
}

const PatientDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get patient data from location state
  const patient = location.state?.patient;

  // If no patient data is found, handle accordingly
  if (!patient) {
    return <div>No patient data found</div>; // You can redirect or show an error message here
  }

  return (
    <PageLayout text="Patient Details">
      <div className="p-6 space-y-6">
        {/* Patient Base Data */}
        <div className="bg-blue-50 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Patient Information</h2>
          <p>
            <strong>Name:</strong> {patient.name}
          </p>
          <p>
            <strong>Room:</strong> {patient.room}
          </p>
          <p>
            <strong>Age:</strong> {patient.age}
          </p>
        </div>

        {/* Medication Plan */}
        <div className="bg-blue-50 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Medication Plan</h2>
          <ul className="list-disc pl-5">
            {patient.medicationPlan.map(
              (
                medication:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | null
                  | undefined,
                index: React.Key | null | undefined
              ) => (
                <li key={index}>{medication}</li>
              )
            )}
          </ul>
        </div>

        {/* Medication Schedule */}
        <div className="bg-blue-50 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Medication Schedule</h2>
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2">Time</th>
                <th className="border px-4 py-2">Medication</th>
              </tr>
            </thead>
            <tbody>
              {patient.medicationSchedule.map(
                (
                  item: {
                    time:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                    medication:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                  },
                  index: React.Key | null | undefined
                ) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{item.time}</td>
                    <td className="border px-4 py-2">{item.medication}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Notes */}
        <div className="bg-blue-50 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Notes</h2>
          <ul className="list-disc pl-5">
            {patient.notes.map(
              (
                note:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | null
                  | undefined,
                index: React.Key | null | undefined
              ) => (
                <li key={index}>{note}</li>
              )
            )}
          </ul>
        </div>

        {/* History */}
        <div className="bg-blue-50 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">History</h2>
          <ul className="list-disc pl-5">
            {patient.history.map(
              (
                historyItem:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | null
                  | undefined,
                index: React.Key | null | undefined
              ) => (
                <li key={index}>{historyItem}</li>
              )
            )}
          </ul>
        </div>

        {/* Navigation Button */}
        <div className="flex justify-end">
          <button
            onClick={() => navigate(-1)} // Navigate back to the previous page
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
