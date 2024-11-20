import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get("http://localhost:5000/api/product/all")
      .then((response) => {
        setProduct(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex h-full">
      <Sidebar />

      <div className="flex-1 flex flex-col bg-gray-100">
        <Navbar name="Product" />

        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              {/* <h2 className="text-2xl font-bold mb-4">Welcome to SCAPA POS!</h2> */}
              <div className="ml-auto flex space-x-4">
                <Link
                  to="/addProduct"
                  //   onClick={() => setShowAddModal(true)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                >
                  Tambah
                </Link>
              </div>
            </div>

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
                    key={product._id}
                    product={{
                      _id: product._id,
                      name: product.name,
                      description: product.description,
                      price: product.price,
                      image: product.images || "default-image.jpg",
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
