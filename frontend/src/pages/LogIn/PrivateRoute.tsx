import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import SignIn from "./LoginIn";
import NurseDashboard from "../Nurse/nurseDashboard";
import PatientDetails from "../Patient/PatientDetail";

interface PrivateRouteProps {
  element: React.ReactElement;
  requiredRoles: string[]; // Array of required roles
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element,
  requiredRoles,
}) => {
  const { isAuthenticated, userData } = useAuth();

  const isAuthorized =
    isAuthenticated && userData && requiredRoles.includes(userData.role || "");

  return isAuthorized ? element : <NurseDashboard />;
};

export default PrivateRoute;
