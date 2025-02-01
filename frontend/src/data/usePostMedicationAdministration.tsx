import axiosInstance from "../axios/Axios";
import { useAuth } from "../pages/LogIn/AuthContext";
import { MedicationItem, Patient } from "./Types";

interface PostMedicationAdministrationParams {
  medication: MedicationItem;
  patient: Patient;
  status: string;
  reason: string;
}

export const usePostMedicationAdministration = (p0: {
  medication: MedicationItem;
  patient: Patient;
  status: string;
  reason: string;
}) => {
  const { userData } = useAuth();

  const postMedicationAdministration = async (
    params: PostMedicationAdministrationParams
  ) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.post(
        `/api/med-plans/adminstration`,
        {
          med_item_id: params.medication.id,
          patient_id: params.patient.id,
          administered_by: userData?.id,
          status: params.status === "given" ? "administered" : "skipped",
          notes: params.status === "given" ? "" : params.reason,
          time_administered: new Date().toISOString(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (response.status === 201) {
        return response.data;
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      throw error;
    }
  };

  return { postMedicationAdministration };
};
