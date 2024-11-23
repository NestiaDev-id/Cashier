const mongoose = require('mongoose');

const transaksiSchema = new mongoose.Schema({
  tanggal: {
    type: Date,
    default: Date.now,
  },
  nomorTransaksi: {
    type: String,
    required: true,
    unique: true,
  },
  pelanggan: {
    type: String,
    default: 'Umum', // Pelanggan umum jika tidak terdaftar
  },
  itemBelanja: [
    {
      namaProduk: { type: String, required: true },
      jumlah: { type: Number, required: true },
      hargaSatuan: { type: Number, required: true },
      subTotal: { type: Number, required: true }, // jumlah * hargaSatuan
    },
  ],
  totalBayar: {
    type: Number,
    required: true,
  },
  metodePembayaran: {
    type: String,
    enum: ['Tunai', 'Kartu Kredit', 'E-Wallet', 'Transfer Bank'],
    required: true,
  },
  statusPembayaran: {
    type: String,
    enum: ['Lunas', 'Belum Lunas'],
    default: 'Lunas',
  },
  kasir: {
    type: String,
    required: true,
  },
});

export const Transaksi = mongoose.model('Transaksi', transaksiSchema);