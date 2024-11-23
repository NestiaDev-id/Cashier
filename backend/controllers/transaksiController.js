const Transaksi = require('../models/transaksiModel'); // Sesuaikan dengan path model

// GET: Mendapatkan semua transaksi
const getAllTransaksi = async (req, res) => {
  try {
    const transaksi = await Transaksi.find();
    res.status(200).json(transaksi);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mendapatkan transaksi', error });
  }
};

// GET: Mendapatkan transaksi berdasarkan ID
const getTransaksiById = async (req, res) => {
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

// POST: Menambahkan transaksi baru
const createTransaksi = async (req, res) => {
  try {
    const transaksi = new Transaksi(req.body);
    await transaksi.save();
    res.status(201).json({ message: 'Transaksi berhasil dibuat', transaksi });
  } catch (error) {
    res.status(400).json({ message: 'Gagal membuat transaksi', error });
  }
};

// PUT: Memperbarui transaksi berdasarkan ID
const updateTransaksi = async (req, res) => {
  const { id } = req.params;
  try {
    const transaksi = await Transaksi.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!transaksi) {
      return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
    }
    res.status(200).json({ message: 'Transaksi berhasil diperbarui', transaksi });
  } catch (error) {
    res.status(400).json({ message: 'Gagal memperbarui transaksi', error });
  }
};

// DELETE: Menghapus transaksi berdasarkan ID
const deleteTransaksi = async (req, res) => {
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

module.exports = {
  getAllTransaksi,
  getTransaksiById,
  createTransaksi,
  updateTransaksi,
  deleteTransaksi,
};
