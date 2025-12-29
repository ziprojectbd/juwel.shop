import { X } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  country?: string;
  isVip?: boolean;
  emailNotifications?: boolean;
  notes?: string;
}

interface EditCustomerModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  customer: Customer | null;
  onSave?: (customer: Customer) => void;
}

export default function EditCustomerModal({ showModal, setShowModal, customer, onSave }: EditCustomerModalProps) {
  if (!showModal || !customer) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const updatedCustomer: Customer = {
      id: customer.id,
      name: `${formData.get('firstName')} ${formData.get('lastName')}`,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
      country: formData.get('country') as string,
      isVip: formData.has('isVip'),
      emailNotifications: formData.has('emailNotifications'),
      notes: formData.get('notes') as string,
    };

    onSave?.(updatedCustomer);
    setShowModal(false);
  };

  const [firstName, lastName] = customer.name.split(' ');

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[10000] flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl w-full max-w-sm sm:max-w-lg max-h-[95vh] overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="sticky top-0 bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-b border-white/20 p-4 sm:p-6 flex items-center justify-between shadow-lg">
          <div>
            <h3 className="text-lg sm:text-2xl font-bold text-white">Edit Customer</h3>
            <p className="text-purple-400 text-sm mt-1">{customer.id}</p>
          </div>
          <button
            onClick={() => setShowModal(false)}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6 sm:space-y-8 overflow-y-auto max-h-[calc(95vh-120px)]">
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3">First Name</label>
              <input
                type="text"
                name="firstName"
                defaultValue={firstName}
                placeholder="John"
                className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3">Last Name</label>
              <input
                type="text"
                name="lastName"
                defaultValue={lastName}
                placeholder="Doe"
                className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3">Email Address</label>
            <input
              type="email"
              name="email"
              defaultValue={customer.email}
              placeholder="john.doe@email.com"
              className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3">Phone Number</label>
              <input
                type="tel"
                name="phone"
                defaultValue={customer.phone}
                placeholder="+1 (555) 000-0000"
                className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
              />
            </div>
            
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3">Country</label>
              <select 
                name="country"
                defaultValue={customer.country || 'United States'}
                className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
              >
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Canada</option>
                <option>Australia</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3">Address</label>
            <textarea
              name="address"
              rows={3}
              defaultValue={customer.address}
              placeholder="Street address, city, state, zip code"
              className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none transition-all duration-200"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3">Notes</label>
            <textarea
              name="notes"
              rows={3}
              defaultValue={customer.notes}
              placeholder="Additional notes about the customer..."
              className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none transition-all duration-200"
            ></textarea>
          </div>

          <div className="space-y-3 sm:space-y-4 p-4 sm:p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl sm:rounded-2xl border border-purple-500/20">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                name="isVip"
                defaultChecked={customer.isVip}
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-lg border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500 focus:ring-2 flex-shrink-0"
              />
              <div className="flex-1">
                <span className="text-gray-200 font-medium text-sm sm:text-base group-hover:text-white transition-colors">VIP Customer</span>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">Grant special privileges and benefits</p>
              </div>
            </label>
            
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                name="emailNotifications"
                defaultChecked={customer.emailNotifications !== false}
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-lg border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500 focus:ring-2 flex-shrink-0"
              />
              <div className="flex-1">
                <span className="text-gray-200 font-medium text-sm sm:text-base group-hover:text-white transition-colors">Email Notifications</span>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">Send promotional and order updates</p>
              </div>
            </label>
          </div>

          <div className="flex flex-col space-y-3 sm:space-y-4 pt-4 sm:pt-6 border-t border-white/20">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/10 text-white rounded-xl sm:rounded-2xl hover:bg-white/20 transition-all duration-200 font-medium text-base sm:text-lg shadow-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl sm:rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium text-base sm:text-lg shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
