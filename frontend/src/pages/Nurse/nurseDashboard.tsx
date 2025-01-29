import React, { useState } from "react";
import PageLayout from "../../components/ui/layout/PageLayout";
import { AiOutlineFullscreen } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

interface Appointment {
  name: string;
  room: string;
  time: string;
}

const appointments: Appointment[] = [
  { name: "Muhsina Karim", room: "23", time: "12:00 PM" },
  { name: "Wagner Meyer", room: "53", time: "11:00 AM" },
  { name: "Bauer Koch", room: "40", time: "10:00 AM" },
  { name: "Fischer Wagner", room: "23", time: "1:00 PM" },
  { name: "Schneider Bauer", room: "53", time: "1:00 PM" },
  { name: "Muller Koch", room: "40", time: "11:00 AM" },
];

const NurseDashboard: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Appointment | null>(
    null
  );
  const [reminder, setReminder] = useState<string>("");
  const navigate = useNavigate();

  const handlePatientSelect = (patient: Appointment) => {
    // If already selected, deselect
    setSelectedPatient(selectedPatient === patient ? null : patient);
  };

  const navigateToDetails = () => {
    if (selectedPatient) {
      navigate("/details", {
        state: { patient: selectedPatient },
      }); // Proper navigation method
    }
  };

  return (
    <PageLayout text="Dashboard">
      <div className="h-full flex flex-col px-14 py-6 space-y-6 ">
        {/* Welcome Section */}
        <div className="flex flex-col gap-2 mb-4">
          <h1 className="text-3xl font-semibold text-blue-500">
            Welcome Nurse XX!
          </h1>
          <div className="flex flex-col">
            <span>
              <strong>XX patients </strong>are admitted to XXX currently!
            </span>
            <span>
              Don't forget to check the documentation before entering the room.
            </span>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="flex flex-row gap-6 flex-1 overflow-hidden">
          {/* Medication Administration */}
          <div className="flex flex-col w-1/2 bg-blue-50 p-4 rounded-3xl overflow-auto">
            <h1 className="font-semibold text-xl mb-4">
              Upcoming Medication Administration
            </h1>
            <div className="flex flex-col gap-2">
              {appointments.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handlePatientSelect(item)}
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
        selectedPatient === item
          ? "bg-red-200 text-red-800"
          : "hover:bg-red-100"
      }`}
                >
                  <div className="flex flex-col">
                    <h2
                      className={`font-medium ${
                        selectedPatient === item ? "text-blue-900" : ""
                      }`}
                    >
                      {item.name}
                    </h2>
                    <span
                      className={`text-sm ${
                        selectedPatient === item
                          ? "text-blue-600"
                          : item.room === "23"
                          ? "text-blue-400"
                          : item.room === "53"
                          ? "text-red-400"
                          : item.room === "40"
                          ? "text-green-300"
                          : ""
                      }`}
                    >
                      Room {item.room}
                    </span>
                  </div>
                  <div
                    className={`text-gray-600 ${
                      selectedPatient === item ? "text-blue-700" : ""
                    }`}
                  >
                    {item.time}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="flex flex-col w-1/2 bg-blue-50 p-4 rounded-3xl overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h1 className="font-semibold text-xl mb-4">
                {selectedPatient
                  ? `${selectedPatient.name}'s Details`
                  : "New Notifications"}
              </h1>
              {/* Button to navigate to patient details */}
              <button
                onClick={navigateToDetails}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={!selectedPatient} // Disable if no patient is selected
              >
                <AiOutlineFullscreen />
              </button>
            </div>
            {/* Button to navigate to patient details */}

            <div className="flex flex-col gap-2">
              {selectedPatient ? (
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">Name:</span>
                    <span>{selectedPatient.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Room:</span>
                    <span
                      className={`${
                        selectedPatient.room === "23"
                          ? "text-blue-400"
                          : selectedPatient.room === "53"
                          ? "text-red-400"
                          : selectedPatient.room === "40"
                          ? "text-green-300"
                          : ""
                      }`}
                    >
                      {selectedPatient.room}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Medication Time:</span>
                    <span>{selectedPatient.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Medication:</span>
                    <span>{selectedPatient.time}</span>
                  </div>
                  <textarea
                    placeholder="Add personal notes..."
                    className="w-full border rounded p-2 mt-4"
                    rows={4}
                  />
                </div>
              ) : (
                appointments.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-center justify-between border-b border-blue-100 py-2"
                  >
                    <div className="flex flex-col">
                      <h2>{item.name}</h2>
                      <span
                        className={`${
                          item.room === "23"
                            ? "text-blue-400"
                            : item.room === "53"
                            ? "text-red-400"
                            : item.room === "40"
                            ? "text-green-300"
                            : ""
                        }`}
                      >
                        {item.room}
                      </span>
                    </div>
                    <div>{item.time}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default NurseDashboard;
