import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { Link } from "react-router-dom";
import { Dialog } from "@headlessui/react"; // Import untuk modal
import { data } from "autoprefixer";

function Products() {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [userInfo, setUserInfo] = useState(null);
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State modal
  const [email, setEmail] = useState(""); // Input email pelanggan

  const productsPerPage = 5;

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(
        `http://localhost:5000/api/product/all?page=${currentPage}&limit=${productsPerPage}`
      )
      .then((response) => {
        setProduct(response.data.products);
        setTotalProducts(response.data.totalProducts);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load products.");
        setLoading(false);
      });
  }, [currentPage]);

  useEffect(() => {
    if (userInfo) {
      axios
        .get(`http://localhost:5000/api/cart/getItem/${userInfo._id}`)
        .then((response) => {
          setCart(response.data.items || []);
        })
        .catch(() => {
          setCart([]);
        });
    } else {
      setCart([]);
    }
  }, [userInfo]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleBayar = () => {
    // Pastikan email telah diinput

    // Cek apakah keranjang kosong
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items to your cart.");
      return;
    }

    // Menyiapkan data yang akan dikirimkan
    const dataCheckout = {
      userId: userInfo._id, // Menggunakan ID pengguna yang sudah diambil dari localStorage
      email: email,
      items: cart.map((item) => ({
        produkId: item.produkId,
        jumlah: item.jumlah,
        hargaSatuan: item.hargaSatuan,
        subTotal: item.subTotal,
      })),
      totalBayar: cart.reduce((total, item) => total + item.subTotal, 0),
      metodePembayaran: "Midtrans", // Anda bisa memilih metode pembayaran sesuai kebutuhan
    };
    // console.log(dataCheckout.items.map(item =>);

    // Kirim data checkout ke backend
    axios
      .post("http://localhost:5000/api/cart/checkout", dataCheckout)
      .then((response) => {
        // Setelah checkout berhasil, redirect ke halaman pembayaran atau tampilkan pesan sukses
        alert("Checkout successful! Redirecting to payment...");
        window.location.href = response.data.transaksi.paymentUrl; // Redirect ke Midtrans payment page
      })
      .catch((error) => {
        // alert("Failed to process checkout.");
        console.error(error);
      });
  };

  const handleEmailSubmit = () => {
    alert(`Email pelanggan: ${email}`);
    setIsModalOpen(false); // Close modal after submitting email
    alert("Proceeding to payment...");
  };

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-100">
        <Navbar name="Product" />
        <main className="flex-1 flex flex-row p-6">
          <div className="flex-1 bg-white rounded-lg shadow p-6 mr-4">
            <div className="flex justify-between items-center mb-4">
              <div className="ml-auto flex space-x-4">
                {userInfo?.role === "manager" && (
                  <Link
                    to="/addProduct"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                  >
                    Tambah
                  </Link>
                )}
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
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

                <div className="flex justify-between items-center mt-6">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:bg-gray-200"
                  >
                    Previous
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:bg-gray-200"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="w-1/3 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold mb-4">Keranjang</h2>
            {cart.length === 0 ? (
              <p className="text-gray-600">Keranjang kosong.</p>
            ) : (
              <ul>
                {cart.map((item) => (
                  <li
                    key={item.produkId}
                    className="flex justify-between items-center mb-4"
                  >
                    <div>
                      <p className="text-gray-800 font-medium">
                        {item.namaProduk}
                      </p>
                      <p className="text-sm text-gray-600">
                        {item.jumlah} x Rp
                        {item.hargaSatuan.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <p className="text-gray-800 font-semibold">
                      Rp{item.subTotal.toLocaleString("id-ID")}
                    </p>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={handleBayar}
              className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Bayar
            </button>
          </div>
        </main>
      </div>

      {/* Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <Dialog.Title className="text-lg font-bold">
            Apakah Anda Member?
          </Dialog.Title>
          <div className="mt-4">
            <button
              className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => setEmail("")}
            >
              Ya, Masukkan Email
            </button>
            {email && (
              <div className="mt-4">
                <input
                  type="email"
                  placeholder="Masukkan email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                />
                <button
                  onClick={handleEmailSubmit}
                  className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default Products;
