import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Axios from "../Axios/axiosInatance"; // Adjust the import path as needed

const TokenVerification = () => {
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        console.log(token)
        setError("No token provided in URL");
        return;
      }

      try {
        const response = await Axios.post(`user/verify/${token}`);
        if (response.data.success) {
          setIsVerified(true);
        } else {
          setError(response.data.message || "Token verification failed");
        }
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred during verification");
      }
    };

    verifyToken();
  }, [token]);

  const handleRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-zinc-900 p-4">
      <div className="w-full max-w-md bg-zinc-900 text-white rounded-lg border border-white/10 p-6 text-center">
        {isVerified ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Token Verified Successfully</h2>
            <button
              onClick={handleRedirect}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Go to Login
            </button>
          </>
        ) : (
          <p className="text-red-500 text-lg">{error || "Verifying token..."}</p>
        )}
      </div>
    </div>
  );
};

export default TokenVerification;