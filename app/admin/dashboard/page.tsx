'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DashboardTab from '../components/DashboardTab';
import OrdersTab from '../components/OrdersTab';
import ProductsTab from '../components/ProductsTab';
import CustomersTab from '../components/CustomersTab';
import SettingsTab from '../components/SettingsTab';
import AddProductModal from '../components/AddProductModal';
import AddCustomerModal from '../components/AddCustomerModal';

export default function AdminDashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);

  const handleLogout = () => {
    router.push('/admin/login');
  };

  // Mock data
  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', product: 'Netflix Premium', amount: '$15.99', status: 'Completed', date: '2024-12-03' },
    { id: '#ORD-002', customer: 'Jane Smith', product: 'Spotify Family', amount: '$19.99', status: 'Pending', date: '2024-12-03' },
    { id: '#ORD-003', customer: 'Mike Johnson', product: 'YouTube Premium', amount: '$11.99', status: 'Completed', date: '2024-12-02' },
    { id: '#ORD-004', customer: 'Sarah Williams', product: 'Disney+ Bundle', amount: '$24.99', status: 'Processing', date: '2024-12-02' },
    { id: '#ORD-005', customer: 'Tom Brown', product: 'Amazon Prime', amount: '$14.99', status: 'Completed', date: '2024-12-01' },
  ];

  const topProducts = [
    { name: 'Netflix Premium', sales: 234, revenue: '$3,742', trend: '+12%' },
    { name: 'Spotify Family', sales: 189, revenue: '$3,778', trend: '+8%' },
    { name: 'YouTube Premium', sales: 156, revenue: '$1,870', trend: '+15%' },
    { name: 'Disney+ Bundle', sales: 142, revenue: '$3,548', trend: '+5%' },
    { name: 'Amazon Prime', sales: 128, revenue: '$1,919', trend: '+10%' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Processing':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Sidebar Component */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header Component */}
        <Header setSidebarOpen={setSidebarOpen} />

        {/* Dashboard Content */}
        <main className="p-6 space-y-6">
          {activeTab === 'dashboard' && (
            <DashboardTab
              recentOrders={recentOrders}
              topProducts={topProducts}
              getStatusColor={getStatusColor}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersTab orders={recentOrders} getStatusColor={getStatusColor} />
          )}

          {activeTab === 'products' && (
            <ProductsTab products={topProducts} setShowProductModal={setShowProductModal} />
          )}

          {activeTab === 'customers' && (
            <CustomersTab setShowCustomerModal={setShowCustomerModal} />
          )}

          {activeTab === 'settings' && <SettingsTab />}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Modals */}
      <AddProductModal 
        showModal={showProductModal} 
        setShowModal={setShowProductModal}
        onProductAdded={() => {
          // Refresh products data when a new product is added
          // This will trigger a re-render of the ProductsTab
        }}
      />
      <AddCustomerModal showModal={showCustomerModal} setShowModal={setShowCustomerModal} />
    </div>
  );
}
