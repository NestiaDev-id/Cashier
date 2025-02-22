import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal.jsx"; // Import Modal Komponen

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false); // Untuk modal
  const [modalMessage, setModalMessage] = useState(""); // Pesan error
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setModalMessage("All fields are required.");
      setShowModal(true);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setModalMessage("Please enter a valid email address.");
      setShowModal(true);
      return;
    }
    axios
      .post(
        "http://cashier-backend/api/auth/signup",
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.error("Error response:", err);
        setModalMessage(
          err.response?.data?.message || "Terjadi Error saat Signup"
        );
        setShowModal(true);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-3">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              placeholder="Enter your name"
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Enter your email"
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Enter your password"
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm">Already have an account?</p>
          <Link to="/login" className="text-blue-500 hover:underline text-sm">
            Login here
          </Link>
        </div>
      </div>

      {/* Modal */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Error"
        message={modalMessage}
      />
    </div>
  );
}
