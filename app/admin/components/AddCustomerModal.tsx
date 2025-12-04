import { X } from 'lucide-react';

interface AddCustomerModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

export default function AddCustomerModal({ showModal, setShowModal }: AddCustomerModalProps) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-slate-900 border-b border-white/10 p-6 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white">Add New Customer</h3>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-400 hover:text-white transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
              <input
                type="text"
                placeholder="John"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              placeholder="john.doe@email.com"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Country</label>
              <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Canada</option>
                <option>Australia</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
            <textarea
              rows={3}
              placeholder="Street address, city, state, zip code"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
            <textarea
              rows={3}
              placeholder="Additional notes about the customer..."
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            ></textarea>
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500"
              />
              <span className="text-gray-300 text-sm">VIP Customer</span>
            </label>
            
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500"
              />
              <span className="text-gray-300 text-sm">Email Notifications</span>
            </label>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-medium"
            >
              Add Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
