import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import transaksiRoutes from "./routes/transaksi.js";
import productsRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure __dirname for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public"))); // Ganti folder static jika perlu

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only requests from your frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  })
);

// Routes
app.use("/api/auth/", authRoutes);
app.use("/api/product/", productsRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/transaksi/", transaksiRoutes);
app.use("/api/cart/", cartRoutes);

// Database connection and server initialization
app.listen(PORT, () => {
  connectDB(); // Pastikan fungsi ini mengatur koneksi mongoose
  console.log(`App listening at http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Backend API is running! 🚀");
});
