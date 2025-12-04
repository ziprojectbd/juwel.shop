import { DollarSign, ShoppingCart, Package, UserPlus, Eye, Edit, Trash2, MoreVertical, Users, Settings } from 'lucide-react';
import StatsCard from './StatsCard';

interface Order {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: string;
  date: string;
}

interface Product {
  name: string;
  sales: number;
  revenue: string;
  trend: string;
}

interface DashboardTabProps {
  recentOrders: Order[];
  topProducts: Product[];
  getStatusColor: (status: string) => string;
}

export default function DashboardTab({ recentOrders, topProducts, getStatusColor }: DashboardTabProps) {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+20.1%',
      icon: DollarSign,
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: '+12.5%',
      icon: ShoppingCart,
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Total Products',
      value: '567',
      change: '+5.2%',
      icon: Package,
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'New Customers',
      value: '892',
      change: '+18.3%',
      icon: UserPlus,
      bgColor: 'bg-orange-500/10',
    },
  ];

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Recent Orders</h3>
            <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Order ID</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Customer</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Product</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Amount</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Status</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                    <td className="py-4 px-4 text-white font-medium">{order.id}</td>
                    <td className="py-4 px-4 text-gray-300">{order.customer}</td>
                    <td className="py-4 px-4 text-gray-300">{order.product}</td>
                    <td className="py-4 px-4 text-white font-medium">{order.amount}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-gray-400 hover:text-blue-400 transition-all">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-green-400 transition-all">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-400 transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Top Products</h3>
            <button className="text-gray-400 hover:text-white">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                <div className="flex-1">
                  <p className="text-white font-medium text-sm mb-1">{product.name}</p>
                  <p className="text-gray-400 text-xs">{product.sales} sales</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-sm">{product.revenue}</p>
                  <p className="text-green-400 text-xs">{product.trend}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl hover:from-blue-500/30 hover:to-cyan-500/30 transition-all">
            <Package className="w-8 h-8 text-blue-400 mb-2" />
            <span className="text-white font-medium">Add Product</span>
          </button>
          <button className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl hover:from-green-500/30 hover:to-emerald-500/30 transition-all">
            <ShoppingCart className="w-8 h-8 text-green-400 mb-2" />
            <span className="text-white font-medium">New Order</span>
          </button>
          <button className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl hover:from-purple-500/30 hover:to-pink-500/30 transition-all">
            <Users className="w-8 h-8 text-purple-400 mb-2" />
            <span className="text-white font-medium">Add Customer</span>
          </button>
          <button className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl hover:from-orange-500/30 hover:to-red-500/30 transition-all">
            <Settings className="w-8 h-8 text-orange-400 mb-2" />
            <span className="text-white font-medium">Settings</span>
          </button>
        </div>
      </div>
    </>
  );
}
