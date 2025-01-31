import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./pages/LogIn/AuthContext";
import PrivateRoute from "./pages/LogIn/PrivateRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "vite/modulepreload-polyfill";
import ManageAppointments from "./pages/Admin/manageAppointments";
import ManageDoctors from "./pages/Admin/manageDoctors";
import ManagePatients from "./pages/Admin/managePatients";
import AdminDashboard from "./pages/Admin/adminDashboard";
import Home from "./pages/Home/Home";
import SignUp from "./pages/Home/SignIn";
import SignIn from "./pages/LogIn/LoginIn";
import NurseDashboard from "./pages/Nurse/nurseDashboard";
import PatientDetails from "./pages/Patient/PatientDetail";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/admindashboard"
              element={
                <PrivateRoute
                  element={<AdminDashboard />}
                  requiredRoles={["admin"]}
                />
              }
            />
            <Route
              path="/details"
              element={
                <PrivateRoute
                  element={<PatientDetails />}
                  requiredRoles={["nurse"]}
                />
              }
            />
            <Route
              path="/nursedashboard"
              element={
                <PrivateRoute
                  element={<NurseDashboard />}
                  requiredRoles={["nurse"]}
                />
              }
            />
            <Route
              path="/appointments"
              element={
                <PrivateRoute
                  element={<ManageAppointments />}
                  requiredRoles={["admin"]}
                />
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute
                  element={<ManageAppointments />}
                  requiredRoles={["admin"]}
                />
              }
            />
            <Route
              path="/doctors"
              element={
                <PrivateRoute
                  element={<ManageDoctors />}
                  requiredRoles={["admin"]}
                />
              }
            />
            <Route
              path="/patients"
              element={
                <PrivateRoute
                  element={<ManagePatients />}
                  requiredRoles={["admin"]}
                />
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
