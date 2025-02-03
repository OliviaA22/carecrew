import React, { useEffect, useState } from "react";
import { User } from "../../../data/Types";
import DeleteConfirmationModal from "../../../hooks/nurseModal/DeleteConfirmationModal";
import EditNurseModal from "../../../hooks/nurseModal/EditModa";
import axiosInstance from "../../../axios/Axios";

interface NurseTableProps {
  nurses: User[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

const NurseTable: React.FC<NurseTableProps> = ({
  nurses,
  loading,
  error,
  onRefresh,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedNurse, setSelectedNurse] = useState<User | null>(null);

  const handleEdit = (nurse: User) => {
    setSelectedNurse(nurse);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedNurse(null);
    onRefresh();
  };

  const handleDelete = (nurse: User) => {
    setSelectedNurse(nurse);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedNurse) {
      try {
        await axiosInstance.delete(`/api/users/${selectedNurse.id}`);
        onRefresh(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting nurse:", error);
        // Handle error (you might want to pass this up to the parent component)
      } finally {
        setIsDeleteModalOpen(false);
      }
    }
  };

  const filteredNurses = nurses.filter((nurse) => {
    const searchLower = searchTerm.toLowerCase();
    const fullName = `${nurse.first_name || ""} ${
      nurse.last_name || ""
    }`.toLowerCase();
    const email = nurse.email.toLowerCase();
    const phoneNumber = nurse.phone_number?.toLowerCase() || "";

    return (
      fullName.includes(searchLower) ||
      email.includes(searchLower) ||
      phoneNumber.includes(searchLower)
    );
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or phone number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <table className="w-full">
        <thead>
          <tr className="font-medium">
            <th className="text-left w-[25%]">Name</th>
            <th className="text-left w-[25%]">Email</th>
            <th className="text-left w-[20%]">Phone</th>
            <th className="text-left w-[30%]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredNurses.map((nurse) => (
            <tr key={nurse.id} className="border-b border-blue-200">
              <td>{`${nurse.first_name || ""} ${nurse.last_name || ""}`}</td>
              <td>{nurse.email}</td>
              <td>{nurse.phone_number || ""}</td>
              <td>
                <button
                  onClick={() => handleEdit(nurse)}
                  className="mr-2 px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(nurse)}
                  className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-100"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        nurseName={
          selectedNurse
            ? `${selectedNurse.first_name} ${selectedNurse.last_name}`
            : ""
        }
      />
      );
      {selectedNurse && (
        <EditNurseModal
          isOpen={isEditModalOpen}
          onClose={handleEditModalClose}
          nurseId={selectedNurse.id}
          onUpdateSuccess={onRefresh}
        />
      )}
    </div>
  );
};

export default React.memo(NurseTable);
