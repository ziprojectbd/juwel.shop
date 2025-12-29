"use client";

import React from "react";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import type { ProductCardProduct } from "./ProductCard";

export interface CartItem extends ProductCardProduct {
  quantity: number;
}

export interface CartProps {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: ProductCardProduct) => void;
  removeFromCart: (id: number) => void;
  getTotalPrice: () => number;
  setView: (
    view: "home" | "checkout" | "orders" | "order-history" | "order-details"
  ) => void;
  isLoggedIn: boolean;
  onSignInClick: () => void;
}

export default function Cart({
  cart,
  isCartOpen,
  setIsCartOpen,
  addToCart,
  removeFromCart,
  getTotalPrice,
  setView,
  isLoggedIn,
  onSignInClick,
}: CartProps) {
  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => setIsCartOpen(false)}
      ></div>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Shopping Cart
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
                <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        ৳{item.price}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 shadow"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => addToCart(item)}
                        className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center hover:bg-green-200 shadow"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  Total:
                </span>
                <span className="text-2xl font-bold text-blue-600">
                  ৳{getTotalPrice()}
                </span>
              </div>
              <button
                onClick={() => {
                  if (!isLoggedIn) {
                    // Show sign-in prompt and redirect to sign-in
                    alert("Please sign in to proceed to checkout");
                    setIsCartOpen(false);
                    onSignInClick();
                  } else {
                    setIsCartOpen(false);
                    setView("checkout");
                  }
                }}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-lg"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}