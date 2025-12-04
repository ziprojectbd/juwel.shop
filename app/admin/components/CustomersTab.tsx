import { Users } from 'lucide-react';

interface CustomersTabProps {
  setShowCustomerModal: (show: boolean) => void;
}

export default function CustomersTab({ setShowCustomerModal }: CustomersTabProps) {
  const customers = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams', 'Tom Brown', 'Emily Davis'];

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Customers Management</h2>
        <button 
          onClick={() => setShowCustomerModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
        >
          Add Customer
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((customer, index) => (
          <div key={index} className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold">{customer}</h3>
                <p className="text-gray-400 text-sm">{customer.toLowerCase().replace(' ', '.')}@email.com</p>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Orders</span>
                <span className="text-white font-medium">{Math.floor(Math.random() * 20) + 5}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Total Spent</span>
                <span className="text-white font-medium">${(Math.random() * 500 + 100).toFixed(2)}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex-1 px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all text-sm">
                View
              </button>
              <button className="flex-1 px-3 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all text-sm">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
