import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axiosInstance from "../../axios/Axios";
import { LoginResponse, Shift, User } from "../../data/Types";

interface AuthContextType {
  isAuthenticated: boolean;
  userData: User | null;
  currentShift: Shift | null;
  login: (data: LoginResponse) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
  startShift: () => Promise<void>;
  endShift: (notes: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [currentShift, setCurrentShift] = useState<Shift | null>(null);

  const checkAuth = async () => {
    try {
      const response = await axiosInstance.get<LoginResponse>(
        "/api/auth/check-auth"
      );
      setIsAuthenticated(true);
      setUserData(response.data.user);
      return true;
    } catch (error) {
      setIsAuthenticated(false);
      setUserData(null);
      return false;
    }
  };

  // In your API service file (e.g., api.ts)
  const checkActiveShift = async (userId: number) => {
    try {
      const response = await axiosInstance.get(`/api/shifts/active/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error checking active shift:", error);
      throw error;
    }
  };

  const startShift = async () => {
    if (!userData) {
      throw new Error("User not authenticated");
    }

    try {
      // Check for active shift
      const activeShift = await checkActiveShift(userData.id);

      if (activeShift) {
        // If there's an active shift, set it as current and return
        setCurrentShift(activeShift);
        return activeShift;
      }

      // If no active shift, start a new one
      const response = await axiosInstance.post<Shift>("/api/shifts/start");
      setCurrentShift(response.data);
      return response.data;
    } catch (error) {
      console.error("Error starting shift:", error);
      throw error;
    }
  };

  const endShift = async (notes: string) => {
    if (!currentShift) {
      throw new Error("No active shift to end");
    }
    try {
      await axiosInstance.post("/api/shifts/end", {
        shiftId: currentShift.id,
        notes,
      });
      setCurrentShift(null);
    } catch (error) {
      console.error("Error ending shift:", error);
      throw error;
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = (data: LoginResponse) => {
    setUserData(data.user);
    setIsAuthenticated(true);
    // You might want to store the token somewhere, e.g., in localStorage
    localStorage.setItem("token", data.token);
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
