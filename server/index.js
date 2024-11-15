import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.js";

dotenv.config(); // Memuat variabel dari .env

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

// koneksi ke database

app.listen(PORT, () => {
  connectDB();
  console.log("listening on port: ", PORT);
});

// mongoose
//   .connect(process.env.MONGODB_URL)
//   .then(() => {
//     console.log("Berhasil Terhubung ke Database");
//     app.listen(process.env.PORT, () => {
//       console.log(`App listening at http://localhost:${process.env.PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error("Kesalahan koneksi MongoDB:", error);
//   });
