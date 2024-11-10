import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Berhasil Terhubung ke Database: ${conn.connection.host}`);
  } catch (error) {
    console.error("Kesalahan koneksi MongoDB:", error);
    process.exit(1);
  }
};
