import { Transaksi } from '../models/transaksiModel.js';
import midtransClient from 'midtrans-client';
import otpGenerator from 'otp-generator';

// Konfigurasi Midtrans
const snap = new midtransClient.Snap({
  isProduction: false, // Ubah ke true jika menggunakan environment production
  serverKey: process.env.SERVER_KEY, // Server Key dari Midtrans
});

// GET: Mendapatkan semua transaksi
export const getAllTransaksi = async (req, res) => {
  try {
    const transaksi = await Transaksi.find();
    res.status(200).json(transaksi);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mendapatkan transaksi', error: error.message });
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
    res.status(500).json({ message: 'Gagal mendapatkan transaksi', error: error.message });
  }
};

// POST: Membuat transaksi baru menggunakan Midtrans
export const createTransaksi = async (req, res) => {
  const { nama, email, phone, itemBelanja, metodePembayaran } = req.body;

  try {
    // Validasi data input
    // if (!nama || !email || !phone || !itemBelanja || itemBelanja.length === 0 || !metodePembayaran) {
    //   return res.status(400).json({ message: 'Semua kolom wajib diisi!' });
    // }

    // Hitung total pembayaran
    const totalBayar = itemBelanja.reduce((total, item) => total + item.subTotal, 0);

    // Generate nomor transaksi dan order ID
    const nomorTransaksi = otpGenerator.generate(10, {
      upperCase: false,
      specialChars: false,
    });

    const orderId = otpGenerator.generate(15, { upperCase: true, specialChars: false });

    // Siapkan parameter untuk Midtrans jika metode pembayaran adalah Midtrans
    let paymentUrl = null;
    let transactionToken = null;
    if (metodePembayaran === 'Midtrans') {
      const parameter = {
        transaction_details: {
          order_id: orderId,
          gross_amount: totalBayar,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: nama,
          email,
          phone,
        },
      };

      // Membuat transaksi dengan Midtrans Snap API
      const transaction = await snap.createTransaction(parameter);
      paymentUrl = transaction.redirect_url; // Ambil URL pembayaran
      transactionToken = transaction.token; // Ambil token transaksi
    }

    // Buat dokumen transaksi
    const newTransaksi = new Transaksi({
      tanggal: new Date(),
      nomorTransaksi,
      nama,
      email,
      phone,
      itemBelanja,
      totalBayar,
      metodePembayaran,
      statusPembayaran: metodePembayaran === 'Midtrans' ? 'Pending' : 'Lunas',
      orderId,
      paymentUrl,
      transactionToken,  // Simpan token transaksi
    });

    // Simpan transaksi ke database
    await newTransaksi.save();

    // Kirim respons ke klien
    res.status(201).json({
      message: 'Transaksi berhasil dibuat',
      transaksi: newTransaksi,
      transactionToken, // Kembalikan token transaksi ke klien
    });
  } catch (error) {
    res.status(500).json({
      message: 'Gagal membuat transaksi',
      error: error.message,
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
    res.status(400).json({ message: 'Gagal memperbarui status transaksi', error: error.message });
  }
};

export const createQrisTransaction = async (req, res) => {
  const { nama, email, phone, itemBelanja } = req.body;

  try {
    // Hitung total pembayaran
    const totalBayar = itemBelanja.reduce((total, item) => total + item.subTotal, 0);

    // Generate orderId untuk transaksi
    const orderId = otpGenerator.generate(15, { upperCase: true, specialChars: false });

    // Buat parameter untuk membuat transaksi QRIS
    const parameter = {
      payment_type: "qris", // Tentukan jenis pembayaran QRIS
      transaction_details: {
        order_id: orderId,
        gross_amount: totalBayar,
      },
      customer_details: {
        first_name: nama,
        email,
        phone,
      },
    };

    // Membuat transaksi menggunakan Midtrans API
    const chargeResponse = await core.api.charge(parameter);

    // Ambil QRIS URL untuk generate QR code
    const qrisUrl = chargeResponse.qr_code_url;

    // Simpan transaksi ke database
    const newTransaksi = new Transaksi({
      tanggal: new Date(),
      nama,
      email,
      phone,
      itemBelanja,
      totalBayar,
      metodePembayaran: 'QRIS',
      statusPembayaran: 'Pending',
      orderId,
      paymentUrl: qrisUrl, // Simpan QRIS URL
    });

    await newTransaksi.save();

    // Kirim QRIS URL sebagai response
    res.status(201).json({
      message: 'Transaksi QRIS berhasil dibuat',
      transaksi: newTransaksi,
      qrCodeUrl: qrisUrl, // Kirim QR Code URL untuk ditampilkan ke frontend
    });
  } catch (error) {
    res.status(500).json({
      message: 'Gagal membuat transaksi QRIS',
      error: error.message,
    });
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
    res.status(500).json({ message: 'Gagal menghapus transaksi', error: error.message });
  }
};
