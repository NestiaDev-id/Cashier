import {Cart} from '../models/cartModel.js';
import {Product} from '../models/productModel.js';
import {Transaksi} from '../models/transaksiModel.js';
import mongoose from "mongoose";

// GET: Ambil keranjang berdasarkan userId
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validasi input
    if (!userId) {
      return res.status(400).json({ message: "User ID harus diberikan" });
    }

    // Cari keranjang berdasarkan userId
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.produkId",
      model: "Product",
    });

    if (!cart) {
      return res.status(404).json({ message: "Keranjang tidak ditemukan" });
    }

    // Format respons
    const formattedResponse = {
      userId: cart.userId,
      items: cart.items.map((item) => ({
        produkId: item.produkId._id,
        namaProduk: item.produkId.name,
        jumlah: item.jumlah,
        hargaSatuan: item.produkId.price,
        subTotal: item.subTotal,
      })),
      totalBayar: cart.totalBayar,
    };

    res.status(200).json(formattedResponse);
  } catch (error) {
    console.error("Error saat mengambil keranjang:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

// POST: Tambahkan item ke keranjang
export const addItemToCart = async (req, res) => {
  console.log("Request diterima dari Frontend:", req.params, req.body); // Debug awal

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { produkId } = req.params;
    const { userId, jumlah } = req.body;

    // Validasi input
    if (!produkId || !userId || typeof jumlah !== "number" || jumlah <= 0) {
      throw new Error("Field produkId, userId harus diisi, dan jumlah harus berupa angka positif");
    }

    console.log("Validasi input berhasil");

    // Validasi produk
    const product = await Product.findById(produkId).session(session);
    if (!product) {
      console.log("Produk tidak ditemukan:", produkId);
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }
    console.log("Produk ditemukan:", product);

    // Validasi stok
    if (jumlah > product.stock) {
      console.log("Stok tidak mencukupi:", { jumlah, stock: product.stock });
      return res.status(400).json({ message: "Stok tidak mencukupi" });
    }

    console.log("Stok valid");

    // Cari atau buat keranjang
    let cart = await Cart.findOne({ userId }).session(session);
    if (!cart) {
      console.log("Keranjang baru dibuat untuk user:", userId);
      cart = new Cart({ userId, items: [], totalBayar: 0 });
    }

    // Periksa apakah item sudah ada di keranjang
    const existingItem = cart.items.find((item) => item.produkId.equals(produkId));
    if (existingItem) {
      console.log("Produk sudah ada di keranjang, update jumlah");
      existingItem.jumlah += jumlah;
      existingItem.subTotal += jumlah * product.price;
    } else {
      console.log("Produk baru ditambahkan ke keranjang");
      cart.items.push({
        produkId,
        jumlah,
        hargaSatuan: product.price,
        subTotal: jumlah * product.price,
      });
    }

    // Update total bayar
    cart.totalBayar = cart.items.reduce((total, item) => total + item.subTotal, 0);
    console.log("Total bayar diperbarui:", cart.totalBayar);

    // Kurangi stok produk
    product.stock -= jumlah;
    console.log("Stok produk setelah dikurangi:", product.stock);

    // Simpan perubahan
    await product.save({ session });
    await cart.save({ session });

    console.log("Perubahan disimpan");

    await session.commitTransaction();
    session.endSession();

    // Format respons
    const formattedResponse = {
      cart: {
        userId: cart.userId,
        items: await Promise.all(
          cart.items.map(async (item) => {
            const productDetails = await Product.findById(item.produkId)
              .select("name price")
              .exec();
            return {
              produkId: item.produkId,
              namaProduk: productDetails.name,
              jumlah: item.jumlah,
              hargaSatuan: productDetails.price,
              subTotal: item.subTotal,
            };
          })
        ),
        totalBayar: cart.totalBayar,
      },
    };

    console.log("Respons format:", formattedResponse);

    res.status(200).json(formattedResponse);
  } catch (error) {
    console.error("Error pada proses addItemToCart:", error.message);
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};

// DELETE: Hapus item dari keranjang
export const removeItemFromCart = async (req, res) => {
  console.log("Data dari Frontend:", { params: req.params, body: req.body });

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { produkId } = req.params;
    const { userId, jumlah } = req.body;

    // Validasi input
    if (!produkId || !userId || typeof jumlah !== "number" || jumlah <= 0) {
      throw new Error("Field produkId, userId harus diisi dan jumlah harus berupa angka positif");
    }

    // Cari keranjang berdasarkan userId
    const cart = await Cart.findOne({ userId }).session(session);
    if (!cart) {
      return res.status(404).json({ message: "Keranjang tidak ditemukan" });
    }

    // Temukan item di dalam keranjang
    const existingItem = cart.items.find((item) => item.produkId.equals(produkId));
    if (!existingItem) {
      return res.status(404).json({ message: "Produk tidak ditemukan di keranjang" });
    }

    console.log('soidjaojda: ',existingItem)

    // Validasi harga satuan
    if (typeof existingItem.hargaSatuan !== "number") {
      throw new Error("Harga satuan produk tidak valid");
    }

    console.log("Jumlah sebelum pengurangan:", existingItem.jumlah);

    // Kurangi jumlah produk
    existingItem.jumlah -= jumlah;
    existingItem.subTotal = existingItem.jumlah * existingItem.hargaSatuan;

    console.log("SubTotal setelah pengurangan:", existingItem.subTotal);

    // Jika jumlah menjadi 0 atau kurang, hapus item dari keranjang
    if (existingItem.jumlah <= 0) {
      cart.items = cart.items.filter((item) => !item.produkId.equals(produkId));
    }

    // Perbarui total bayar
    cart.totalBayar = cart.items.reduce((total, item) => total + item.subTotal, 0);

    console.log("Total bayar keranjang:", cart.totalBayar);

    // Update stok produk
    const product = await Product.findById(produkId).session(session);
    if (!product) {
      throw new Error("Produk tidak ditemukan");
    }
    product.stock += jumlah;

    // Simpan perubahan
    await product.save({ session });
    await cart.save({ session });

    await session.commitTransaction();
    session.endSession();

    // Format respons
    const formattedResponse = {
      cart: {
        userId: cart.userId,
        items: cart.items.map((item) => ({
          produkId: item.produkId,
          jumlah: item.jumlah,
          subTotal: item.subTotal,
        })),
        totalBayar: cart.totalBayar,
      },
    };

    res.status(200).json(formattedResponse);
  } catch (error) {
    console.error("Error pada proses removeItemFromCart:", error.message);
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};


// POST: Checkout (Cart -> Transaksi)
// POST: Checkout from Cart to create a Transaksi
export const checkoutFromCart = async (req, res) => {
  console.log("Data dari Frontend:", { body: req.body.items });
  const { userId, metodePembayaran } = req.body; // Mendapatkan userId dan metodePembayaran dari request body

  try {
    // Cari keranjang berdasarkan userId dan populasi detail produk
    const cart = await Cart.findOne({ userId })
    console.log(cart);
    
    
    // Jika keranjang kosong atau tidak ditemukan
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Keranjang kosong, tidak dapat checkout' });
    }

    console.log("Items dari keranjang:", cart.items);

    // Hitung total pembayaran berdasarkan subtotal dari setiap item
    const totalBayar = cart.items.reduce((total, item) => total + item.subTotal, 0);

    
    // Generate nomor transaksi dan orderId
    const nomorTransaksi = `TX${Date.now()}`;
    const orderId = `ORD${Date.now()}`;
    
    console.log(totalBayar)
    // Buat dokumen transaksi baru
    const transaksi = new Transaksi({
      tanggal: new Date(),
      nomorTransaksi,
      nama: 'Customer Name', // Dapatkan nama dari user jika tersedia
      email: 'customer@example.com', // Dapatkan email dari user jika tersedia
      phone: '1234567890', // Dapatkan nomor telepon dari user jika tersedia
      itemBelanja: cart.items.map(item => ({
        namaProduk: "items1", // Mengambil nama produk dari data produk yang dipopulasi
        jumlah: item.jumlah,
        hargaSatuan: item.hargaSatuan,
        subTotal: item.subTotal,
      })),
      totalBayar,
      metodePembayaran,
      statusPembayaran: 'Pending', // Set status pembayaran ke Pending hingga pembayaran selesai
      orderId,
      paymentUrl: null, // Nanti diisi setelah integrasi dengan gateway pembayaran
      transactionToken: null, // Nanti diisi setelah integrasi dengan gateway pembayaran
    });

    // Simpan transaksi ke database
    const saveTransaksi = await transaksi.save();
    console.log(saveTransaksi);
    

    // Hapus keranjang setelah checkout berhasil
    await Cart.deleteOne({ userId });

    // Kirimkan respon sukses ke frontend dengan detail transaksi
    res.status(201).json({
      message: 'Checkout berhasil',
      product: saveTransaksi 
      // transaksi, // Kirim detail transaksi ke frontend
    });

  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    res.status(500).json({ message: 'Gagal melakukan checkout', error });
  }
};


export const getAllTransactions = async (req, res) => {
  try {
    // Cari semua transaksi di database
    const transactions = await Transaksi.find(); // Anda dapat menggunakan .find({}) jika ingin memfilter
    console.log("Semua transaksi:", transactions);

    // Jika tidak ada transaksi ditemukan
    if (transactions.length === 0) {
      return res.status(404).json({ message: "Tidak ada transaksi yang ditemukan" });
    }

    // Kirim semua transaksi ke frontend
    res.status(200).json({
      message: "Berhasil mendapatkan semua transaksi",
      transactions,
    });
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    res.status(500).json({ message: "Gagal mendapatkan transaksi", error });
  }
};

