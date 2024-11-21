import express from "express";
import { addProduct, getAllProduct, detailProduct, editProduct, deleteProduct } from "../controllers/productController.js";
import { User } from "../models/userModel.js";

const router = express.Router();

router.get('/getall', async (req, res) => {
     try {
        // Ambil semua user dari database
        const users = await User.find({}, "-password"); // Mengabaikan field password
        res.status(200).json(users);
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Failed to fetch users." });
      }
})


export default router;
