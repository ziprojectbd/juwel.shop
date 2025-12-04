"use client";

import React from "react";
import { ShoppingCart, Star, CheckCircle2 } from "lucide-react";

export interface ProductCardProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  icon: React.ReactNode;
  features: string[];
  rating: number;
  reviews: number;
}

export interface ProductCardProps {
  product: ProductCardProduct;
  lastAddedProductId: number | null;
  addToCart: (product: ProductCardProduct) => void;
}

export default function ProductCard({
  product,
  lastAddedProductId,
  addToCart,
}: ProductCardProps) {
  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-75 blur transition-all duration-300 group-hover:scale-105 animate-glow"></div>

      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 overflow-hidden group hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

        <div className="absolute top-4 right-4 z-10">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-bounce-subtle">
            {Math.round(
              ((product.originalPrice - product.price) / product.originalPrice) *
                100
            )}
            % OFF
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                {product.icon}
              </div>
              <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full font-semibold border border-blue-200 dark:border-blue-700">
                {product.category}
              </span>
            </div>
            <div className="flex items-center space-x-1 group-hover:scale-110 transition-transform duration-300">
              <Star className="w-4 h-4 text-yellow-400 fill-current drop-shadow-sm" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {product.rating}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-400">
                ({product.reviews})
              </span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
            {product.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
            {product.description}
          </p>

          <div className="space-y-2 mb-6">
            {product.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 group/item"
              >
                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300 group-hover/item:text-gray-800 dark:group-hover/item:text-gray-100 transition-colors duration-300">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="group/price">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900 dark:text-white group-hover/price:text-transparent group-hover/price:bg-gradient-to-r group-hover/price:from-green-600 group-hover/price:to-emerald-600 group-hover/price:bg-clip-text transition-all duration-300">
                  ৳{product.price}
                </span>
                <span className="text-sm text-gray-400 dark:text-gray-400 line-through group-hover/price:text-red-400 transition-colors duration-300">
                  ৳{product.originalPrice}
                </span>
              </div>
              <div className="text-xs text-green-600 dark:text-green-400 font-medium group-hover/price:text-green-500 dark:group-hover/price:text-green-300 transition-colors duration-300">
                Save ৳{product.originalPrice - product.price}
              </div>
            </div>
            <div className="flex flex-col items-stretch sm:items-end flex-1">
              {lastAddedProductId === product.id && (
                <div className="mb-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-xs font-medium shadow-sm animate-slide-up">
                  <CheckCircle2 className="w-4 h-4" /> Added!
                </div>
              )}
              <button
                onClick={() => addToCart(product)}
                className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-glow font-semibold relative overflow-hidden group/btn"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <ShoppingCart className="w-4 h-4 group-hover/btn:animate-bounce-subtle" />
                  Add to Cart
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}