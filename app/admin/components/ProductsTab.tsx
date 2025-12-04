import { Package, MoreVertical } from 'lucide-react';

interface Product {
  name: string;
  sales: number;
  revenue: string;
  trend: string;
}

interface ProductsTabProps {
  products: Product[];
  setShowProductModal: (show: boolean) => void;
}

export default function ProductsTab({ products, setShowProductModal }: ProductsTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Products Management</h2>
        <button 
          onClick={() => setShowProductModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
        >
          Add New Product
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
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
              <button className="flex-1 px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all text-sm">
                Edit
              </button>
              <button className="flex-1 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all text-sm">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
