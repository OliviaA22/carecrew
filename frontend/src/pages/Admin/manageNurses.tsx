import React, { useState, useEffect, useCallback } from "react";
import PageLayout from "../../components/ui/layout/PageLayout";
import NurseTable from "../../components/ui/tables/NurseTable";
import axiosInstance from "../../axios/Axios";
import { User } from "../../data/Types";
import { API_ENDPOINTS, ERROR_MESSAGES } from "../../axios/ConstantsAxios";
import AddNurseModal from "../../hooks/nurseModal/AddModal";

const ManageNurses: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [nurses, setNurses] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNurses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(API_ENDPOINTS.GET_USERS, {
        params: { role: "nurse" },
      });
      const mappedNurses: User[] = response.data.map((nurse: any) => ({
        userId: nurse.id,
        first_name: nurse.first_name,
        last_name: nurse.last_name,
        email: nurse.email,
        phone_number: nurse.phone_number,
        date_of_birth: new Date(nurse.date_of_birth),
        gender: nurse.gender,
        ward_id: nurse.ward_id,
        hospital_id: nurse.hospital_id,
      }));
      setNurses(mappedNurses);
    } catch (error: any) {
      console.error("Error fetching nurses:", error);
      setError(ERROR_MESSAGES.FETCH_FAILED);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNurses();
  }, [fetchNurses]);

  const handleAddNurse = () => {
    setIsAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
    fetchNurses(); // Refresh the list after adding a new nurse
  };

  return (
    <PageLayout text="Manage Nurses">
      <div className="flex min-h-screen pb-20 justify-center w-full">
        <div className="flex flex-col gap-10 w-[86%] py-10">
          <div className="p-6 w-full flex-flex-col gap-8 h-full bg-white shadow-custom rounded-2xl">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl text-blue-600 font-semibold">Nurses</h1>
              <button
                onClick={handleAddNurse}
                className="bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition duration-300"
              >
                Add Nurse
              </button>
            </div>
            <NurseTable
              nurses={nurses}
              loading={loading}
              error={error}
              onRefresh={fetchNurses}
            />
          </div>
        </div>
      </div>
      <AddNurseModal
        isOpen={isAddModalOpen}
        onClose={handleAddModalClose}
        onUpdateSuccess={fetchNurses}
      />
    </PageLayout>
  );
};

export default ManageNurses;
