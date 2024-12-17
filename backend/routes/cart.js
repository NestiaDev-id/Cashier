import express from "express";
import { addItemToCart, getCart, removeItemFromCart, checkoutFromCart, getAllTransactions } from "../controllers/cartController.js";

const router = express.Router();

router.post("/addItem/:produkId", addItemToCart);
router.get("/getItem/:userId", getCart);
router.post("/removeItemFromCart/:produkId", removeItemFromCart);
router.post("/checkout", checkoutFromCart);
router.get("/getAll", getAllTransactions);

export default router;
