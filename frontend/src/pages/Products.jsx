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
  const [showAddModal, setShowAddModal] = useState(false);

  const [name, setName] = useState(""); // State untuk nama produk
  const [description, setDescription] = useState(""); // State untuk deskripsi
  const [price, setPrice] = useState(0); // State untuk harga
  const [stock, setStock] = useState(0); // State untuk stok
  const [category, setCategory] = useState(""); // State untuk kategori
  const [images, setImages] = useState(""); // State untuk URL gambar

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

  const handleAddProduct = async (e) => {
    const productData = {
      name: name,
      description: description,
      price: price,
      stock: stock,
      category: category,
      images:
        images.length > 0
          ? images
          : [{ url: "default-image-url", altText: "Default Image" }],
    };

    console.log("Data yang dikirim ke backend:", productData);

    // e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/product/add",
        productData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Terjadi error saat menambahkan produk:", error.message);
    }
  };

  return (
    <div className="flex h-full">
      <Sidebar />

      <div className="flex-1 flex flex-col bg-gray-100">
        <Navbar name="Product" />

        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold mb-4">Welcome to SCAPA POS!</h2>
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

      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Add New Product
            </h2>
            <form onSubmit={handleAddProduct}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                  className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={images}
                  onChange={(e) => setImages(e.target.value)}
                  className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
