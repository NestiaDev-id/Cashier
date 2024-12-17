import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    items: [
      {
        produkId: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
        jumlah: { type: Number, required: true },
        hargaSatuan: { type: Number, required: true },
        subTotal: { type: Number, required: true },
      },
    ],
    totalBayar: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Carts", cartSchema);
