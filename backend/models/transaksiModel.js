import mongoose from 'mongoose';

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
  nama: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  itemBelanja: [
    {
      namaProduk: { type: String, required: true },
      jumlah: { type: Number, required: true },
      hargaSatuan: { type: Number, required: true },
      subTotal: { type: Number, required: true },
    },
  ],
  totalBayar: {
    type: Number,
    required: true,
  },
  metodePembayaran: {
    type: String,
    enum: ['Tunai', 'Kartu Kredit', 'E-Wallet', 'Transfer Bank', 'Midtrans'],
    required: true,
  },
  statusPembayaran: {
    type: String,
    enum: ['Pending', 'Lunas', 'Dibatalkan'],
    default: 'Pending',
  },
  orderId: {
    type: String,
    required: true,
  },
  paymentUrl: {
    type: String,
  },
  transactionToken: {
    type: String,
  },
});

export const Transaksi = mongoose.model('Transaksi', transaksiSchema);
