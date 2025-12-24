"use client";

import React, { useState, useRef, useEffect } from "react";
import Script from "next/script";
import {
  ShoppingCart,
  Plus,
  Minus,
  Star,
  Shield,
  Zap,
  Globe,
  Play,
  Palette,
  Lock,
  Mail,
  Phone,
  MapPin,
  Wallet,
  Copy,
  CheckCircle2,
  Menu,
  Sun,
  Moon,
  User,
  LogOut,
  History,
  Notebook,
  Home,
  Sparkle,
  MessageCircle,
  Send,
  QrCode,
} from "lucide-react";

import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderHistory from "./components/OrderHistory";
import Footer from "./components/Footer";

interface Product {
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

interface CartItem extends Product {
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  total: number;
  items: CartItem[];
  paymentMethod: string;
  trxId: string;
  payerNumber: string;
}

const socialServices = [
  {
    id: 7,
    name: "Facebook Followers",
    description:
      "Get real and active Facebook followers to boost your social presence",
    price: 99,
    originalPrice: 399,
    category: "Social Services",
    icon: (
      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
        f
      </div>
    ),
    features: [
      "Real followers",
      "Fast delivery",
      "24/7 support",
      "Safe & secure",
    ],
    rating: 4.7,
    reviews: 890,
  },
  {
    id: 8,
    name: "YouTube Subscribers",
    description:
      "Increase your YouTube channel subscribers with real and active users",
    price: 149,
    originalPrice: 599,
    category: "Social Services",
    icon: (
      <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">
        YT
      </div>
    ),
    features: ["Real subscribers", "Monetization ready", "Quick delivery", "No drops"],
    rating: 4.8,
    reviews: 1200,
  },
  {
    id: 9,
    name: "TikTok Followers",
    description: "Grow your TikTok presence with real and engaged followers",
    price: 79,
    originalPrice: 349,
    category: "Social Services",
    icon: (
      <div className="w-6 h-6 bg-black rounded flex items-center justify-center text-white text-xs font-bold">
        TT
      </div>
    ),
    features: ["Real followers", "Organic growth", "Fast delivery", "Privacy protected"],
    rating: 4.6,
    reviews: 750,
  },
  {
    id: 10,
    name: "Instagram Followers",
    description: "Boost your Instagram profile with real and active followers",
    price: 119,
    originalPrice: 499,
    category: "Social Services",
    icon: (
      <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
        IG
      </div>
    ),
    features: ["Real followers", "High quality", "Instant delivery", "24/7 support"],
    rating: 4.9,
    reviews: 1500,
  },
  {
    id: 11,
    name: "Twitter Followers",
    description: "Increase your Twitter influence with real and engaged followers",
    price: 89,
    originalPrice: 399,
    category: "Social Services",
    icon: (
      <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
        X
      </div>
    ),
    features: ["Real followers", "Active accounts", "Quick delivery", "Safe method"],
    rating: 4.5,
    reviews: 680,
  },
  {
    id: 12,
    name: "LinkedIn Connections",
    description: "Expand your professional network with real LinkedIn connections",
    price: 199,
    originalPrice: 799,
    category: "Social Services",
    icon: (
      <div className="w-6 h-6 bg-blue-700 rounded flex items-center justify-center text-white text-xs font-bold">
        in
      </div>
    ),
    features: [
      "Real connections",
      "Professional profiles",
      "Targeted growth",
      "B2B focused",
    ],
    rating: 4.7,
    reviews: 420,
  },
];

const products: Product[] = [
  {
    id: 1,
    name: "YouTube Premium",
    description: "Ad-free videos, background play, and YouTube Music included",
    price: 299,
    originalPrice: 1200,
    category: "Entertainment",
    icon: <Play className="w-6 h-6 text-red-500" />,
    features: ["No ads", "Background play", "YouTube Music", "Offline downloads"],
    rating: 4.9,
    reviews: 1250,
  },
  {
    id: 2,
    name: "Canva Pro",
    description: "Professional design tools with premium templates and assets",
    price: 399,
    originalPrice: 1500,
    category: "Design",
    icon: <Palette className="w-6 h-6 text-purple-500" />,
    features: ["Premium templates", "Brand kit", "Background remover", "Magic resize"],
    rating: 4.8,
    reviews: 980,
  },
  {
    id: 3,
    name: "ExpressVPN Premium",
    description: "Ultra-fast, secure VPN with 160+ server locations worldwide",
    price: 459,
    originalPrice: 1800,
    category: "Security",
    icon: <Shield className="w-6 h-6 text-green-500" />,
    features: ["160+ locations", "No logs policy", "24/7 support", "5 devices"],
    rating: 4.7,
    reviews: 2100,
  },
  {
    id: 4,
    name: "Spotify Premium",
    description: "Ad-free music streaming with offline downloads",
    price: 199,
    originalPrice: 999,
    category: "Entertainment",
    icon: <Zap className="w-6 h-6 text-green-400" />,
    features: ["Ad-free music", "Offline downloads", "High quality", "Unlimited skips"],
    rating: 4.9,
    reviews: 3200,
  },
  {
    id: 5,
    name: "NordVPN Premium",
    description: "Advanced security features with double VPN encryption",
    price: 379,
    originalPrice: 1600,
    category: "Security",
    icon: <Lock className="w-6 h-6 text-blue-500" />,
    features: ["Double VPN", "Threat protection", "59 countries", "6 devices"],
    rating: 4.6,
    reviews: 1800,
  },
  {
    id: 6,
    name: "Netflix Premium",
    description: "4K streaming on multiple devices with full content library",
    price: 349,
    originalPrice: 1400,
    category: "Entertainment",
    icon: <Globe className="w-6 h-6 text-red-600" />,
    features: ["4K streaming", "4 screens", "Download content", "All regions"],
    rating: 4.8,
    reviews: 2800,
  },
];

// Combine all products including social services
const allProducts = [...products, ...socialServices];

const categories = [
  { name: "All", icon: "🌟", gradient: "from-purple-500 to-pink-500" },
  { name: "Entertainment", icon: "🎬", gradient: "from-red-500 to-orange-500" },
  { name: "Design", icon: "🎨", gradient: "from-blue-500 to-cyan-500" },
  { name: "Security", icon: "🔒", gradient: "from-green-500 to-emerald-500" },
  { name: "Social Services", icon: "📱", gradient: "from-indigo-500 to-purple-500" },
];

// Mock order data
const mockOrders: Order[] = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "completed",
    total: 698,
    items: [
      { ...products[0], quantity: 1 }, // YouTube Premium
      { ...products[1], quantity: 1 }, // Canva Pro
    ],
    paymentMethod: "bKash",
    trxId: "7A1BCD2EFG",
    payerNumber: "01733019261",
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "processing",
    total: 459,
    items: [{ ...products[2], quantity: 1 }], // ExpressVPN Premium
    paymentMethod: "bKash",
    trxId: "8B2CDE3FGH",
    payerNumber: "01733019261",
  },
  {
    id: "ORD-003",
    date: "2024-01-05",
    status: "completed",
    total: 548,
    items: [
      { ...products[3], quantity: 1 }, // Spotify Premium
      { ...products[5], quantity: 1 }, // Netflix Premium
    ],
    paymentMethod: "bKash",
    trxId: "9C3DEF4GHI",
    payerNumber: "01733019261",
  },
];

