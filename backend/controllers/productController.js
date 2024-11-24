import {Product} from '../models/productModel.js';

export const addProduct = async (req, res, next) => {
    const { name, description, price, stock, category, images, } = req.body;

  try {
    if (!name || !price || !stock ) {
        throw new Error ('All fields are required');
    }
    const product = new Product({
      name,
      description,
      price,
      stock,
      category,
      images,
    });

    const savedProduct = await product.save();

    res.status(201).json({ 
        success: true, 
        message: "Product berhasil ditambahkan", 
        product: savedProduct 
    });
  } catch (err) {
    console.error("Terjadi kesalahan dalam menambahkan product", err.message);
    console.log(err);
    
    res.status(400).json({ 
        success: false, 
        message: err.message ,
        details: err.error
    });
  }
}

// export const getAllProduct = async (req,res) => {
//     try {
//         const products = await Product.find();
//         res.status(200).json({ success: true, products });
//       } catch (err) {
//         res.status(500).json({ success: false, message: err.message });
//       }
// }


export const getAllProduct = async (req,res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const products = await Product.find()
      .skip((page - 1) * limit) // Skip produk yang sudah ditampilkan
      .limit(Number(limit)); // Batasi jumlah produk yang diambil

    const totalProducts = await Product.countDocuments(); // Total produk untuk menghitung jumlah halaman

    res.json({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: "Gagal memuat produk", error });
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
          { new: true, runValidators: true } 
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