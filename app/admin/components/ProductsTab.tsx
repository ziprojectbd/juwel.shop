import { Package, MoreVertical, Film, Palette, Lock, Users } from 'lucide-react';
import { useState, useMemo } from 'react';

interface Product {
  name: string;
  sales: number;
  revenue: string;
  trend: string;
  category?: string;
  price?: number;
  priceBDT?: number;
  priceUSDT?: number;
  stock?: number;
  description?: string;
  imageUrl?: string;
  featured?: boolean;
  available?: boolean;
}

interface ProductsTabProps {
  products: Product[];
  setShowProductModal: (show: boolean) => void;
  setEditingProduct: (product: Product | null) => void;
}

const categories = [
  { name: 'All', icon: null },
  { name: 'Entertainment', icon: Film },
  { name: 'Design', icon: Palette },
  { name: 'Security', icon: Lock },
  { name: 'Social Services', icon: Users },
];

export default function ProductsTab({ products, setShowProductModal, setEditingProduct }: ProductsTabProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };

  const handleDeleteProduct = (product: Product) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"? This action cannot be undone.`)) {
      console.log('Deleting product:', product.name);
      // Here you would typically call an API to delete the product
      // For now, we'll just log it
      alert(`Product "${product.name}" has been deleted (demo)`);
    }
  };

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') {
      return products;
    }
    return products.filter(product => product.category === selectedCategory);
  }, [products, selectedCategory]);

  const formatPrice = (product: Product) => {
    const prices = [];
    if (product.priceBDT) {
      prices.push(`৳${product.priceBDT}`);
    }
    if (product.priceUSDT) {
      prices.push(`$${product.priceUSDT} USDT`);
    }
    return prices.length > 0 ? prices.join(' / ') : 'Price not set';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Products Management</h2>
        <button 
          onClick={() => {
            setEditingProduct(null);
            setShowProductModal(true);
          }}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
        >
          Add New Product
        </button>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`flex items-center px-4 py-2 rounded-full transition-all whitespace-nowrap
              ${selectedCategory === category.name 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
          >
            {category.icon && (
              <category.icon className="w-4 h-4 mr-2" />
            )}
            {category.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <div key={index} className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <button className="text-gray-400 hover:text-white">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm">Price</span>
              <span className="text-white font-medium text-sm">{formatPrice(product)}</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Sales</span>
                <span className="text-white font-medium">{product.sales}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Revenue</span>
                <span className="text-white font-medium">{product.revenue}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Trend</span>
                <span className="text-green-400 font-medium">{product.trend}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <button 
                onClick={() => handleEditProduct(product)}
                className="flex-1 px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all text-sm"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDeleteProduct(product)}
                className="flex-1 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
