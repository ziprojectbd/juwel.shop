import { Users, Ban, Shield, ShieldOff } from 'lucide-react';

interface CustomersTabProps {
  setShowViewCustomerModal: (show: boolean) => void;
  setShowEditCustomerModal: (show: boolean) => void;
  setSelectedCustomer: (customer: Customer | null) => void;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  country?: string;
  joinDate?: string;
  orders?: number;
  totalSpent?: number;
  isVip?: boolean;
  emailNotifications?: boolean;
  notes?: string;
  isBanned?: boolean;
}

export default function CustomersTab({ setShowViewCustomerModal, setShowEditCustomerModal, setSelectedCustomer }: CustomersTabProps) {
  const customers: Customer[] = [
    {
      id: 'UID-001',
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, New York, NY 10001',
      country: 'United States',
      joinDate: 'January 2024',
      orders: 12,
      totalSpent: 1250.50,
      isVip: true,
      emailNotifications: true,
      notes: 'Prefers premium products, always pays on time'
    },
    {
      id: 'UID-002',
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+1 (555) 987-6543',
      address: '456 Oak Ave, Los Angeles, CA 90001',
      country: 'United States',
      joinDate: 'February 2024',
      orders: 8,
      totalSpent: 875.25,
      isVip: false,
      emailNotifications: true,
      notes: 'Interested in eco-friendly products'
    },
    {
      id: 'UID-003',
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      phone: '+1 (555) 456-7890',
      address: '789 Pine Rd, Chicago, IL 60007',
      country: 'United States',
      joinDate: 'March 2024',
      orders: 15,
      totalSpent: 2100.75,
      isVip: true,
      emailNotifications: false,
      notes: 'Frequent bulk orders'
    },
    {
      id: 'UID-004',
      name: 'Sarah Williams',
      email: 'sarah.williams@email.com',
      phone: '+1 (555) 321-6547',
      address: '321 Elm St, Houston, TX 77001',
      country: 'United States',
      joinDate: 'April 2024',
      orders: 6,
      totalSpent: 450.00,
      isVip: false,
      emailNotifications: true,
      notes: '',
      isBanned: true
    },
    {
      id: 'UID-005',
      name: 'Tom Brown',
      email: 'tom.brown@email.com',
      phone: '+1 (555) 654-3210',
      address: '654 Maple Dr, Phoenix, AZ 85001',
      country: 'United States',
      joinDate: 'May 2024',
      orders: 10,
      totalSpent: 925.50,
      isVip: false,
      emailNotifications: true,
      notes: 'Prefers fast shipping'
    },
    {
      id: 'UID-006',
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1 (555) 789-0123',
      address: '987 Cedar Ln, Philadelphia, PA 19101',
      country: 'United States',
      joinDate: 'June 2024',
      orders: 18,
      totalSpent: 1875.25,
      isVip: true,
      emailNotifications: true,
      notes: 'Very satisfied customer, often refers friends'
    }
  ];

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowViewCustomerModal(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowEditCustomerModal(true);
  };

  const handleBanCustomer = (customer: Customer) => {
    const action = customer.isBanned ? 'unban' : 'ban';
    if (window.confirm(`Are you sure you want to ${action} customer "${customer.name}" (${customer.id})?`)) {
      console.log(`${action === 'ban' ? 'Banning' : 'Unbanning'} customer:`, customer.id);
      // Here you would typically call an API to ban/unban the customer
      alert(`Customer "${customer.name}" has been ${action}ed (demo)`);
    }
  };
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Customers Management</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {customers.map((customer) => (
          <div key={customer.id} className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-purple-500/30 p-4 sm:p-6 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-300"></div>
            
            {/* VIP Badge */}
            {customer.isVip && (
              <div className="absolute top-3 right-3 z-10">
                <span className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs rounded-full font-semibold shadow-lg">
                  <span className="mr-1">⭐</span> VIP
                </span>
              </div>
            )}
            
            <div className="relative z-10">
              {/* Customer Avatar */}
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4">
                <div className="relative">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                    <span className="text-white text-lg sm:text-xl font-bold">
                      {customer.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900"></div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center">
                    <h3 className="text-white font-bold text-sm sm:text-base truncate group-hover:text-purple-200 transition-colors">{customer.name}</h3>
                    {customer.isBanned && (
                      <span className="inline-flex items-center px-2 py-0.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full font-semibold shadow-lg ml-2">
                        <Ban className="w-3 h-3 mr-1" />
                        BANNED
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="text-gray-400 text-xs sm:text-sm truncate">{customer.email}</p>
                    <span className="text-purple-400 text-xs font-medium bg-purple-500/10 px-2 py-0.5 rounded-full">{customer.id}</span>
                  </div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-xl p-3 border border-blue-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-400 text-xs font-medium">Orders</span>
                    <span className="text-white font-bold text-sm">{customer.orders || 0}</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 rounded-xl p-3 border border-emerald-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-400 text-xs font-medium">Spent</span>
                    <span className="text-white font-bold text-sm">${customer.totalSpent?.toFixed(0) || '0'}</span>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleViewCustomer(customer)}
                  className="flex-1 px-2 sm:px-3 py-2 bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-300 rounded-xl hover:from-blue-500/30 hover:to-blue-600/30 transition-all duration-200 text-xs font-medium border border-blue-500/20 hover:border-blue-500/40"
                >
                  <span className="flex items-center justify-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View
                  </span>
                </button>
                <button 
                  onClick={() => handleEditCustomer(customer)}
                  className="flex-1 px-2 sm:px-3 py-2 bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-300 rounded-xl hover:from-green-500/30 hover:to-green-600/30 transition-all duration-200 text-xs font-medium border border-green-500/20 hover:border-green-500/40"
                >
                  <span className="flex items-center justify-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </span>
                </button>
                <button 
                  onClick={() => handleBanCustomer(customer)}
                  className={`flex-1 px-2 sm:px-3 py-2 rounded-xl transition-all duration-200 text-xs font-medium border ${
                    customer.isBanned 
                      ? 'bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-300 hover:from-green-500/30 hover:to-green-600/30 border-green-500/20 hover:border-green-500/40'
                      : 'bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-300 hover:from-red-500/30 hover:to-red-600/30 border-red-500/20 hover:border-red-500/40'
                  }`}
                >
                  <span className="flex items-center justify-center">
                    {customer.isBanned ? (
                      <>
                        <Shield className="w-3 h-3 mr-1" />
                        Unban
                      </>
                    ) : (
                      <>
                        <Ban className="w-3 h-3 mr-1" />
                        Ban
                      </>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
