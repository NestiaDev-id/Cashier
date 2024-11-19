import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);
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

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white flex flex-col transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          {isOpen && <span className="text-xl font-bold">SCAPA POS</span>}
          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white focus:outline-none"
          >
            {isOpen ? "<<" : ">>"}
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a
            href="#"
            className={`block py-2 px-4 rounded hover:bg-gray-700 transition ${
              !isOpen ? "text-center" : ""
            }`}
          >
            {isOpen ? "Dashboard" : "D"}
          </a>
          <a
            href="#"
            className={`block py-2 px-4 rounded hover:bg-gray-700 transition ${
              !isOpen ? "text-center" : ""
            }`}
          >
            {isOpen ? "Sales" : "S"}
          </a>
          <a
            href="#"
            className={`block py-2 px-4 rounded hover:bg-gray-700 transition ${
              !isOpen ? "text-center" : ""
            }`}
          >
            {isOpen ? "Inventory" : "I"}
          </a>
          <a
            href="#"
            className={`block py-2 px-4 rounded hover:bg-gray-700 transition ${
              !isOpen ? "text-center" : ""
            }`}
          >
            {isOpen ? "Reports" : "R"}
          </a>
          <a
            href="#"
            className={`block py-2 px-4 rounded hover:bg-gray-700 transition ${
              !isOpen ? "text-center" : ""
            }`}
          >
            {isOpen ? "Settings" : "S"}
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Navbar */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-700">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Welcome to SCAPA POS!</h2>
            <p className="text-gray-600">
              This is your dashboard. Use the menu on the left to navigate.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
