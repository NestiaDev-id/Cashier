import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ProductCard({ product }) {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Untuk indikator loading

  // Ambil user info dari localStorage
  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  // Fungsi untuk menambahkan item ke keranjang
  const addToCart = async (produkId) => {
    console.log("Produk ID yang diterima:", produkId);

    if (!userInfo) {
      alert("Anda harus login untuk menambahkan produk ke keranjang!");
      return;
    }

    const { _id: userId } = userInfo;
    console.log("User ID:", userId);

    try {
      setIsLoading(true); // Set loading ke true
      console.log("Mengirim permintaan ke backend...");

      // Kirim permintaan ke backend
      const response = await axios.post(
        `http://localhost:5000/api/cart/addItem/${produkId}`,
        {
          userId,
          jumlah: 1, // Jumlah default
        }
      );

      console.log("Respons dari backend:", response.data);
      alert("Produk berhasil ditambahkan ke keranjang!");
    } catch (error) {
      // Tangani error
      const errorMessage =
        error.response?.data?.message ||
        "Gagal menambahkan produk ke keranjang.";
      console.error("Error pada addToCart:", errorMessage);
      alert(errorMessage);
    } finally {
      setIsLoading(false); // Set loading ke false setelah selesai
      console.log("Proses addToCart selesai.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      {/* Product Image */}
      <img
        className="w-full h-48 object-cover"
        src={product.image || "/default-image.jpg"} // Gambar default jika tidak tersedia
        alt={product.name} // Alt text untuk aksesibilitas
      />

      {/* Card Content */}
      <div className="flex-1 p-4">
        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>

        {/* Product Price */}
        <p className="text-blue-500 font-semibold mt-2">
          Rp{product.price.toLocaleString("id-ID")},00
        </p>
        {/* Harga Price */}
        <p className="text-gray-500 mt-2">Stock: {product.stock}</p>

        {/* Product Description */}
        <p className="text-sm text-gray-600 mt-2 line-clamp-3 mb-3">
          {product.description}
        </p>

        {/* See Detail Button */}
        {userInfo?.role === "Manager" && (
          <Link
            to={`/products/detail/${product._id}`}
            className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            aria-label={`See details for ${product.name}`}
          >
            See Detail
          </Link>
        )}

        {/* Add to Cart Button */}
        {userInfo?.role === "Kasir" && (
          <button
            onClick={() => addToCart(product._id)} // Panggil fungsi dengan ID produk
            className={`mt-4 w-full px-4 py-2 rounded transition ${
              isLoading
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
            aria-label={`Add ${product.name} to cart`}
            disabled={isLoading} // Nonaktifkan tombol saat loading
          >
            {isLoading ? "Adding..." : "Add to Cart"}
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
