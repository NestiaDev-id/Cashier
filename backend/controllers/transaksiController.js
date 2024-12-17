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

export const createTransaksi = async (req, res) => {
  const { nama, email, phone, itemBelanja, metodePembayaran } = req.body;

  // Validasi input
  if (!nama || !email || !phone || !itemBelanja || itemBelanja.length === 0 || !metodePembayaran) {
    return res.status(400).json({ message: "Data transaksi tidak lengkap." });
  }

  try {
    // Hitung total pembayaran
    const totalBayar = itemBelanja.reduce((total, item) => total + item.subTotal, 0);

    // Generate nomor transaksi dan order ID
    const nomorTransaksi = otpGenerator.generate(10, { upperCase: false, specialChars: false });
    const orderId = otpGenerator.generate(15, { upperCase: true, specialChars: false });

    let paymentUrl = null;
    let transactionToken = null;

    // Jika metode pembayaran adalah Midtrans, buat transaksi dengan Snap API
    if (metodePembayaran === "Midtrans") {
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
        item_details: itemBelanja.map((item) => ({
          id: item.produkId,
          price: item.hargaSatuan,
          quantity: item.jumlah,
          name: item.namaProduk,
        })),
      };

      try {
        const transaction = await snap.createTransaction(parameter);
        paymentUrl = transaction.redirect_url; // URL untuk pengguna melakukan pembayaran
        transactionToken = transaction.token; // Token transaksi
      } catch (midtransError) {
        console.error("Error from Midtrans:", midtransError.message);
        return res.status(500).json({
          message: "Gagal memproses pembayaran dengan Midtrans.",
          error: midtransError.message,
        });
      }
    }

    // Buat dokumen transaksi di database
    const newTransaksi = new Transaksi({
      tanggal: new Date(),
      nomorTransaksi,
      nama,
      email,
      phone,
      itemBelanja,
      totalBayar,
      metodePembayaran,
      statusPembayaran: metodePembayaran === "Midtrans" ? "Pending" : "Lunas",
      orderId,
      paymentUrl,
      transactionToken,
    });

    // Simpan transaksi ke database
    await newTransaksi.save();

    // Kirim respons ke klien
    res.status(201).json({
      message: "Transaksi berhasil dibuat.",
      transaksi: newTransaksi,
      transactionToken, // Kembalikan token transaksi untuk frontend
    });
  } catch (error) {
    console.error("Error creating transaction:", error.message);
    res.status(500).json({
      message: "Gagal membuat transaksi.",
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
