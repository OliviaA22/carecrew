import React from "react";
import axiosInstance from "../../axios/Axios";
import "react-datepicker/dist/react-datepicker.css";
import NurseForm from "../../data/NurseFormData";
import { NurseFormData } from "../../data/NurseFormData";

interface AddNurseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateSuccess: () => void;
}

const AddNurseModal: React.FC<AddNurseModalProps> = ({
  isOpen,
  onClose,
  onUpdateSuccess,
}) => {
  const handleSubmit = async (formData: NurseFormData) => {
    try {
      const postData = {
        ...formData,
        date_of_birth: formData.date_of_birth
          ? formData.date_of_birth.toISOString().split("T")[0]
          : null,
        role: "nurse",
      };

      const token = localStorage.getItem("token");
      await axiosInstance.post("/api/auth/register", postData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      onClose();
      onUpdateSuccess();
    } catch (error: any) {
      console.error("Registration error:", error);
      let errorMessage = "An unexpected error occurred";
      if (error.response) {
        errorMessage =
          error.response.data.error ||
          error.response.data.message ||
          error.message;
      } else if (error.request) {
        errorMessage = "No response received from server";
      } else {
        errorMessage = error.message;
      }
      alert(`Registration failed: ${errorMessage}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Nurse</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <NurseForm handleSubmit={handleSubmit} onClose={onClose} />
      </div>
    </div>
  );
};

export default AddNurseModal;
