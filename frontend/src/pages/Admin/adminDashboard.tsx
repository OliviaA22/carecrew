import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios/Axios";
import PageLayout from "../../components/ui/layout/PageLayout";

interface Nurse {
  id: number;
  first_name: string;
  last_name: string;
  ward_id: number;
}

interface Patient {
  id: number;
  ward_id: number;
}

interface Ward {
  id: number;
  name: string;
  patientCount: number;
  nurses: Nurse[];
}

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wardData, setWardData] = useState<Ward[]>([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const [wardsResponse, nursesResponse, patientsResponse] =
        await Promise.all([
          axiosInstance.get("/api/search/wards"),
          axiosInstance.get("/api/users/"),
          axiosInstance.get("/api/patients/"),
        ]);

      console.log("Wards data:", wardsResponse.data);
      console.log("Nurses data:", nursesResponse.data);
      console.log("Patients data:", patientsResponse.data);

      if (!wardsResponse.data) {
        throw new Error("No ward data received from the server");
      }

      const processedWardData = processWardData(
        wardsResponse.data,
        nursesResponse.data || [],
        patientsResponse.data || []
      );
      setWardData(processedWardData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(
        `Failed to fetch data: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const processWardData = (
    wards: any[],
    nurses: any[] = [],
    patients: any[] = []
  ): Ward[] => {
    if (!Array.isArray(wards)) {
      console.error("Invalid ward data format received:", wards);
      return [];
    }

    const nursesByWard = nurses.reduce((acc, nurse) => {
      if (nurse.role === "nurse" && nurse.ward_id) {
        if (!acc[nurse.ward_id]) {
          acc[nurse.ward_id] = [];
        }
        acc[nurse.ward_id].push({
          id: nurse.id,
          first_name: nurse.first_name,
          last_name: nurse.last_name,
          ward_id: nurse.ward_id,
        });
      }
      return acc;
    }, {});

    const patientCountByWard = patients.reduce((acc, patient) => {
      if (patient.ward_id) {
        acc[patient.ward_id] = (acc[patient.ward_id] || 0) + 1;
      }
      return acc;
    }, {});

    return wards.map((ward) => ({
      id: ward.id,
      name: ward.name,
      hospital_id: ward.hospital_id,
      patientCount: patientCountByWard[ward.id] || 0,
      nurses: nursesByWard[ward.id] || [],
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <PageLayout text={"Dashboard"}>
      {/* Ward Information */}
      <div className="col-span-2 p-6 bg-white shadow-custom rounded-2xl">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Ward Information
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Ward Name</th>
                <th className="px-4 py-2">Patient Count</th>
                <th className="px-4 py-2">Assigned Nurses</th>
              </tr>
            </thead>
            <tbody>
              {wardData.map((ward) => (
                <tr key={ward.id}>
                  <td className="border px-4 py-2">{ward.name}</td>
                  <td className="border px-4 py-2">{ward.patientCount}</td>
                  <td className="border px-4 py-2">
                    {ward.nurses
                      .map((nurse) => `${nurse.first_name} ${nurse.last_name}`)
                      .join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
