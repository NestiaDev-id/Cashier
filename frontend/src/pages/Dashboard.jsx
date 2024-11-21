import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]); // State untuk transaksi
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Failed to logout. Please try again.");
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Jalankan semua API secara paralel
    Promise.all([
      axios.get("http://localhost:5000/api/product/all"),
      axios.get("http://localhost:5000/api/users/getall"),
      // axios.get("http://localhost:5000/api/transactions"), // API untuk transaksi
    ])
      .then(([productResponse, userResponse, transactionResponse]) => {
        setProducts(productResponse.data.products); // Simpan produk
        setUsers(userResponse.data); // Simpan user
        // setTransactions(transactionResponse.data.transactions); // Simpan transaksi
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load data:", error);
        setError("Failed to load data.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Navbar */}
        <Navbar name="Dashboard" />

        {/* Content Area */}
        <main className="flex-1 p-6">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Card: Jumlah Produk */}
              <div className="border-l-4 border-primary bg-white shadow-md p-4 rounded">
                <div className="flex items-center">
                  <div className="flex-grow">
                    <div className="text-xs font-bold text-primary uppercase mb-1">
                      Jumlah Produk
                    </div>
                    <div className="text-lg font-bold text-gray-800">
                      Total: {products.length}
                    </div>
                  </div>
                  <div className="text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      fill="currentColor"
                      className="bi bi-basket3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card: Jumlah User */}
              <div className="border-l-4 border-success bg-white shadow-md p-4 rounded">
                <div className="flex items-center">
                  <div className="flex-grow">
                    <div className="text-xs font-bold text-success uppercase mb-1">
                      Jumlah Users
                    </div>
                    <div className="text-lg font-bold text-gray-800">
                      Total: {users.length}
                    </div>
                  </div>
                  <div className="text-success">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      fill="currentColor"
                      className="bi bi-people"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card: Jumlah Transaksi */}
              <div className="border-l-4 border-info bg-white shadow-md p-4 rounded">
                <div className="flex items-center">
                  <div className="flex-grow">
                    <div className="text-xs font-bold text-info uppercase mb-1">
                      Jumlah Transaksi
                    </div>
                    <div className="text-lg font-bold text-gray-800">
                      Total: 2
                    </div>
                  </div>
                  <div className="text-info">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      fill="currentColor"
                      className="bi bi-card-checklist"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.854 4.646a.5.5 0 1 0-.708.708l.647.646L10 7.793 8.707 6.5l-.707.707L10 9l2-2-1.146-1.146.707-.707zm1-2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H4a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h8zM4 9.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1zm1-4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h2zM12.5 14H1.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow p-6 mt-3">
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
