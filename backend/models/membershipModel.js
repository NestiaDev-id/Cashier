const mongoose = require('mongoose');

const memberListSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  alamatRumah: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Harap masukkan alamat email yang valid',
    ],
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\+?\d{10,15}$/,
      'Harap masukkan nomor telepon yang valid dengan kode negara (contoh: +628123456789)',
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MemberList = mongoose.model('MemberList', memberListSchema);

module.exports = MemberList;
