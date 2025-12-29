import React from 'react';
import { Home, ShoppingCart, Menu, User, Notebook, History, Sun, Moon, LogOut } from 'lucide-react';

export interface HeaderProps {
  view: 'home' | 'checkout' | 'orders' | 'order-history' | 'order-details';
  setView: (view: HeaderProps['view']) => void;
  setIsCartOpen: (open: boolean) => void;
  getTotalItems: () => number;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  menuRef: React.RefObject<HTMLDivElement> | null;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  username: string;
  isLoggedIn: boolean;
  onSignInClick: () => void;
  onSignUpClick: () => void;
}

export default function Header({
  view,
  setView,
  setIsCartOpen,
  getTotalItems,
  menuOpen,
  setMenuOpen,
  menuRef,
  theme,
  toggleTheme,
  username,
  isLoggedIn,
  onSignInClick,
  onSignUpClick,
}: HeaderProps) {
  return (
    <header className="bg-white/90 dark:bg-gray-800/90 backdrop-blur shadow-sm sticky top-0 z-40">
      <div className="w-full mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center min-h-14 sm:min-h-16 py-2">
          <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
            <div className="p-1.5 sm:p-2 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-lg shadow-lg flex-shrink-0">
              <img
                src="/zi-logo.svg"
                alt="ZI Premium Shop Logo"
                className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-2xl md:text-3xl font-extrabold leading-tight whitespace-nowrap sm:whitespace-normal break-words">
                <span className="bg-gradient-to-r from-pink-500 via-amber-400 to-sky-500 bg-clip-text text-transparent drop-shadow-sm">
                  ZI PREMIUM SERVICES
                </span>
              </h1>
              <p className="hidden sm:block text-xs text-gray-500 dark:text-gray-300">Premium Digital Services</p>
            </div>
          </div>
          <div className="relative flex items-center gap-1.5 sm:gap-2 shrink-0 ml-2">
            {isLoggedIn ? (
              <>
                {view === 'checkout' && (
                  <button
                    onClick={() => setView('home')}
                    className="hidden md:inline-flex px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/60 text-gray-700 dark:text-gray-200"
                  >
                    Continue Shopping
                  </button>
                )}
                <button
                  onClick={() => {
                    setView('home');
                    setIsCartOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-1.5 sm:p-2 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg active:translate-y-[1px] flex-shrink-0"
                  aria-label="Go to Home"
                >
                  <Home className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-1.5 sm:p-2 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg flex-shrink-0"
                >
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shadow-md text-[10px] sm:text-xs">
                      {getTotalItems()}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-1.5 sm:p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/60 text-gray-700 dark:text-gray-200 flex-shrink-0"
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                >
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </>
            ) : (
              <>
                {/* Sign In Button */}
                <button 
                  onClick={onSignInClick}
                  className="hidden sm:inline-flex px-3 py-1.5 text-sm font-medium border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/60 text-gray-700 dark:text-gray-200 transition-all"
                >
                  Sign In
                </button>
                
                {/* Sign Up Button */}
                <button 
                  onClick={onSignUpClick}
                  className="hidden sm:inline-flex px-3 py-1.5 text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-md"
                >
                  Sign Up
                </button>
              </>
            )}

            {menuOpen && isLoggedIn && (
              <div
                ref={menuRef}
                className="absolute right-0 top-12 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden z-[45]"
              >
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center shadow">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{username}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">zi@example.com</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setView('orders');
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Notebook className="w-4 h-4" /> My Orders
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setView('order-history');
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <History className="w-4 h-4" /> Order History
                </button>
                <button
                  onClick={() => {
                    toggleTheme();
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <span className="inline-flex items-center gap-3">
                    <Sun className={`w-4 h-4 ${theme === 'dark' ? 'hidden' : ''}`} />
                    <Moon className={`w-4 h-4 ${theme === 'dark' ? '' : 'hidden'}`} /> Theme
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full border border-gray-200 dark:border-gray-600">
                    {theme === 'dark' ? 'Dark' : 'Light'}
                  </span>
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    alert('Signed out');
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
