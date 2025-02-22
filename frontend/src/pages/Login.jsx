import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal.jsx"; // Import Modal Komponen

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false); // Untuk modal

  const [modalMessage, setModalMessage] = useState(""); // Pesan error

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://cashier-backend.vercel.app/api/auth/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          //   withCredentials: true,
        }
      )
      .then((result) => {
        console.log("API Response:", result.data);
        if (result.data.success) {
          const { token, user } = result.data;
          localStorage.setItem("authToken", token);
          localStorage.setItem("userInfo", JSON.stringify(user));
          navigate("/dashboard");
        } else {
          console.log("Login failed");
        }
      })
      .catch((err) => {
        console.error("Error response:", err);
        setModalMessage(
          err.response?.data?.message || "Terjadi Error saat Login"
        );
        setShowModal(true);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-3">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm">Don&apos;t have an account?</p>
          <Link to="/signup" className="text-blue-500 hover:underline text-sm">
            Register here
          </Link>
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Error"
        message={modalMessage}
      ></Modal>
    </div>
  );
}
