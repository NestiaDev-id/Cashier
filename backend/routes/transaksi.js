import express from "express";
import { createTransaksi, getAllTransaksi, getTransaksiById, updateTransaksiStatus, deleteTransaksi } from "../controllers/transaksiController.js";

const router = express.Router();

router.post("/create", createTransaksi);
router.get("/getall", getAllTransaksi);
router.get("/:id", getTransaksiById);
router.put("/update/:id", updateTransaksiStatus);
router.delete("/delete/:id", deleteTransaksi);


export default router;
