import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";
import axios from "axios";

function Products() {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true); // Start loading as true
  const [error, setError] = useState(null); // State for handling errors
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(null); // Reset error state on new request

    // Modify API call if 'id' is relevant
    const url = "http://localhost:5000/api/product/all"; // Default if no id is provided

    axios
      .get(url)
      .then((response) => {
        console.log(response.data.products);
        setProduct(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, [id]); // Re-run useEffect when 'id' changes

  return (
    <div className="flex h-full">
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-gray-100">
        <Navbar name="Product" />

        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow p-6">
            {/* Tambahkan header dengan tombol di pojok kanan */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold mb-4">Welcome to SCAPA POS!</h2>
              <header className="flex justify-between items-center w-full">
                {/* Tombol-tombol untuk tambah, edit, hapus */}
                <div className="ml-auto flex space-x-4">
                  <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                    Tambah
                  </button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                    Hapus
                  </button>
                </div>
              </header>
            </div>
            <p className="text-gray-600">
              This is your dashboard. Use the menu on the left to navigate.
            </p>

            {/* Display loading state */}
            {loading ? (
              <div className="text-center py-4">
                <span className="text-gray-600">Loading products...</span>
              </div>
            ) : error ? (
              <div className="text-center py-4 text-red-600">
                <span>{error}</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product._id} // Gunakan _id sebagai key
                    product={{
                      _id: product._id,
                      name: product.name,
                      description: product.description,
                      price: product.price,
                      image: product.image || "default-image.jpg", // Tentukan default jika tidak ada image
                      stock: product.stock,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Products;
