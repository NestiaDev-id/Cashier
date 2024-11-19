import {Product} from '../models/productModel.js';

export const addProduct = async (req, res, next) => {
    const { name, description, price, stock, category, images, seller } = req.body;

  try {
    const product = new Product({
      name,
      description,
      price,
      stock,
      category,
      images,
      seller,
    });

    const savedProduct = await product.save();
    res.status(201).json({ success: true, product: savedProduct });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}
export const getAllProduct = async (req,res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, products });
      } catch (err) {
        res.status(500).json({ success: false, message: err.message });
      }
}
export const detailProduct = async (req,res) => {
    try {
        const product = await Product.findById(req.params.id);
    
        if (!product) {
          return res.status(404).json({ success: false, message: "Product not found" });
        }
    
        res.status(200).json({ success: true, product });
      } catch (err) {
        res.status(500).json({ success: false, message: err.message });
      }
}
export const editProduct = async (req,res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true, runValidators: true } // Mengembalikan produk terbaru dengan validasi
        );
    
        if (!updatedProduct) {
          return res.status(404).json({ success: false, message: "Product not found" });
        }
    
        res.status(200).json({ success: true, product: updatedProduct });
      } catch (err) {
        res.status(400).json({ success: false, message: err.message });
      }
}
export const deleteProduct = async (req,res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    
        if (!deletedProduct) {
          return res.status(404).json({ success: false, message: "Product not found" });
        }
    
        res.status(200).json({ success: true, message: "Product deleted successfully" });
      } catch (err) {
        res.status(500).json({ success: false, message: err.message });
      }
}