import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../pages/LogIn/AuthContext";
import { Shift } from "../../../data/Types";

interface AdminHeaderProps {
  text: string;
}

interface ModalProps {
  onClose: () => void;
  onConfirm: (notes: string) => void;
  currentShift: Shift | null;
}

const Modal: React.FC<ModalProps> = ({ onClose, onConfirm, currentShift }) => {
  const [notes, setNotes] = useState("");

  const calculateShiftDuration = () => {
    if (!currentShift) return "N/A";
    const start = new Date(currentShift.start_time);
    const now = new Date();
    const diff = now.getTime() - start.getTime();
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    return `${hours}h ${minutes}m`;
  };

  return createPortal(
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      onClick={onClose}
    >
      <div
        className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            End Shift
          </h3>
          <div className="mt-2 px-7 py-3">
            <p>
              Start Time:{" "}
              {currentShift
                ? new Date(currentShift.start_time).toLocaleString()
                : "N/A"}
            </p>
            <p>Current Time: {new Date().toLocaleString()}</p>
            <p>Shift Duration: {calculateShiftDuration()}</p>
            <textarea
              className="mt-2 w-full border rounded-md p-2"
              rows={4}
              placeholder="Enter shift notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
          <div className="items-center px-4 py-3">
            <button
              onClick={() => onConfirm(notes)}
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              End Shift
            </button>
            <button
              onClick={onClose}
              className="mt-3 px-4 py-2 bg-gray-300 text-black text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

const AdminHeader: React.FC<AdminHeaderProps> = ({ text }) => {
  const { endShift, logout, currentShift } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleBreak = async () => {
    await logout();
    navigate("/");
  };

  const handleEndShiftClick = () => {
    setShowModal(true);
  };

  const handleEndShiftConfirm = async (notes: string) => {
    try {
      await endShift(notes);
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error ending shift:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gray-100 h-16 border-b-2 border-blue-200 flex items-center">
        <div className="flex px-10 items-center justify-between w-full">
          <h1 className="text-2xl font-medium uppercase">{text}</h1>
          <button
            onClick={handleBreak}
            className="px-5 py-1 hover:bg-gray-200 hover:cursor-pointer transition duration-300 ease-in-out bg-gray-100 rounded-lg font-medium text-blue-500 text-xl"
          >
            Break
          </button>
          <button
            onClick={handleEndShiftClick}
            className="px-5 py-1 hover:bg-gray-200 hover:cursor-pointer transition duration-300 ease-in-out bg-gray-100 rounded-lg font-medium text-blue-500 text-xl"
          >
            End Shift
          </button>
        </div>
      </div>

      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onConfirm={handleEndShiftConfirm}
          currentShift={currentShift}
        />
      )}
    </div>
  );
};

export default AdminHeader;
