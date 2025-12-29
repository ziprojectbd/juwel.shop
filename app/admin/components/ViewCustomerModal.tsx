import { X, Mail, Phone, MapPin, Calendar, ShoppingBag, DollarSign } from 'lucide-react';

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
  notes?: string;
}

interface ViewCustomerModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  customer: Customer | null;
}

export default function ViewCustomerModal({ showModal, setShowModal, customer }: ViewCustomerModalProps) {
  if (!showModal || !customer) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[10000] flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl w-full max-w-sm sm:max-w-lg max-h-[95vh] overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="sticky top-0 bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-b border-white/20 p-4 sm:p-6 flex items-center justify-between shadow-lg">
          <h3 className="text-lg sm:text-2xl font-bold text-white">Customer Details</h3>
          <button
            onClick={() => setShowModal(false)}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
        
        <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 overflow-y-auto max-h-[calc(95vh-120px)]">
          {/* Customer Header */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
              <span className="text-white text-lg sm:text-2xl font-bold">
                {customer.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-lg sm:text-2xl font-bold text-white truncate">{customer.name}</h4>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mt-2 space-y-1 sm:space-y-0">
                <span className="text-purple-400 text-xs sm:text-sm font-medium bg-purple-500/10 px-2 py-1 rounded-full">{customer.id}</span>
                {customer.isVip && (
                  <span className="px-2 sm:px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs rounded-full font-semibold shadow-lg inline-block">
                    ⭐ VIP
                  </span>
                )}
                <span className="text-gray-400 text-xs sm:text-sm flex items-center">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM4 8h12v8H4V8z"/>
                  </svg>
                  Since {customer.joinDate || '2024'}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 gap-6 sm:gap-8">
            <div className="space-y-4 sm:space-y-6">
              <h5 className="text-lg sm:text-xl font-semibold text-white flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Contact Information
              </h5>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-200">
                  <div className="p-2 bg-blue-500/20 rounded-lg sm:rounded-xl flex-shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1">Email Address</p>
                    <p className="text-white font-medium text-sm sm:text-base break-words">{customer.email}</p>
                  </div>
                </div>
                
                {customer.phone && (
                  <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-200">
                    <div className="p-2 bg-green-500/20 rounded-lg sm:rounded-xl flex-shrink-0">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1">Phone Number</p>
                      <p className="text-white font-medium text-sm sm:text-base break-words">{customer.phone}</p>
                    </div>
                  </div>
                )}
                
                {(customer.address || customer.country) && (
                  <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-200">
                    <div className="p-2 bg-purple-500/20 rounded-lg sm:rounded-xl flex-shrink-0">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1">Address</p>
                      <p className="text-white font-medium text-sm sm:text-base break-words">
                        {customer.address && `${customer.address}`}
                        {customer.address && customer.country && ', '}
                        {customer.country}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h5 className="text-lg sm:text-xl font-semibold text-white flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Order Statistics
              </h5>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-200">
                  <div className="p-2 bg-amber-500/20 rounded-lg sm:rounded-xl flex-shrink-0">
                    <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1">Total Orders</p>
                    <p className="text-white font-medium text-base sm:text-lg">{customer.orders || 0}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-200">
                  <div className="p-2 bg-emerald-500/20 rounded-lg sm:rounded-xl flex-shrink-0">
                    <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1">Total Spent</p>
                    <p className="text-white font-medium text-base sm:text-lg">${customer.totalSpent?.toFixed(2) || '0.00'}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-200">
                  <div className="p-2 bg-indigo-500/20 rounded-lg sm:rounded-xl flex-shrink-0">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1">Member Since</p>
                    <p className="text-white font-medium text-sm sm:text-base">{customer.joinDate || 'January 2024'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {customer.notes && (
            <div className="space-y-3 sm:space-y-4">
              <h5 className="text-lg sm:text-xl font-semibold text-white flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                Notes
              </h5>
              <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                <p className="text-gray-200 leading-relaxed text-sm sm:text-base">{customer.notes}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col space-y-3 sm:space-y-4 pt-4 sm:pt-6 border-t border-white/20">
            <button
              onClick={() => setShowModal(false)}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/10 text-white rounded-xl sm:rounded-2xl hover:bg-white/20 transition-all duration-200 font-medium text-base sm:text-lg shadow-lg"
            >
              Close
            </button>
            <button
              className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl sm:rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium text-base sm:text-lg shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
            >
              Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
