import React from "react";

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      {/* Product Image */}
      <img
        className="w-full h-48 object-cover"
        src={product.image}
        alt={product.name} // Alt text for accessibility
      />

      {/* Card Content */}
      <div className="flex-1 p-4">
        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>

        {/* Product Price */}
        <p className="text-blue-500 font-semibold mt-2">
          Rp{product.price.toLocaleString("id-ID")},00
        </p>

        {/* Product Description */}
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          {product.description}
        </p>

        {/* See Detail Button */}
        <button
          className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={() => alert(`See details for: ${product._id}`)}
          aria-label={`See details for ${product._id}`} // Adding aria-label for screen readers
        >
          See Detail
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
