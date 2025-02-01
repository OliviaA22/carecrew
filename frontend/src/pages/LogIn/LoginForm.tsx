import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Axios";
import GenericForm, { FormField } from "../../components/forms/GenericForm";
import { useAuth } from "./AuthContext";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login, startShift } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const fields: FormField[] = [
    {
      name: "emailDoctor",
      type: "email",
      label: "Email address",
      placeholder: "Enter email",
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Password",
    },
  ];

  const handleSubmit = async (formData: any) => {
    try {
      const response = await axiosInstance.post("/api/auth/login", {
        email: formData.emailDoctor,
        password: formData.password,
      });

      if (response.status === 201) {
        const userData = response.data;
        login(userData);

        // Start shift after successful login
        await startShift();

        if (userData.user.role === "admin") {
          navigate("/admindashboard");
        } else {
          navigate("/nursedashboard");
        }
      } else {
        setError("Unexpected response from server");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setError(
        error.response?.data?.message || "An error occurred during login"
      );
    }
  };

  return (
    <>
      {error && <div className="error-message">{error}</div>}
      <GenericForm
        fields={fields}
        onSubmit={handleSubmit}
        buttonText="Sign In"
      />
    </>
  );
};

export default LoginForm;
