const MemberList = require('../models/memberListModel');

// GET: Mendapatkan semua anggota
const getAllMembers = async (req, res) => {
  try {
    const members = await MemberList.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mendapatkan daftar anggota', error });
  }
};

// GET: Mendapatkan anggota berdasarkan ID
const getMemberById = async (req, res) => {
  const { id } = req.params;
  try {
    const member = await MemberList.findById(id);
    if (!member) {
      return res.status(404).json({ message: 'Anggota tidak ditemukan' });
    }
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mendapatkan anggota', error });
  }
};

// POST: Membuat anggota baru
const createMember = async (req, res) => {
  const { username, alamatRumah, emailAddress, phoneNumber } = req.body;

  try {
    // Cek apakah username atau email sudah ada
    const existingMember = await MemberList.findOne({
      $or: [{ username }, { emailAddress }],
    });

    if (existingMember) {
      return res.status(400).json({
        message: 'Username atau email sudah terdaftar',
      });
    }

    const newMember = new MemberList({
      username,
      alamatRumah,
      emailAddress,
      phoneNumber,
    });

    await newMember.save();
    res.status(201).json({ message: 'Anggota berhasil ditambahkan', newMember });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menambahkan anggota', error });
  }
};

// PUT: Update anggota berdasarkan ID
const updateMember = async (req, res) => {
  const { id } = req.params;
  const { username, alamatRumah, emailAddress, phoneNumber } = req.body;

  try {
    const member = await MemberList.findById(id);
    if (!member) {
      return res.status(404).json({ message: 'Anggota tidak ditemukan' });
    }

    member.username = username || member.username;
    member.alamatRumah = alamatRumah || member.alamatRumah;
    member.emailAddress = emailAddress || member.emailAddress;
    member.phoneNumber = phoneNumber || member.phoneNumber;

    await member.save();
    res.status(200).json({ message: 'Anggota berhasil diperbarui', member });
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui anggota', error });
  }
};

// DELETE: Menghapus anggota berdasarkan ID
const deleteMember = async (req, res) => {
  const { id } = req.params;

  try {
    const member = await MemberList.findByIdAndDelete(id);
    if (!member) {
      return res.status(404).json({ message: 'Anggota tidak ditemukan' });
    }
    res.status(200).json({ message: 'Anggota berhasil dihapus', member });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus anggota', error });
  }
};

module.exports = {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
};
