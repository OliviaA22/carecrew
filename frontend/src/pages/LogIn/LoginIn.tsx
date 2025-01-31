import React, { useState, useCallback } from "react";
import AdminHeader from "../../components/ui/layout/adminHeader";
import Button from "../../hooks/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import axiosInstance from "../../axios/Axios";
import { LoginResponse } from "../../data/Types";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post<LoginResponse>(
        "/api/auth/login",
        { email, password },
        { timeout: 5000 }
      );

      console.log("Full response data:", response.data);

      if (response.status === 201 && response.data) {
        const { user, token } = response.data;

        if (user && user.role) {
          login(response.data); // This now matches the updated login function signature

          switch (user.role) {
            case "admin":
              navigate("/admindashboard");
              break;
            case "nurse":
              navigate("/nursedashboard");
              break;
            default:
              console.error("Unexpected user role:", user.role);
              setError(`Unknown user role: ${user.role}`);
          }
        } else {
          console.error("Invalid user data structure:", user);
          setError("Invalid user data structure received from server");
        }
      } else {
        setError("Unexpected response from server");
      }
    } catch (error: any) {
      // ... error handling remains the same
    } finally {
      setIsLoading(false);
    }
  }, [email, password, isLoading, login, navigate]);

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
