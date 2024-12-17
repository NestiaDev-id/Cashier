import React, { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import Sidebar from "../components/Sidebar"; // Pastikan ini adalah impor yang valid
import Navbar from "../components/Navbar"; // Pastikan ini adalah impor yang valid

const LaporanKeuangan = () => {
  const [financialData, setFinancialData] = useState([]); // State untuk menyimpan data transaksi
  const [isOpen, setIsOpen] = useState(false); // State untuk sidebar
  const reportRef = useRef(); // Reference untuk elemen laporan
  const [currentPage, setCurrentPage] = useState(1); // Halaman aktif
  const [itemsPerPage] = useState(15); // Jumlah item per halaman

  // Fungsi untuk toggle Sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/cart/getAll");
      const transactions = response.data.transactions;

      const formattedData = transactions.map((transaction, index) => ({
        id: index + 1,
        description: transaction.nomorTransaksi || "Deskripsi Tidak Ada",
        amount: `Rp ${transaction.totalBayar?.toLocaleString() || "0"}`,
      }));

      setFinancialData(formattedData);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Fungsi untuk menghitung data yang ditampilkan di tabel berdasarkan halaman
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = financialData.slice(indexOfFirstItem, indexOfLastItem);

  // Fungsi untuk mengubah halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Fungsi untuk generate PDF
  const generatePdf = () => {
    const doc = new jsPDF();
    const reportContent = reportRef.current;

    if (reportContent) {
      html2canvas(reportContent).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        doc.addImage(imgData, "PNG", 10, 10, 180, 160);
        doc.save("laporan_keuangan.pdf");
      });
    } else {
      console.error("Failed to capture report content.");
    }
  };

  // Total halaman
  const totalPages = Math.ceil(financialData.length / itemsPerPage);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Navbar */}
        <Navbar name="Laporan Keuangan" />

        {/* Konten laporan */}
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Laporan Keuangan</h2>

          <div ref={reportRef} id="report-content">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">No</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Id Transaksi
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((data) => (
                    <tr key={data.id}>
                      <td className="border border-gray-300 px-4 py-2">
                        {data.id}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {data.description}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {data.amount}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="border border-gray-300 px-4 py-2 text-center"
                      colSpan="3"
                    >
                      Memuat data transaksi...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Navigasi Pagination */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 mx-1 border ${
                currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
              }`}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 mx-1 border ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 mx-1 border ${
                currentPage === totalPages
                  ? "bg-gray-300"
                  : "bg-blue-500 text-white"
              }`}
            >
              Next
            </button>
          </div>

          {/* Tombol untuk mengunduh PDF */}
          <div className="mt-4">
            <button
              onClick={generatePdf}
              className="ml-4 px-4 py-2 bg-green-500 text-white rounded"
            >
              Unduh PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaporanKeuangan;
