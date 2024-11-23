const Cart = require('../models/cartModel');
const Product = require('../models/productModel'); // Asumsikan productModel sudah ada

// GET: Mendapatkan keranjang pelanggan
const getCart = async (req, res) => {
  try {
    const { pelanggan } = req.params; // Ambil ID pelanggan (atau gunakan default "Umum")
    const cart = await Cart.findOne({ pelanggan });

    if (!cart) {
      return res.status(404).json({ message: 'Keranjang tidak ditemukan' });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mendapatkan keranjang', error });
  }
};

// POST: Tambahkan item ke keranjang
const addItemToCart = async (req, res) => {
  const { pelanggan, produkId, jumlah } = req.body;

  try {
    const produk = await Product.findById(produkId);
    if (!produk) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    let cart = await Cart.findOne({ pelanggan });

    // Jika keranjang tidak ada, buat baru
    if (!cart) {
      cart = new Cart({ pelanggan, items: [] });
    }

    // Cek apakah produk sudah ada di keranjang
    const itemIndex = cart.items.findIndex((item) => item.produkId.equals(produkId));

    if (itemIndex >= 0) {
      // Update jumlah dan subtotal
      cart.items[itemIndex].jumlah += jumlah;
      cart.items[itemIndex].subTotal = cart.items[itemIndex].jumlah * cart.items[itemIndex].hargaSatuan;
    } else {
      // Tambahkan item baru
      cart.items.push({
        produkId,
        namaProduk: produk.nama,
        jumlah,
        hargaSatuan: produk.harga,
        subTotal: jumlah * produk.harga,
      });
    }

    // Update total bayar
    cart.totalBayar = cart.items.reduce((total, item) => total + item.subTotal, 0);

    await cart.save();
    res.status(200).json({ message: 'Item berhasil ditambahkan ke keranjang', cart });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menambahkan item ke keranjang', error });
  }
};

// DELETE: Hapus item dari keranjang
const removeItemFromCart = async (req, res) => {
  const { pelanggan, produkId } = req.body;

  try {
    const cart = await Cart.findOne({ pelanggan });

    if (!cart) {
      return res.status(404).json({ message: 'Keranjang tidak ditemukan' });
    }

    // Filter item berdasarkan produkId
    cart.items = cart.items.filter((item) => !item.produkId.equals(produkId));

    // Update total bayar
    cart.totalBayar = cart.items.reduce((total, item) => total + item.subTotal, 0);

    await cart.save();
    res.status(200).json({ message: 'Item berhasil dihapus dari keranjang', cart });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus item dari keranjang', error });
  }
};

// POST: Checkout (Cart -> Transaksi)
const checkoutCart = async (req, res) => {
  const { pelanggan, metodePembayaran, kasir } = req.body;

  try {
    const cart = await Cart.findOne({ pelanggan });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Keranjang kosong, tidak dapat checkout' });
    }

    // Buat transaksi baru
    const transaksi = new Transaksi({
      tanggal: new Date(),
      nomorTransaksi: `TX${Date.now()}`,
      pelanggan: cart.pelanggan,
      itemBelanja: cart.items.map((item) => ({
        namaProduk: item.namaProduk,
        jumlah: item.jumlah,
        hargaSatuan: item.hargaSatuan,
        subTotal: item.subTotal,
      })),
      totalBayar: cart.totalBayar,
      metodePembayaran,
      kasir,
    });

    await transaksi.save();

    // Hapus keranjang setelah checkout
    await Cart.findOneAndDelete({ pelanggan });

    res.status(201).json({ message: 'Checkout berhasil', transaksi });
  } catch (error) {
    res.status(500).json({ message: 'Gagal melakukan checkout', error });
  }
};

module.exports = {
  getCart,
  addItemToCart,
  removeItemFromCart,
  checkoutCart,
};
