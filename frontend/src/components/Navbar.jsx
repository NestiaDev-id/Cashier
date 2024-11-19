import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ name }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Panggil API logout
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );

      // Setelah berhasil logout, arahkan ke halaman login
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Failed to logout. Please try again.");
    }
  };
  return (
    <div className="">
      {/* Navbar */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-700">{name}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>
    </div>
  );
}

export default Navbar;
