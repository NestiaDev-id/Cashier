import React, { useState, useEffect } from "react";

const Payment = () => {
  const clientKey = "SB-Mid-client-jTF7s78o8iBVKKl0"; // Ganti dengan client key Anda
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    itemBelanja: [
      { namaProduk: "Product 1", jumlah: 1, hargaSatuan: 100, subTotal: 100 },
      { namaProduk: "Product 2", jumlah: 2, hargaSatuan: 200, subTotal: 400 },
    ],
    metodePembayaran: "Midtrans", // Assuming using Midtrans by default
  });
  const [transactionToken, setTransactionToken] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Memuat Snap.js dari Midtrans setelah komponen di-render
    const script = document.createElement("script");
    script.src = `https://app.sandbox.midtrans.com/snap/snap.js`;
    script.setAttribute("data-client-key", clientKey);
    document.body.appendChild(script);

    // Clean up saat komponen di-unmount
    return () => {
      document.body.removeChild(script);
    };
  }, [clientKey]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePayment = async () => {
    // Validate required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.itemBelanja ||
      formData.itemBelanja.length === 0 ||
      !formData.metodePembayaran
    ) {
      setError("Semua kolom wajib diisi!");
      return;
    }

    setError(""); // Reset error if everything is filled correctly

    try {
      const response = await fetch("http://localhost:5000/api/transaksi/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Payment response:", data.transaksi);

      const transactionToken = data.transaksi.transactionToken; // Use the payment URL

      if (transactionToken) {
        setTransactionToken(transactionToken); // Save the payment URL

        // Trigger the Snap payment process
        window.snap.pay(transactionToken, {
          onSuccess: function (result) {
            alert("Pembayaran berhasil!");
            console.log(result);
          },
          onPending: function (result) {
            alert("Pembayaran masih pending.");
            console.log(result);
          },
          onError: function (result) {
            alert("Terjadi kesalahan pada pembayaran.");
            console.log(result);
          },
          onClose: function () {
            alert("Anda menutup popup tanpa menyelesaikan pembayaran.");
          },
        });
      } else {
        console.error("Failed to get payment URL");
        setError("Terjadi kesalahan saat mendapatkan URL pembayaran.");
      }
    } catch (error) {
      console.error("Payment request failed:", error.message);
      alert(`Terjadi kesalahan saat menghubungi server: ${error.message}`);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Form Pembayaran</h1>

      {/* Display error message if any */}
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}

      <form>
        <input
          type="text"
          name="name"
          placeholder="Nama"
          value={formData.name}
          onChange={handleInputChange}
          style={{ margin: "10px", padding: "10px" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          style={{ margin: "10px", padding: "10px" }}
        />
        <input
          type="text"
          name="phone"
          placeholder="Nomor Telepon"
          value={formData.phone}
          onChange={handleInputChange}
          style={{ margin: "10px", padding: "10px" }}
        />
      </form>

      <button
        onClick={handlePayment}
        style={{
          backgroundColor: "#4CAF50",
          color: "#fff",
          padding: "10px 20px",
          fontSize: "16px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Bayar Sekarang
      </button>
    </div>
  );
};

export default Payment;
