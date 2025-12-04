import { Menu, Search, Bell, ChevronDown } from 'lucide-react';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ setSidebarOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-white/10">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-white">Dashboard</h2>
            <p className="text-sm text-gray-400">Welcome back, Admin!</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:flex items-center space-x-2 bg-white/5 rounded-lg px-4 py-2 border border-white/10">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-white placeholder-gray-400 w-64"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <button className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-all">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-gray-400">admin@zipremium.com</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </header>
  );
}
