"use client";

import React from "react";
import { Wallet, Copy, QrCode } from "lucide-react";
import type { CartItem } from "./Cart";

export interface CheckoutProps {
  cart: CartItem[];
  paymentMethod: "bkash" | "nagad" | "crypto";
  setPaymentMethod: (method: "bkash" | "nagad" | "crypto") => void;
  payerNumber: string;
  setPayerNumber: (value: string) => void;
  trxId: string;
  setTrxId: (value: string) => void;
  copiedAddress: boolean;
  setCopiedAddress: (value: boolean) => void;
  getTotalPrice: () => number;
  onOrderConfirmed: () => void;
}

export default function Checkout({
  cart,
  paymentMethod,
  setPaymentMethod,
  payerNumber,
  setPayerNumber,
  trxId,
  setTrxId,
  copiedAddress,
  setCopiedAddress,
  getTotalPrice,
  onOrderConfirmed,
}: CheckoutProps) {
  const hasCartItems = cart.length > 0;
  const isCrypto = paymentMethod === "crypto";
  const isBDMobileMethod = paymentMethod === "bkash" || paymentMethod === "nagad";
  const isValidBDPhoneStrict = (val: string) => /^\+8801[3-9]\d{8}$/.test(val);
  const payerFilled = isCrypto
    ? payerNumber.trim().length >= 10
    : isValidBDPhoneStrict(payerNumber);
  const trxFilled = trxId.trim().length >= 6;
  const canConfirm = hasCartItems && payerFilled && trxFilled;

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Checkout
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Complete your purchase securely
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order summary */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              {cart.length === 0 ? (
                <div className="text-gray-500 dark:text-gray-400">
                  Your cart is empty.
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Qty: {item.quantity}
                        </div>
                      </div>
                      <div className="font-semibold">
                        ৳{item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-4 flex items-center justify-between">
                    <div className="text-lg font-semibold">Total</div>
                    <div className="text-2xl font-bold text-blue-600">
                      ৳{getTotalPrice()}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Payment method */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
              <div className="space-y-4">
                {/* bKash */}
                <label
                  className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer ${
                    paymentMethod === "bkash"
                      ? "border-pink-500 bg-pink-50 dark:bg-pink-500/10"
                      : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Wallet className="w-5 h-5 text-pink-600" />
                    <div>
                      <div className="font-medium">bKash</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Send money to merchant number
                      </div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "bkash"}
                    onChange={() => setPaymentMethod("bkash")}
                  />
                </label>

                {/* Nagad */}
                <label
                  className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer ${
                    paymentMethod === "nagad"
                      ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10"
                      : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Wallet className="w-5 h-5 text-orange-600" />
                    <div>
                      <div className="font-medium">Nagad</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Send money to merchant number
                      </div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "nagad"}
                    onChange={() => setPaymentMethod("nagad")}
                  />
                </label>

                {/* Crypto */}
                <label
                  className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer ${
                    paymentMethod === "crypto"
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10"
                      : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      ₮
                    </div>
                    <div>
                      <div className="font-medium">USDT (TRC20)</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Pay with cryptocurrency
                      </div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "crypto"}
                    onChange={() => setPaymentMethod("crypto")}
                  />
                </label>

                {/* bKash instructions */}
                {paymentMethod === "bkash" && (
                  <div className="mt-2 rounded-xl border border-pink-200 dark:border-pink-400/30 bg-pink-50 dark:bg-pink-500/10 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          bKash Number
                        </div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white allow-copy">
                          01733019261
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          navigator.clipboard.writeText("01733019261")
                        }
                        className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-white dark:bg-transparent text-pink-600 border border-pink-200 dark:border-pink-400/40 hover:bg-pink-100 dark:hover:bg-pink-500/10"
                      >
                        <Copy className="w-4 h-4" /> Copy
                      </button>
                    </div>
                    <ul className="mt-3 text-sm text-gray-700 dark:text-gray-300 list-disc pl-5 space-y-1">
                      <li>Open bKash app and choose Send Money</li>
                      <li>
                        Enter the number above and amount: ৳{getTotalPrice()}
                      </li>
                      <li>Confirm payment and copy the Transaction ID</li>
                    </ul>
                  </div>
                )}

                {/* Nagad instructions */}
                {paymentMethod === "nagad" && (
                  <div className="mt-2 rounded-xl border border-orange-200 dark:border-orange-400/30 bg-orange-50 dark:bg-orange-500/10 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          Nagad Number
                        </div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white allow-copy">
                          01733019261
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          navigator.clipboard.writeText("01733019261")
                        }
                        className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-white dark:bg-transparent text-orange-600 border border-orange-200 dark:border-orange-400/40 hover:bg-orange-100 dark:hover:bg-orange-500/10"
                      >
                        <Copy className="w-4 h-4" /> Copy
                      </button>
                    </div>
                    <ul className="mt-3 text-sm text-gray-700 dark:text-gray-300 list-disc pl-5 space-y-1">
                      <li>Open Nagad app and choose Send Money</li>
                      <li>
                        Enter the number above and amount: ৳{getTotalPrice()}
                      </li>
                      <li>Confirm payment and copy the Transaction ID</li>
                    </ul>
                  </div>
                )}

                {/* Crypto instructions */}
                {paymentMethod === "crypto" && (
                  <div className="mt-2 rounded-xl border border-blue-200 dark:border-blue-400/30 bg-blue-50 dark:bg-blue-500/10 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          USDT Wallet Address (TRC20)
                        </div>
                        <div className="text-sm font-mono text-gray-900 dark:text-white bg-white dark:bg-gray-800 p-2 rounded border border-gray-300 dark:border-gray-600">
                          TXYZopQOMcEZ6JqZJzZjZzZzZzZzZzZzZzZ
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            "TXYZopQOMcEZ6JqZJzZjZzZzZzZzZzZzZzZ"
                          );
                          setCopiedAddress(true);
                          setTimeout(() => setCopiedAddress(false), 2000);
                        }}
                        className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-white dark:bg-transparent text-blue-600 border border-blue-200 dark:border-blue-400/40 hover:bg-blue-100 dark:hover:bg-blue-500/10"
                      >
                        <Copy className="w-4 h-4" />{" "}
                        {copiedAddress ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <ul className="mt-3 text-sm text-gray-700 dark:text-gray-300 list-disc pl-5 space-y-1">
                      <li>Send only USDT on TRC20 network</li>
                      <li>Send exact amount: ${getTotalPrice()}</li>
                      <li>Transaction hash will be your receipt</li>
                    </ul>

                    <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-center mb-2">
                        <QrCode className="w-32 h-32 text-gray-800 dark:text-white" />
                      </div>
                      <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                        Scan QR code for USDT payment
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Payment details */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                  {paymentMethod === "crypto"
                    ? "Your Wallet Address"
                    : "Your Payment Number"}
                </label>
                <input
                  type={paymentMethod === "crypto" ? "text" : "tel"}
                  value={payerNumber}
                  onChange={(e) => {
                    if (isBDMobileMethod) {
                      let v = e.target.value;
                      v = v.replace(/[^+\d]/g, "");
                      if (v === "+") v = "+880";
                      if (v.startsWith("880")) v = "+" + v;
                      if (v.startsWith("01")) v = "+880" + v.slice(1);
                      if (v.startsWith("1")) v = "+880" + v;
                      if (!v.startsWith("+880")) {
                        if (v === "" || v === "+") v = "+880";
                      }
                      if (v.length > 14) v = v.slice(0, 14);
                      setPayerNumber(v);
                    } else {
                      setPayerNumber(e.target.value);
                    }
                  }}
                  className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                />
                {isBDMobileMethod &&
                  payerNumber &&
                  !isValidBDPhoneStrict(payerNumber) && (
                    <p className="mt-1 text-xs text-red-500">
                      Enter a valid Bangladeshi number like +8801XXXXXXXXX.
                    </p>
                  )}
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                  Transaction ID / Hash
                </label>
                <input
                  type="text"
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2">
                Make sure you have sent the exact amount to the correct account
                and pasted the correct Transaction ID / Hash. Your payment will
                be verified manually for security.
              </div>
              <button
                type="button"
                disabled={!canConfirm}
                onClick={() => {
                  if (!canConfirm) return;
                  alert(
                    "Thank you! Your order has been submitted. We will verify the payment and contact you shortly."
                  );
                  onOrderConfirmed();
                }}
                className={`w-full mt-1 inline-flex items-center justify-center px-4 py-3 rounded-lg text-sm font-semibold shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:cursor-not-allowed disabled:opacity-60 ${
                  canConfirm
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300"
                }`}
              >
                Confirm Order Securely
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}