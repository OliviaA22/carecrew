import React, { useState, useCallback } from "react";
import AdminHeader from "../../components/ui/layout/adminHeader";
import Button from "../../hooks/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import axiosInstance from "../../axios/Axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, startShift } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });

      if (response.status === 201 && response.data) {
        const { token, user } = response.data;

        if (user && user.role) {
          await login({ ...user, token });
          try {
            const shiftResult = await startShift(user);
          } catch (shiftError) {
            console.error("Failed to start shift:", shiftError);
          }

          // Navigate based on role
          if (user.role === "admin") {
            navigate("/admindashboard");
          } else if (user.role === "nurse") {
            navigate("/nursedashboard");
          } else {
            setError("Unknown user role");
          }
        } else {
          setError("Invalid user data received from server");
        }
      } else {
        setError("Unexpected response from server");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full">
      <AdminHeader text={""} />
      <div className="h-full w-full gap-8 flex bg-blue-50 flex-col items-center pt-28">
        <div className="flex flex-col gap-8 w-[400px] h-3/5 bg-white rounded-2xl px-5 py-6 shadow-custom">
          <h1 className="text-center text-blue-600 font-semibold text-3xl">
            Login
          </h1>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <span className="font-medium">Email*</span>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input_ outline-none rounded-lg px-2 p-1"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-medium">Password*</span>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input_ outline-none rounded-lg px-2 p-1"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full">
            {isLoading ? (
              <div className="text-center">Signing in...</div>
            ) : (
              <Button
                onClick={handleLogin}
                text="Sign in"
                className="text-center"
              />
            )}
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
