import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar({ name }) {
  const [userInfo, setUserInfo] = useState(null); // State untuk melacak status login
  const navigate = useNavigate();

  // Cek status login saat komponen dirender
  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    console.log(storedUserInfo);

    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const handleLogout = async () => {
    try {
      // Panggil API logout
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {}
        // { withCredentials: true }
      );

      // Hapus data login dari localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("userInfo");

      // Perbarui state
      setUserInfo(null);

      // Arahkan ke halaman login
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error.message);
      alert("Failed to logout. Please try again.");
    }
  };

  const handleLogin = () => {
    navigate("/login"); // Arahkan ke halaman login
  };

  return (
    <div>
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-700">
          {name || "SCAPA POS"}
        </h1>
        {userInfo ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Hi, {userInfo.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        )}
      </header>
    </div>
  );
}

export default Navbar;
