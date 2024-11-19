import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a product name"],
      trim: true,
      maxLength: [100, "Product name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a product description"],
      maxLength: [1000, "Description cannot exceed 500 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a product price"],
      maxLength: [32, "Price cannot exceed 32 digits"],
      validate: {
        validator: (value) => value >= 0,
        message: "Price must be a positive number",
      },
    },
    stock: {
      type: Number,
      required: [true, "Please provide stock quantity"],
      min: [0, "Stock cannot be less than 0"],
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Please provide a product category"],
      enum: {
        values: ["electronics", "fashion", "food", "books", "furniture"],
        message: "Category must be one of: electronics, fashion, food, books, furniture",
      },
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        altText: {
          type: String,
          default: "Product Image",
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export const Product = mongoose.model("Product", productSchema);


