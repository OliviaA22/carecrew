import { useState, useEffect } from "react";
import axiosInstance from "../axios/Axios"; // Adjust the import path as needed
import { Patient, User } from "./Types";

const useFetchPatients = (userData: User | null) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        if (userData?.ward_id) {
          const response = await axiosInstance.get(`/api/search/dashboard`);
          console.log("Dashboard response:", response.data);

          const patientsData = response.data.assignedPatients || [];
          setPatients(patientsData);
        }
      } catch (err) {
        console.error("Error fetching patients:", err);
        setError("Failed to fetch patients. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [userData]);

  return { patients, loading, error };
};

export default useFetchPatients;
