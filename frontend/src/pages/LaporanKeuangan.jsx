import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const LaporanKeuangan = () => {
  // Simulated financial data
  const financialData = [
    { id: 1, description: "Pendapatan", amount: "Rp 10,000,000" },
    { id: 2, description: "Pengeluaran", amount: "Rp 5,000,000" },
    { id: 3, description: "Laba Bersih", amount: "Rp 5,000,000" },
  ];

  // Reference to the content we want to generate PDF from
  const reportRef = useRef();

  // Function to generate PDF
  const generatePdf = () => {
    const doc = new jsPDF();
    const reportContent = reportRef.current;

    if (reportContent) {
      // Use html2canvas to render the content of the ref into a canvas, then generate PDF
      html2canvas(reportContent).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        doc.addImage(imgData, "PNG", 10, 10, 180, 160); // Add the image to the PDF
        doc.save("laporan_keuangan.pdf"); // Save the PDF
      });
    } else {
      console.error("Failed to capture report content.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Laporan Keuangan</h2>

      {/* Report content to display and generate PDF */}
      <div ref={reportRef} id="report-content">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">No</th>
              <th className="border border-gray-300 px-4 py-2">Deskripsi</th>
              <th className="border border-gray-300 px-4 py-2">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {financialData.map((data) => (
              <tr key={data.id}>
                <td className="border border-gray-300 px-4 py-2">{data.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {data.description}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {data.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Button to generate PDF */}
      <div className="mt-4">
        <button
          onClick={generatePdf}
          className="ml-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          Unduh PDF
        </button>
      </div>
    </div>
  );
};

export default LaporanKeuangan;
