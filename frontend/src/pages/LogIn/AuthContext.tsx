import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axiosInstance from "../../axios/Axios";
import { LoginResponse, User } from "../../data/Types";

interface AuthContextType {
  isAuthenticated: boolean;
  userData: User | null;
  login: (data: LoginResponse) => void; // Changed from User to LoginResponse
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);

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
      await axiosInstance.post("/api/auth/logout");
    } catch (error) {
      console.error("Logout request failed:", error);
    }
    setUserData(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userData, login, logout, checkAuth }}
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
