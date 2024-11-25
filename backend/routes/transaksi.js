import express from "express";
import { createTransaksi, getAllTransaksi, getTransaksiById, updateTransaksiStatus, deleteTransaksi } from "../controllers/transaksiController.js";

const router = express.Router();

router.post("/create", createTransaksi);
// router.get("/all", getAllProduct);
// router.get("/:id", detailProduct);
// router.put("/edit/:id", editProduct);
// router.delete("/delete/:id", deleteProduct);


export default router;
