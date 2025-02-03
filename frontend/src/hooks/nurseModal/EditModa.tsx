import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios/Axios";
import "react-datepicker/dist/react-datepicker.css";
import NurseForm from "../../data/NurseFormData";
import { NurseFormData } from "../../data/NurseFormData";

interface EditNurseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateSuccess: () => void;
  nurseId: number;
}

const EditNurseModal: React.FC<EditNurseModalProps> = ({
  isOpen,
  onClose,
  onUpdateSuccess,
  nurseId,
}) => {
  const [initialData, setInitialData] = useState<NurseFormData | null>(null);

  useEffect(() => {
    const fetchNurseData = async () => {
      try {
        const response = await axiosInstance.get(`/api/users/${nurseId}`);
        const nurseData = response.data;
        setInitialData({
          first_name: nurseData.first_name,
          last_name: nurseData.last_name,
          email: nurseData.email,
          date_of_birth: new Date(nurseData.date_of_birth),
          phone_number: nurseData.phone_number,
          gender: nurseData.gender,
          address: nurseData.address,
          hospital_id: nurseData.hospital_id,
          ward_id: nurseData.ward_id,
        });
      } catch (error) {
        console.error("Error fetching nurse data:", error);
      }
    };

    if (isOpen && nurseId) {
      fetchNurseData();
    }
  }, [isOpen, nurseId]);

  const handleSubmit = async (formData: NurseFormData) => {
    try {
      const updateData = {
        ...formData,
        date_of_birth: formData.date_of_birth
          ? formData.date_of_birth.toISOString().split("T")[0]
          : null,
      };

      const token = localStorage.getItem("token");
      await axiosInstance.put(`/api/users/${nurseId}`, updateData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      onClose();
      onUpdateSuccess();
    } catch (error: any) {
      console.error("Update error:", error);
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
      alert(`Update failed: ${errorMessage}`);
    }
  };

  if (!isOpen || !initialData) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Nurse</h2>
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
        <NurseForm
          handleSubmit={handleSubmit}
          onClose={onClose}
          initialData={initialData}
        />
      </div>
    </div>
  );
};

export default EditNurseModal;
