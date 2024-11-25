import { Transaksi } from '../models/transaksiModel.js';
import midtransClient from 'midtrans-client';


// Konfigurasi Midtrans
const snap = new midtransClient.Snap({
  isProduction: false, // Ubah ke true jika menggunakan environment production
  serverKey: process.env.SERVER_KEY, // Ganti dengan Server Key dari akun Midtrans Anda
  clientKey: process.env.CLIENT_KEY, // Ganti dengan Client Key dari akun Midtrans Anda
});

// GET: Mendapatkan semua transaksi
export const getAllTransaksi = async (req, res) => {
  try {
    const transaksi = await Transaksi.find();
    res.status(200).json(transaksi);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mendapatkan transaksi', error });
  }
};

// GET: Mendapatkan transaksi berdasarkan ID
export const getTransaksiById = async (req, res) => {
  const { id } = req.params;
  try {
    const transaksi = await Transaksi.findById(id);
    if (!transaksi) {
      return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
    }
    res.status(200).json(transaksi);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mendapatkan transaksi', error });
  }
};

// POST: Menambahkan transaksi baru dengan Midtrans
// POST: Menambahkan transaksi baru dengan Midtrans
export const createTransaksi = async (req, res) => {
  const { userId, items, totalAmount, customerDetails } = req.body;

  // Validasi input
  if (!userId || !items || !totalAmount || !customerDetails) {
    return res.status(400).json({
      message: "Data transaksi tidak lengkap. Harap cek kembali input Anda.",
    });
  }

  // Persiapan data untuk Midtrans
  const transactionDetails = {
    order_id: `ORDER-${new Date().getTime()}`, // ID unik untuk transaksi
    gross_amount: totalAmount,
  };

  const itemDetails = items.map(item => ({
    id: item.id || 'unknown',
    price: item.price || 0,
    quantity: item.quantity || 1,
    name: item.name || 'Item Tanpa Nama',
  }));

  const customerDetailsFormatted = {
    first_name: customerDetails.firstName || "Guest",
    last_name: customerDetails.lastName || "",
    email: customerDetails.email || "guest@example.com",
    phone: customerDetails.phone || "0000000000",
  };

  const parameter = {
    transaction_details: transactionDetails,
    item_details: itemDetails,
    customer_details: customerDetailsFormatted,
  };

  try {
    // Membuat transaksi di Midtrans
    const midtransResponse = await snap.createTransaction(parameter);

    if (!midtransResponse.redirect_url) {
      throw new Error("Midtrans tidak memberikan redirect_url");
    }

    // Simpan data transaksi ke database
    const transaksi = new Transaksi({
      userId,
      items,
      totalAmount,
      orderId: transactionDetails.order_id,
      paymentUrl: midtransResponse.redirect_url,
      status: "pending",
    });
    await transaksi.save();

    // Kirim response ke client
    res.status(201).json({
      message: "Transaksi berhasil dibuat",
      transaksi,
      paymentUrl: midtransResponse.redirect_url,
    });
  } catch (error) {
    console.error("Error saat membuat transaksi:", error);

    // Respons error lebih informatif
    res.status(500).json({
      message: "Gagal membuat transaksi",
      error: error.message,
      detail: error?.ApiResponse || null,
    });
  }
};

// PUT: Memperbarui status transaksi berdasarkan notifikasi Midtrans
export const updateTransaksiStatus = async (req, res) => {
  const { orderId, status } = req.body;

  try {
    const transaksi = await Transaksi.findOneAndUpdate(
      { orderId },
      { status },
      { new: true, runValidators: true }
    );

    if (!transaksi) {
      return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
    }

    res.status(200).json({
      message: 'Status transaksi berhasil diperbarui',
      transaksi,
    });
  } catch (error) {
    res.status(400).json({ message: 'Gagal memperbarui status transaksi', error });
  }
};

// DELETE: Menghapus transaksi berdasarkan ID
export const deleteTransaksi = async (req, res) => {
  const { id } = req.params;
  try {
    const transaksi = await Transaksi.findByIdAndDelete(id);
    if (!transaksi) {
      return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
    }
    res.status(200).json({ message: 'Transaksi berhasil dihapus', transaksi });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus transaksi', error });
  }
};
