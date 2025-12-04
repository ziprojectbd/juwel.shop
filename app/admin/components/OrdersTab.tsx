import { Eye, Edit, Trash2 } from 'lucide-react';

interface Order {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: string;
  date: string;
}

interface OrdersTabProps {
  orders: Order[];
  getStatusColor: (status: string) => string;
}

export default function OrdersTab({ orders, getStatusColor }: OrdersTabProps) {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Orders Management</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Order ID</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Customer</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Product</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Amount</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Status</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Date</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
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
                <td className="py-4 px-4 text-gray-300">{order.date}</td>
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
  );
}
