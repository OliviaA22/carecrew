import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axiosInstance from "../../axios/Axios";
import { Shift, User } from "../../data/Types";
import axios from "axios";

interface AuthContextType {
  isAuthenticated: boolean;
  userData: User | null;
  login: (data: User & { token: string }) => Promise<void>;
  startShift: (userData: User) => Promise<Shift>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
  endShift: (notes: string) => Promise<void>;
  currentShift: Shift | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [currentShift, setCurrentShift] = useState<Shift | null>(null);

  const checkAuth = async () => {
    try {
      const response = await axiosInstance.get("/api/auth/check-auth");
      setIsAuthenticated(true);
      setUserData(response.data.user);
      return true;
    } catch (error) {
      setIsAuthenticated(false);
      setUserData(null);
      return false;
    }
  };

  const checkActiveShift = async (userId: number): Promise<Shift | null> => {
    try {
      const response = await axiosInstance.get<Shift[]>("/api/shifts");
      const shifts = response.data;

      // Find the first shift that belongs to the user and is in progress
      const activeShift = shifts.find(
        (shift) => shift.nurse_id === userId && shift.status === "in progress"
      );

      return activeShift || null;
    } catch (error) {
      console.error("Error checking active shift:", error);
      throw error;
    }
  };

  const startShift = async (userData: User): Promise<Shift> => {
    console.log("startShift called, userData:", userData);
    if (!userData) {
      console.error("startShift: User data not provided");
      throw new Error("User data not provided");
    }

    try {
      console.log("Checking for active shift...");
      const activeShift = await checkActiveShift(userData.id);
      if (activeShift) {
        console.log("Active shift found:", activeShift);
        setCurrentShift(activeShift);
        return activeShift;
      }

      const response = await axiosInstance.post<Shift>("/api/shifts/start", {
        nurse_id: userData.id,
        notes: "",
      });
      console.log("New shift response:", response.data);

      const newShift: Shift = {
        id: response.data.id,
        nurse_id: userData.id,
        start_time: response.data.start_time,
        end_time: null,
        status: "in progress",
        notes: null,
        user: {
          first_name: userData.first_name,
          last_name: userData.last_name,
        },
      };

      setCurrentShift(newShift);
      console.log("New shift started:", newShift);
      return newShift;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", {
          message: error.message,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            data: error.config?.data,
            headers: error.config?.headers,
          },
        });
        if (error.response) {
          console.error("Server responded with error:", error.response.data);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
      } else {
        console.error("Non-Axios error:", error);
      }
      throw error;
    }
  };

  const endShift = async (notes: string): Promise<void> => {
    if (!currentShift) {
      throw new Error("No active shift to end");
    }
    try {
      await axiosInstance.put("/api/shifts/end", {
        shiftId: currentShift.id,
        notes,
      });
      setCurrentShift(null);
    } catch (error) {
      console.error("Error ending shift:", error);
      if (axios.isAxiosError(error) && error.response) {
        console.error("Server error details:", error.response.data);
      }
      // Provide user feedback about the error
      throw new Error(
        "Failed to end shift. Please try again or contact support."
      );
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (data: User & { token: string }): Promise<void> => {
    setUserData(data);
    setIsAuthenticated(true);
    localStorage.setItem("authToken", data.token);
    console.log("Authentication completed, user data set");
  };

  const logout = async () => {
    try {
      if (currentShift) {
        await endShift("Shift ended due to logout");
      }
      await axiosInstance.post("/api/auth/logout");
    } catch (error) {
      console.error("Logout request failed:", error);
    }
    setUserData(null);
    setIsAuthenticated(false);
    setCurrentShift(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userData,
        currentShift,
        login,
        logout,
        checkAuth,
        startShift,
        endShift,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
