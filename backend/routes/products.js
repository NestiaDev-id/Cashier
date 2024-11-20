import express from "express";
import { addProduct, getAllProduct, detailProduct, editProduct, deleteProduct } from "../controllers/productController.js";

const router = express.Router();

router.post("/add", addProduct);
router.get("/all", getAllProduct);
router.get("/:id", detailProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);


export default router;
