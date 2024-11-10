import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.js";

dotenv.config(); // Memuat variabel dari .env

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes);

// koneksi ke database

app.listen(3000, () => {
  connectDB();
  console.log("listening on port 3000");
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
