import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./pages/LogIn/AuthContext";
import PrivateRoute from "./pages/LogIn/PrivateRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "vite/modulepreload-polyfill";
import AdminDashboard from "./pages/Admin/adminDashboard";
import Home from "./pages/Home/Home";
import SignUp from "./pages/Home/SignIn";
import SignIn from "./pages/LogIn/LoginIn";
import NurseDashboard from "./pages/Nurse/nurseDashboard";
import PatientDetails from "./pages/Patient/PatientDetail";
import PatientList from "./pages/Patient/PatientList";
import ManageNurses from "./pages/Admin/manageNurses";
import NotificationsPage from "./pages/News/NotificationsPage";
import {
  NotificationProvider,
  useNotifications,
} from "./hooks/Notifications/NotificationProvider";
import NotificationPopup from "./hooks/Notifications/NotificationPopUp";

const queryClient = new QueryClient();

const AppContent: React.FC = () => {
  const { notifications, showPopup, setShowPopup } = useNotifications();

  return (
    <Router>
      {showPopup && notifications.length > 0 && (
        <NotificationPopup
          notification={notifications[notifications.length - 1]}
          onClose={() => setShowPopup(false)}
        />
      )}
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
          path="/details/:id"
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
          path="/news"
          element={
            <PrivateRoute
              element={<NotificationsPage />}
              requiredRoles={["nurse"]}
            />
          }
        />
        <Route
          path="/nurses"
          element={
            <PrivateRoute
              element={<ManageNurses />}
              requiredRoles={["admin"]}
            />
          }
        />
        <Route
          path="/patients"
          element={
            <PrivateRoute element={<PatientList />} requiredRoles={["nurse"]} />
          }
        />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NotificationProvider>
          <AppContent />
        </NotificationProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
