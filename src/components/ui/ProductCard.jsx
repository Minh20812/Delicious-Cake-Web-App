import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="group">
      <Link
        to={`/product/${product.id}`}
        className="block overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
      >
        <div className="relative pb-[100%] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="font-playfair text-xl text-brown">{product.name}</h3>
          <p className="text-sm text-brown/70 mt-1 line-clamp-2">
            {product.description}
          </p>
          <div className="flex justify-between items-center mt-3">
            <span className="text-brown font-semibold">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-xs px-2 py-1 bg-[#FFD6DC]/30 text-brown rounded-full">
              {product.category}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
