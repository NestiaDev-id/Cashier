import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

function ShowProduct() {
  const { id } = useParams(); // Capture the product ID from the URL
  const navigate = useNavigate(); // For navigation
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Controls the delete confirmation modal
  const [editModal, setEditModal] = useState(false); // Controls the edit modal
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    // Fetch the product details from the API
    axios
      .get(`http://localhost:5000/api/product/${id}`)
      .then((response) => {
        setProduct(response.data.product);
        setFormData({
          name: response.data.product.name,
          description: response.data.product.description,
          price: response.data.product.price,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load product details.");
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    // Delete the product using the API
    axios
      .delete(`http://localhost:5000/api/product/delete/${id}`)
      .then(() => {
        alert("Product deleted successfully!");
        navigate("/products");
      })
      .catch((err) => {
        alert("Failed to delete the product.");
      });
  };

  const handleEditChange = (e) => {
    // Update form data as the user types
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditSubmit = () => {
    // Send updated product data to the API
    axios
      .put(`http://localhost:5000/api/product/edit/${id}`, formData)
      .then((response) => {
        alert("Product updated successfully!");
        setProduct(response.data.product); // Update the local state with the new product data
        setEditModal(false); // Close the modal
      })
      .catch((err) => {
        console.log(err.message);

        alert("Failed to update the product.");
      });
  };

  const toggleDeleteModal = () => setShowModal(!showModal); // Toggle delete confirmation modal
  const toggleEditModal = () => setEditModal(!editModal); // Toggle edit modal

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center bg-gray-100 py-10 px-6">
      {/* Product Image */}
      <div className="w-full lg:w-1/2 flex justify-center mb-6 lg:mb-0">
        <img
          src={product.image || "default-image.jpg"}
          alt={product.name}
          className="max-w-full h-auto rounded-lg shadow-lg"
        />
      </div>

      {/* Product Info */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start lg:ml-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {product.name}
        </h1>
        <p className="text-lg text-gray-600 mb-4">{product.description}</p>
        <p className="text-xl font-semibold text-gray-900 mb-4">
          Harga: Rp {product.price.toLocaleString()}
        </p>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Kembali
          </button>
          <button
            onClick={toggleEditModal}
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
          >
            Edit
          </button>
          <button
            onClick={toggleDeleteModal}
            className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300"
          >
            Hapus
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Apakah Anda yakin ingin menghapus produk ini?
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={toggleDeleteModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Edit Produk
            </h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                Nama Produk
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleEditChange}
                className="w-full p-2 border rounded-lg mt-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700">
                Deskripsi
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleEditChange}
                className="w-full p-2 border rounded-lg mt-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-700">
                Harga
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleEditChange}
                className="w-full p-2 border rounded-lg mt-2"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={toggleEditModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowProduct;
