import React, { useState } from "react";
import axios from "axios";

function Payment() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Panggil API backend untuk mendapatkan Snap Token
      const response = await axios.post(
        "http://localhost:5000/api/transaksi/create",
        {
          userId: "12345", // Contoh ID pengguna
          items: [
            { id: "1", name: "Produk A", price: 100000, quantity: 1 },
            { id: "2", name: "Produk B", price: 150000, quantity: 2 },
          ],
          totalAmount: 400000,
          customerDetails: {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            phone: "08123456789",
          },
        }
      );

      const { paymentUrl } = response.data;

      // Redirect ke Snap payment URL
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        alert("Gagal mendapatkan URL pembayaran");
      }
    } catch (error) {
      console.error("Gagal memulai pembayaran:", error);
      alert("Terjadi kesalahan saat memulai pembayaran");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Payment</h1>
      <p>Total: Rp 400,000</p>
      <button
        onClick={handlePayment}
        disabled={loading}
        style={{
          backgroundColor: loading ? "#ccc" : "#4CAF50",
          color: "#fff",
          padding: "10px 20px",
          fontSize: "16px",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Loading..." : "Bayar Sekarang"}
      </button>
    </div>
  );
}

export default Payment;
