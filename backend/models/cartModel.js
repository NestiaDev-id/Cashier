const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  pelanggan: {
    type: String,
    default: 'Umum', // Pelanggan umum jika tidak terdaftar
  },
  items: [
    {
      produkId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Relasi ke skema produk
      namaProduk: { type: String, required: true },
      jumlah: { type: Number, required: true, default: 1 },
      hargaSatuan: { type: Number, required: true },
      subTotal: { type: Number, required: true }, // jumlah * hargaSatuan
    },
  ],
  totalBayar: {
    type: Number,
    required: true,
    default: 0,
  },
  dibuatPada: {
    type: Date,
    default: Date.now,
  },
});

export const Cart = mongoose.model('Cart', cartSchema);
