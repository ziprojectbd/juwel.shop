import { DollarSign, ShoppingCart, Package, UserPlus, Eye, Edit, Trash2, MoreVertical, Users, Settings } from 'lucide-react';
import { useState } from 'react';
import StatsCard from './StatsCard';

interface Order {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: string;
  date: string;
  createdTime: string;
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
  setActiveTab: (tab: string) => void;
  setShowProductModal: (show: boolean) => void;
  setEditingProduct: (product: any) => void;
}

export default function DashboardTab({ recentOrders, topProducts, getStatusColor, setActiveTab, setShowProductModal, setEditingProduct }: DashboardTabProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowViewModal(true);
  };

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowEditModal(true);
  };

  const handleDeleteOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    console.log('Deleting order:', selectedOrder?.id);
    setShowDeleteModal(false);
    setSelectedOrder(null);
  };

  const handleViewAllOrders = () => {
    setActiveTab('orders');
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductModal(true);
  };
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
            <button 
              onClick={handleViewAllOrders}
              className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
            >
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
                        <button 
                          onClick={() => handleViewOrder(order)}
                          className="p-1 text-gray-400 hover:text-blue-400 transition-all hover:scale-110"
                          title="View Order"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEditOrder(order)}
                          className="p-1 text-gray-400 hover:text-green-400 transition-all hover:scale-110"
                          title="Edit Order"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteOrder(order)}
                          className="p-1 text-gray-400 hover:text-red-400 transition-all hover:scale-110"
                          title="Delete Order"
                        >
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
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          <button 
            onClick={handleAddProduct}
            className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl hover:from-blue-500/30 hover:to-cyan-500/30 transition-all"
          >
            <Package className="w-8 h-8 text-blue-400 mb-2" />
            <span className="text-white font-medium">Add Product</span>
          </button>
          <button className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl hover:from-green-500/30 hover:to-emerald-500/30 transition-all">
            <ShoppingCart className="w-8 h-8 text-green-400 mb-2" />
            <span className="text-white font-medium">New Order</span>
          </button>
        </div>
      </div>

      {/* View Order Modal */}
      {showViewModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">Order Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Order ID:</span>
                <span className="text-white font-medium">{selectedOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Customer:</span>
                <span className="text-white">{selectedOrder.customer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Product:</span>
                <span className="text-white">{selectedOrder.product}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Amount:</span>
                <span className="text-white font-medium">{selectedOrder.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedOrder.status)}`}>
                  {selectedOrder.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Created Time:</span>
                <span className="text-white text-sm">{selectedOrder.createdTime}</span>
              </div>
            </div>
            <button
              onClick={() => setShowViewModal(false)}
              className="mt-6 w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Order Modal */}
      {showEditModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">Edit Order</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                <select className="w-full px-3 py-2 bg-red-500 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="Completed" selected={selectedOrder.status === 'Completed'}>Completed</option>
                  <option value="Pending" selected={selectedOrder.status === 'Pending'}>Pending</option>
                  <option value="Processing" selected={selectedOrder.status === 'Processing'}>Processing</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log('Updating order:', selectedOrder.id);
                  setShowEditModal(false);
                }}
                className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">Delete Order</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete order {selectedOrder.id}? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
