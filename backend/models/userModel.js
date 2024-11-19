import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Tolong Masukkan Email anda"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Tolong Masukkan Password anda"],
    },
    name: {
      type: String,
      required: [true, "Tolong Masukkan Nama anda"],
    },
    role: {
      type: String,
      enum: ["Manager", "Kasir"], // Role 
      default: "Kasir", // Atur default ke "Customer" jika tidak ditentukan
    },
    
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordTokenSecret: String,
    verificationToken: String,
    verificationTokenExpireAt: Date,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