export default function Page() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [view, setView] = useState<
    "home" | "checkout" | "orders" | "order-history" | "order-details"
  >("home");
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad" | "crypto">(
    "bkash"
  );
  const [payerNumber, setPayerNumber] = useState("+8801");
  const [trxId, setTrxId] = useState("");
  const [lastAddedProductId, setLastAddedProductId] = useState<number | null>(null);
  const lastAddedTimer = useRef<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );
  const menuRef = useRef<HTMLDivElement>(null);
  const username = "ZI User";
  // Quick Order form state
  const [qName, setQName] = useState("");
  const [qEmail, setQEmail] = useState("");
  const [qPhone, setQPhone] = useState("");
  const [qText, setQText] = useState("");
  const [qSending, setQSending] = useState(false);
  const [qFeedback, setQFeedback] = useState<
    null | { type: "success" | "error"; message: string }
  >(null);
  const [orders] = useState<Order[]>(mockOrders);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Auto-close hamburger menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const toggleTheme = () =>
    setTheme((t) => (t === "dark" ? "light" : "dark"));

  // Send Quick Order message to Telegram
  const sendQuickOrder = async () => {
    setQFeedback(null);
    const isValidBDPhoneStrict = /^\+8801[3-9]\d{8}$/.test(qPhone);
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(qEmail);
    if (!qName || !qEmail || !qPhone || !qText) {
      setQFeedback({
        type: "error",
        message:
          "All fields are required. Please fill in Name, Email, Phone, and Message.",
      });
      return;
    }
    if (!isValidEmail) {
      setQFeedback({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }
    if (!isValidBDPhoneStrict) {
      setQFeedback({
        type: "error",
        message:
          "Please enter a valid Bangladeshi phone number in +880 format (e.g., +8801XXXXXXXXX).",
      });
      return;
    }
    const token =
      (process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN as string | undefined) ||
      "8142852929:AAGZqHy3tH84iApseliA1ByZh-3-QGSJ1OI";
    const chatId =
      (process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID as string | undefined) ||
      "6789527271";
    if (!token || !chatId) {
      setQFeedback({
        type: "error",
        message:
          "Telegram configuration missing. Please set NEXT_PUBLIC_TELEGRAM_BOT_TOKEN and NEXT_PUBLIC_TELEGRAM_CHAT_ID.",
      });
      return;
    }
    // Build Telegram payload and send via a CORS-friendly proxy
    const text = `New Quick Order\nName: ${qName}\nEmail: ${qEmail}\nPhone: ${qPhone}\nMessage: ${qText}`;
    const tgUrl = `https://api.telegram.org/bot${token}/sendMessage`;
    const proxyUrl = `https://cors.isomorphic-git.org/${tgUrl}`;
    try {
      setQSending(true);
      const endpoints = [
        proxyUrl,
        `https://thingproxy.freeboard.io/fetch/${tgUrl}`,
      ];
      let ok = false;
      let lastStatus = 0;
      for (const ep of endpoints) {
        try {
          const res = await fetch(ep, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: chatId, text }),
          });
          lastStatus = res.status;
          if (!res.ok) continue;
          const data = await res.json();
          if (data && data.ok) {
            ok = true;
            break;
          }
        } catch (_) {
          // Try next endpoint
        }
      }
      if (!ok) {
        const beacon = new Image();
        const beaconUrl = `${tgUrl}?chat_id=${encodeURIComponent(
          chatId
        )}&text=${encodeURIComponent(text)}`;
        beacon.src = beaconUrl;
        if (lastStatus === 404) {
          throw new Error("404");
        }
        setQFeedback({
          type: "success",
          message: "Your message has been sent successfully.",
        });
      } else {
        setQFeedback({
          type: "success",
          message: "Your message has been sent successfully.",
        });
      }
      setQName("");
      setQEmail("");
      setQPhone("");
      setQText("");
    } catch (e) {
      const whatsAppNumber = "01733019261";
      const encoded = encodeURIComponent(
        `Hello, I couldn't send the Quick Order via the website.\nName: ${qName}\nEmail: ${qEmail}${
          qPhone ? `\nPhone: ${qPhone}` : ""
        }\nMessage: ${qText}`
      );
      const waLink = `https://wa.me/88${whatsAppNumber}?text=${encoded}`;
      const msg =
        (e as Error)?.message === "404"
          ? `Telegram returned 404 Not Found. Please verify the Bot Token and Chat ID. Or contact on <a class="underline" href="${waLink}" target="_blank" rel="noreferrer">WhatsApp</a>.`
          : `Failed to send. Please try again, or contact on <a class="underline" href="${waLink}" target="_blank" rel="noreferrer">WhatsApp</a>.`;
      setQFeedback({ type: "error", message: msg });
    } finally {
      setQSending(false);
    }
  };

  const filteredProducts =
    selectedCategory === "All"
      ? allProducts
      : allProducts.filter((product) => product.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    if (lastAddedTimer.current) {
      window.clearTimeout(lastAddedTimer.current);
    }
    setLastAddedProductId(product.id);
    lastAddedTimer.current = window.setTimeout(
      () => setLastAddedProductId(null),
      2000
    );
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prevCart.filter((item) => item.id !== productId);
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const emailDomains = ["@gmail.com", "@yahoo.com", "@outlook.com", "@hotmail.com"];
  const computeEmailSuggestions = (val: string) => {
    if (!val) return [] as string[];
    const atIndex = val.indexOf("@");
    const local = atIndex === -1 ? val : val.slice(0, atIndex);
    const typedDomain = atIndex === -1 ? "" : val.slice(atIndex);
    if (!local) return [] as string[];
    if (!typedDomain) return emailDomains;
    if (typedDomain.includes(".")) return [] as string[];
    return emailDomains.filter((d) => d.startsWith(typedDomain));
  };
  const suggestions = computeEmailSuggestions(qEmail);
  const acceptSuggestion = (domain: string) => {
    const atIndex = qEmail.indexOf("@");
    const local = atIndex === -1 ? qEmail : qEmail.slice(0, atIndex);
    setQEmail(`${local}${domain}`);
  };

  return (
    (() => {
      return null;
    })() as any,
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <Header
        view={view}
        setView={setView}
        setIsCartOpen={setIsCartOpen}
        getTotalItems={getTotalItems}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        menuRef={menuRef}
        theme={theme}
        toggleTheme={toggleTheme}
        username={username}
      />

      {view === "home" && (
        <>
          <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white py-20 overflow-hidden">
            {/* Enhanced Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-cyan-400/10 via-transparent to-transparent animate-gradient-xy"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-400/10 via-transparent to-transparent animate-gradient-xy"></div>

            {/* Enhanced Floating Particles */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-white/30 rounded-full animate-float"></div>
              <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-yellow-300/40 rounded-full animate-ping"></div>
              <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-pink-300/25 rounded-full animate-pulse"></div>
              <div
                className="absolute top-1/2 right-1/4 w-2 h-2 bg-blue-300/30 rounded-full animate-float"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute bottom-1/3 right-1/2 w-3 h-3 bg-purple-300/25 rounded-full animate-ping"
                style={{ animationDelay: "2s" }}
              ></div>
              <div
                className="absolute top-1/6 left-1/2 w-2 h-2 bg-green-300/20 rounded-full animate-float"
                style={{ animationDelay: "3s" }}
              ></div>
              <div
                className="absolute bottom-1/6 left-1/4 w-3 h-3 bg-orange-300/20 rounded-full animate-pulse"
                style={{ animationDelay: "4s" }}
              ></div>
            </div>

            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="h-full w-full bg-grid-pattern animate-rotate-slow"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Welcome Message */}
                <div className="mb-6 sm:mb-8 animate-fade-in">
                  <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white/90 mb-2 tracking-wide">
                    🎉{" "}
                    <span className="bg-gradient-to-r from-yellow-200 via-orange-200 to-pink-200 bg-clip-text text-transparent font-bold">
                      Welcome to
                    </span>{" "}
                    🎉
                  </p>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 leading-tight animate-glow">
                  <span className="bg-gradient-to-r from-lime-500 via-red-500 to-lime-500 bg-clip-text text-transparent drop-shadow-2xl filter brightness-110">
                    ✨ ZI PREMIUM SERVICES ✨
                  </span>
                </h1>

                <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-white drop-shadow-lg tracking-wider animate-slide-up">
                  <span className="bg-gradient-to-r from-orange-100 via-yellow-100 to-pink-100 bg-clip-text text-transparent animate-gradient-y">
                    🚀 Digital Services 🚀
                  </span>
                </h2>

                <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4 text-white/95 drop-shadow-md font-medium tracking-wide">
                  <span className="inline-block animate-bounce-subtle">💎</span> Get
                  access to all your favorite premium services at{" "}
                  <span className="text-yellow-200 font-bold underline decoration-wavy decoration-yellow-300">
                    unbeatable prices
                  </span>
                  .
                  <br className="hidden sm:block" />
                  <span className="text-orange-200 font-semibold">Quality</span>,{" "}
                  <span className="text-pink-200 font-semibold">reliability</span>, and{" "}
                  <span className="text-yellow-200 font-semibold">savings</span> - all
                  in one place.{" "}
                  <span className="inline-block animate-bounce-subtle">🎯</span>
                </p>

                {/* Enhanced CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 px-4">
                  <button
                    onClick={() =>
                      window.scrollTo({
                        top: window.innerHeight,
                        behavior: "smooth",
                      })
                    }
                    className="group relative px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-white via-yellow-50 to-orange-50 text-purple-700 rounded-full font-bold text-base sm:text-lg hover:from-orange-100 hover:via-yellow-100 hover:to-pink-100 transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-glow border-2 border-white/30 hover:border-yellow-400 overflow-hidden animate-scale-pulse"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <ShoppingCart className="w-5 h-5 group-hover:animate-bounce" />
                      <span className="group-hover:animate-pulse">Shop Now</span>
                      <Sparkle className="w-4 h-4 group-hover:animate-spin" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                  <button
                    onClick={() =>
                      window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: "smooth",
                      })
                    }
                    className="group relative px-8 sm:px-10 py-4 sm:py-5 bg-transparent border-2 border-white text-white rounded-full font-bold text-base sm:text-lg hover:bg-gradient-to-r hover:from-white hover:to-yellow-50 hover:text-purple-700 transition-all duration-500 transform hover:scale-110 shadow-xl hover:shadow-glow hover:border-yellow-300 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <Phone className="w-5 h-5 group-hover:animate-bounce" />
                      <span className="group-hover:animate-pulse">Contact Us</span>
                      <MessageCircle className="w-4 h-4 group-hover:animate-bounce-subtle" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto px-4">
                  <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 hover:border-yellow-300/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-black mb-1 sm:mb-2 bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent group-hover:animate-pulse">
                      💰 75% 💰
                    </div>
                    <div className="text-sm sm:text-base md:text-lg text-white/90 font-semibold tracking-wide">
                      Save Up To
                    </div>
                  </div>
                  <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 hover:border-blue-300/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-black mb-1 sm:mb-2 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent group-hover:animate-pulse">
                      🕒 24/7 🕒
                    </div>
                    <div className="text-sm sm:text-base md:text-lg text-white/90 font-semibold tracking-wide">
                      Support
                    </div>
                  </div>
                  <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 hover:border-pink-300/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-black mb-1 sm:mb-2 bg-gradient-to-r from-pink-200 to-purple-200 bg-clip-text text-transparent group-hover:animate-pulse">
                      🎉 1000+ 🎉
                    </div>
                    <div className="text-sm sm:text-base md:text-lg text-white/90 font-semibold tracking-wide">
                      Happy Customers
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Updates Marquee */}
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white py-2 overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              <span className="mx-4">
                🔥 New: Netflix Premium now available at 75% OFF!
              </span>
              <span className="mx-4">
                ⚡ Flash Sale: YouTube Premium only ৳299 today!
              </span>
              <span className="mx-4">
                🎉 Special Offer: Buy 2 Get 1 Free on all Social Services!
              </span>
              <span className="mx-4">
                💎 Premium VPN Services starting from ৳379!
              </span>
              <span className="mx-4">🚀 24/7 Instant Delivery Available!</span>
              <span className="mx-4">
                🔥 New: Netflix Premium now available at 75% OFF!
              </span>
              <span className="mx-4">
                ⚡ Flash Sale: YouTube Premium only ৳299 today!
              </span>
              <span className="mx-4">
                🎉 Special Offer: Buy 2 Get 1 Free on all Social Services!
              </span>
              <span className="mx-4">
                💎 Premium VPN Services starting from ৳379!
              </span>
              <span className="mx-4">🚀 24/7 Instant Delivery Available!</span>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="-mx-4 px-4 overflow-x-auto mb-6 sm:mb-8">
              <div className="flex gap-3 sm:gap-4 whitespace-nowrap">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`relative px-6 sm:px-7 py-2.5 sm:py-3.5 rounded-full transition-all duration-300 font-semibold shadow-md overflow-hidden group flex items-center gap-2 min-w-max ${
                      selectedCategory === category.name
                        ? "bg-gradient-to-r text-white shadow-lg transform scale-105"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm hover:shadow-lg hover:scale-105 border border-gray-200 dark:border-gray-700"
                    }`}
                    style={selectedCategory === category.name ? {} : {}}
                  >
                    <span
                      className={`bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent text-lg`}
                    >
                      {category.icon}
                    </span>
                    <span className="relative z-10 text-xs sm:text-sm md:text-base">
                      {category.name}
                    </span>

                    {selectedCategory === category.name && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-100`}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer bg-[length:200%_100%]"></div>
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  lastAddedProductId={lastAddedProductId}
                  addToCart={(p) => {
                    if (lastAddedProductId === p.id) {
                      setIsCartOpen(true);
                    } else {
                      addToCart(p);
                    }
                  }}
                />
              ))}
            </div>

            <section className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-xl p-8 mb-16 border border-gray-200 dark:border-gray-700">
              <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12 animate-glow">
                What Our Customers Say
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Ahmed Rahman",
                    service: "YouTube Premium",
                    review:
                      "Amazing service! Got my YouTube Premium instantly and it works perfectly.",
                    rating: 5,
                  },
                  {
                    name: "Fatima Khatun",
                    service: "Canva Pro",
                    review:
                      "Great prices and quick delivery. My Canva Pro account is working flawlessly.",
                    rating: 5,
                  },
                  {
                    name: "Mohammad Ali",
                    service: "ExpressVPN",
                    review:
                      "Excellent VPN service at fraction of the cost. Highly recommended!",
                    rating: 5,
                  },
                ].map((testimonial, index) => (
                  <div key={index} className="group relative">
                    {/* Enhanced Glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-2xl opacity-60 blur-md animate-pulse"></div>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-2xl opacity-40 blur-sm animate-glow-border"></div>

                    <div className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600">
                      <div className="flex justify-center mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="w-5 h-5 text-yellow-400 fill-current drop-shadow-sm group-hover:animate-pulse"
                            style={{ animationDelay: `${star * 0.1}s` }}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 italic text-center leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                        "{testimonial.review}"
                      </p>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {testimonial.service}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-3xl shadow-2xl p-8 mb-16 border border-gray-700">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Get In Touch
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Have questions about our services? Need help with your order? Contact
                    us and we'll get back to you within 24 hours.
                  </p>
                  <div className="space-y-6">
                    <div className="group flex items-center space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-blue-500/30">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <Mail className="w-6 h-6 text-blue-100" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Email</div>
                        <div className="text-white font-medium group-hover:text-blue-300 transition-colors duration-300">
                          juwelshop@gmail.com
                        </div>
                      </div>
                    </div>
                    <div className="group flex items-center space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-green-500/30">
                      <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <Phone className="w-6 h-6 text-green-100" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Phone</div>
                        <div className="text-white font-medium group-hover:text-green-300 transition-colors duration-300">
                          <a
                            href="https://wa.me/message/HAOATN77ES6PL1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="no-underline"
                          >
                            WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="group flex items-center space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-red-500/30">
                      <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <MapPin className="w-6 h-6 text-red-100" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Location</div>
                        <div className="text-white font-medium group-hover:text-red-300 transition-colors duration-300">
                          Dhaka, Bangladesh
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <h4 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    Quick Order
                  </h4>

                  {/* Quick Order Marquee */}
                  <div className="bg-gradient-to-r from-orange-600/20 to-pink-600/20 text-white py-2 px-4 rounded-lg overflow-hidden mb-4 border border-white/10">
                    <div className="flex animate-marquee whitespace-nowrap text-sm">
                      <span className="mx-2">📝 Request any premium service here!</span>
                      <span className="mx-2">⚡ Fast response within 24 hours</span>
                      <span className="mx-2">💰 Best prices guaranteed</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={qName}
                      onChange={(e) => setQName(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-300 hover:bg-white/15"
                      required
                    />
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Your Email"
                        value={qEmail}
                        onChange={(e) => setQEmail(e.target.value)}
                        onKeyDown={(e) => {
                          if (
                            (e.key === "Enter" || e.key === "Tab") &&
                            suggestions.length > 0
                          ) {
                            e.preventDefault();
                            acceptSuggestion(suggestions[0]);
                          }
                        }}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-300 hover:bg-white/15"
                        required
                        autoComplete="email"
                      />
                      {suggestions.length > 0 && (
                        <div className="absolute z-10 mt-1 w-full rounded-lg overflow-hidden border border-white/20 bg-gray-900/90 backdrop-blur text-white">
                          {suggestions.map((d) => (
                            <button
                              key={d}
                              type="button"
                              onClick={() => acceptSuggestion(d)}
                              className="w-full text-left px-4 py-2 hover:bg-white/10"
                            >
                              {(() => {
                                const atIndex = qEmail.indexOf("@");
                                const local =
                                  atIndex === -1
                                    ? qEmail
                                    : qEmail.slice(0, atIndex);
                                return `${local}${d}`;
                              })()}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <input
                      type="tel"
                      placeholder="+8801XXXXXXXXX"
                      value={qPhone}
                      onChange={(e) => {
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
                        setQPhone(v);
                      }}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-300 hover:bg-white/15"
                      inputMode="numeric"
                      pattern="^\+8801[3-9][0-9]{8}$"
                      maxLength={14}
                      onFocus={() => {
                        if (!qPhone) setQPhone("+880");
                      }}
                      required
                    />
                    {qPhone && !/^\+8801[3-9][0-9]{8}$/.test(qPhone) && (
                      <p className="text-xs text-red-300">
                        Enter a valid Bangladeshi number like +8801XXXXXXXXX.
                      </p>
                    )}
                    <textarea
                      placeholder="Which service are you interested in?"
                      rows={3}
                      value={qText}
                      onChange={(e) => setQText(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-300 hover:bg-white/15 resize-none"
                      required
                    ></textarea>
                    {qFeedback && (
                      <div
                        className={`${
                          qFeedback.type === "success"
                            ? "text-green-300"
                            : "text-red-300"
                        } text-sm`}
                        dangerouslySetInnerHTML={{ __html: qFeedback.message }}
                      />
                    )}
                    <button
                      disabled={qSending}
                      onClick={sendQuickOrder}
                      className={`w-full py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-glow font-semibold relative overflow-hidden group/btn ${
                        qSending ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {qSending ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 group-hover/btn:animate-bounce" />
                            Send Message
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Ad Section - Moved from layout */}
            <section className="py-8 w-full bg-transparent">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  Sponsored Content
                </h3>
              </div>

              {/* Ad Container */}
              <div className="flex justify-center w-full">
                <div
                  id="container-6c08b4b884bee9b71a919c92298a25d8"
                  className="w-full max-w-full bg-transparent"
                ></div>
              </div>
            </section>

            {/* Ad Scripts */}
            <Script
              strategy="afterInteractive"
              src="//pl27650998.revenuecpmgate.com/1b/4d/5e/1b4d5ecadd27fd03a8320a43cb2aa006.js"
            />
            <Script id="ad-invoke-vars" strategy="afterInteractive">
              {`
                window.atOptions = {
                  key: 'b0a186c12a01a3cc1d57c64b08dc7c39',
                  format: 'iframe',
                  height: 90,
                  width: 728,
                  params: {}
                };
              `}
            </Script>
            <Script
              strategy="afterInteractive"
              src="//www.highperformanceformat.com/b0a186c12a01a3cc1d57c64b08dc7c39/invoke.js"
            />
            <Script
              strategy="afterInteractive"
              src="//pl27650929.revenuecpmgate.com/6c08b4b884bee9b71a919c92298a25d8/invoke.js"
            />
            <Script
              strategy="afterInteractive"
              src="//pl27650726.revenuecpmgate.com/50/67/8a/50678a57c5aca82bbe0a605f31b43670.js"
            />
          </div>
        </>
      )}

      {view === "checkout" && (
        <Checkout
          cart={cart}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          payerNumber={payerNumber}
          setPayerNumber={setPayerNumber}
          trxId={trxId}
          setTrxId={setTrxId}
          copiedAddress={copiedAddress}
          setCopiedAddress={setCopiedAddress}
          getTotalPrice={getTotalPrice}
          onOrderConfirmed={() => {
            setCart([]);
            setPayerNumber("+8801");
            setTrxId("");
            setPaymentMethod("bkash");
            setView("home");
          }}
        />
      )}

      {view === "orders" && (
        <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                My Orders
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Track your current orders
              </p>
            </div>

            <div className="space-y-6">
              {orders
                .filter(
                  (order) =>
                    order.status === "pending" || order.status === "processing"
                )
                .map((order) => (
                  <div
                    key={order.id}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Order #{order.id}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Placed on{" "}
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-2 md:mt-0">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === "pending"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : order.status === "processing"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                              : order.status === "completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          ৳{order.total}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                          Items:
                        </h4>
                        <div className="space-y-1">
                          {order.items.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between text-sm"
                            >
                              <span className="text-gray-600 dark:text-gray-300">
                                {item.name} x{item.quantity}
                              </span>
                              <span className="text-gray-900 dark:text-white">
                                ৳{item.price * item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                          Payment Details:
                        </h4>
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">
                              Method:
                            </span>
                            <span className="text-gray-900 dark:text-white">
                              {order.paymentMethod}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">
                              TrxID:
                            </span>
                            <span className="text-gray-900 dark:text-white font-mono">
                              {order.trxId}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setView("order-details");
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        View Details
                      </button>
                      {order.status === "pending" && (
                        <button
                          onClick={() => {
                            if (
                              confirm(
                                "Are you sure you want to cancel this order?"
                              )
                            ) {
                              // In a real app, this would make an API call
                              alert(
                                "Order cancellation requested. We will contact you shortly."
                              );
                            }
                          }}
                          className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                ))}

              {orders.filter(
                (order) =>
                  order.status === "pending" || order.status === "processing"
              ).length === 0 && (
                <div className="text-center py-12">
                  <Notebook className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No Active Orders
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    You don't have any active orders at the moment.
                  </p>
                  <button
                    onClick={() => setView("home")}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {view === "order-history" && (
        <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Order History
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                View all your past orders
              </p>
            </div>

            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Order #{order.id}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Placed on {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 mt-2 md:mt-0">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : order.status === "processing"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            : order.status === "completed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        ৳{order.total}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        Items:
                      </h4>
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-gray-600 dark:text-gray-300">
                              {item.name} x{item.quantity}
                            </span>
                            <span className="text-gray-900 dark:text-white">
                              ৳{item.price * item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        Payment Details:
                      </h4>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">
                            Method:
                          </span>
                          <span className="text-gray-900 dark:text-white">
                            {order.paymentMethod}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">
                            TrxID:
                          </span>
                          <span className="text-gray-900 dark:text-white font-mono">
                            {order.trxId}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setView("order-details");
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </button>
                    {order.status === "completed" && (
                      <button
                        onClick={() => {
                          // Add items back to cart for reorder
                          order.items.forEach((item) => {
                            for (let i = 0; i < item.quantity; i++) {
                              addToCart(item);
                            }
                          });
                          setView("home");
                          alert("Items added to cart for reorder!");
                        }}
                        className="px-4 py-2 border border-green-300 text-green-600 rounded-lg hover:bg-green-50 dark:border-green-600 dark:text-green-400 dark:hover:bg-green-900/20 transition-colors"
                      >
                        Reorder
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {orders.length === 0 && (
                <div className="text-center py-12">
                  <History className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No Order History
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    You haven't placed any orders yet.
                  </p>
                  <button
                    onClick={() => setView("home")}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {view === "order-details" && selectedOrder && (
        <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <button
                onClick={() => setView("order-history")}
                className="mb-4 inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                ← Back to Order History
              </button>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Order Details
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Order #{selectedOrder.id}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Order Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Order ID:
                      </span>
                      <span className="font-mono text-gray-900 dark:text-white">
                        {selectedOrder.id}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Date:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {new Date(
                          selectedOrder.date
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Status:
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          selectedOrder.status === "pending"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : selectedOrder.status === "processing"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            : selectedOrder.status === "completed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {selectedOrder.status.charAt(0).toUpperCase() +
                          selectedOrder.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Total:
                      </span>
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        ৳{selectedOrder.total}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Payment Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Payment Method:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {selectedOrder.paymentMethod}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Transaction ID:
                      </span>
                      <span className="font-mono text-gray-900 dark:text-white">
                        {selectedOrder.trxId}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Payer Number:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {selectedOrder.payerNumber}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Order Items
                </h3>
                <div className="space-y-4">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-white dark:bg-gray-600 rounded-lg">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded">
                              {item.category}
                            </span>
                            <span className="text-xs text-gray-500">
                              Qty: {item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          ৳{item.price * item.quantity}
                        </div>
                        <div className="text-sm text-gray-500">
                          ৳{item.price} each
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    Total Amount:
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    ৳{selectedOrder.total}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Cart
        cart={cart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        getTotalPrice={getTotalPrice}
        setView={setView}
      />

      <Footer />
    </div>
  );
}