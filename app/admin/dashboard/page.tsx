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
import ViewCustomerModal from '../components/ViewCustomerModal';
import EditCustomerModal from '../components/EditCustomerModal';

export default function AdminDashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showViewCustomerModal, setShowViewCustomerModal] = useState(false);
  const [showEditCustomerModal, setShowEditCustomerModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const handleLogout = () => {
    router.push('/admin/login');
  };

  // Mock data
  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', product: 'Netflix Premium', amount: '$15.99', status: 'Completed', date: '2024-12-03', createdTime: '2024-12-03 10:30:00' },
    { id: '#ORD-002', customer: 'Jane Smith', product: 'Spotify Family', amount: '$19.99', status: 'Pending', date: '2024-12-03', createdTime: '2024-12-03 14:15:00' },
    { id: '#ORD-003', customer: 'Mike Johnson', product: 'YouTube Premium', amount: '$11.99', status: 'Completed', date: '2024-12-02', createdTime: '2024-12-02 09:45:00' },
    { id: '#ORD-004', customer: 'Sarah Williams', product: 'Disney+ Bundle', amount: '$24.99', status: 'Processing', date: '2024-12-02', createdTime: '2024-12-02 16:20:00' },
    { id: '#ORD-005', customer: 'Tom Brown', product: 'Amazon Prime', amount: '$14.99', status: 'Completed', date: '2024-12-01', createdTime: '2024-12-01 11:00:00' },
  ];

  const topProducts = [
    { 
      name: 'Netflix Premium', 
      sales: 234, 
      revenue: '$3,742', 
      trend: '+12%', 
      category: 'Entertainment',
      priceBDT: 1750,
      priceUSDT: 15.99,
      stock: 1000,
      description: 'Premium streaming service with 4K content and multiple screens',
      imageUrl: 'https://example.com/netflix.jpg',
      featured: true,
      available: true
    },
    { 
      name: 'Spotify Family', 
      sales: 189, 
      revenue: '$3,778', 
      trend: '+8%', 
      category: 'Entertainment',
      priceBDT: 2200,
      priceUSDT: 19.99,
      stock: 500,
      description: 'Music streaming for up to 6 family members',
      imageUrl: 'https://example.com/spotify.jpg',
      featured: true,
      available: true
    },
    { 
      name: 'YouTube Premium', 
      sales: 156, 
      revenue: '$1,870', 
      trend: '+15%', 
      category: 'Entertainment',
      priceBDT: 1300,
      priceUSDT: 11.99,
      stock: 750,
      description: 'Ad-free videos, background play, and downloads',
      imageUrl: 'https://example.com/youtube.jpg',
      featured: false,
      available: true
    },
    { 
      name: 'Disney+ Bundle', 
      sales: 142, 
      revenue: '$3,548', 
      trend: '+5%', 
      category: 'Entertainment',
      priceBDT: 2750,
      priceUSDT: 24.99,
      stock: 300,
      description: 'Disney+, Hulu, and ESPN+ bundle',
      imageUrl: 'https://example.com/disney.jpg',
      featured: true,
      available: true
    },
    { 
      name: 'Amazon Prime', 
      sales: 128, 
      revenue: '$1,919', 
      trend: '+10%', 
      category: 'Entertainment',
      priceBDT: 1650,
      priceUSDT: 14.99,
      stock: 600,
      description: 'Free shipping, streaming, and exclusive deals',
      imageUrl: 'https://example.com/amazon.jpg',
      featured: false,
      available: true
    },
    { 
      name: 'Adobe Creative Suite', 
      sales: 98, 
      revenue: '$4,950', 
      trend: '+18%', 
      category: 'Design',
      priceBDT: 6600,
      priceUSDT: 59.99,
      stock: 200,
      description: 'Complete creative software suite for professionals',
      imageUrl: 'https://example.com/adobe.jpg',
      featured: true,
      available: true
    },
    { 
      name: 'Figma Pro', 
      sales: 87, 
      revenue: '$2,175', 
      trend: '+22%', 
      category: 'Design',
      priceBDT: 2750,
      priceUSDT: 25.00,
      stock: 400,
      description: 'Collaborative design tool for teams',
      imageUrl: 'https://example.com/figma.jpg',
      featured: false,
      available: true
    },
    { 
      name: 'NordVPN', 
      sales: 203, 
      revenue: '$4,060', 
      trend: '+7%', 
      category: 'Security',
      priceBDT: 2200,
      priceUSDT: 19.99,
      stock: 800,
      description: 'Secure VPN service with fast servers worldwide',
      imageUrl: 'https://example.com/nordvpn.jpg',
      featured: true,
      available: true
    },
    { 
      name: 'ExpressVPN', 
      sales: 176, 
      revenue: '$3,520', 
      trend: '+9%', 
      category: 'Security',
      priceBDT: 2200,
      priceUSDT: 20.00,
      stock: 350,
      description: 'High-speed VPN with strong encryption',
      imageUrl: 'https://example.com/expressvpn.jpg',
      featured: false,
      available: true
    },
    { 
      name: 'LinkedIn Premium', 
      sales: 65, 
      revenue: '$1,950', 
      trend: '+11%', 
      category: 'Social Services',
      priceBDT: 3300,
      priceUSDT: 30.00,
      stock: 250,
      description: 'Professional networking with advanced features',
      imageUrl: 'https://example.com/linkedin.jpg',
      featured: false,
      available: true
    },
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
              setActiveTab={setActiveTab}
              setShowProductModal={setShowProductModal}
              setEditingProduct={setEditingProduct}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersTab orders={recentOrders} getStatusColor={getStatusColor} />
          )}

          {activeTab === 'products' && (
            <ProductsTab products={topProducts} setShowProductModal={setShowProductModal} setEditingProduct={setEditingProduct} />
          )}

          {activeTab === 'customers' && (
            <CustomersTab 
              setShowViewCustomerModal={setShowViewCustomerModal}
              setShowEditCustomerModal={setShowEditCustomerModal}
              setSelectedCustomer={setSelectedCustomer}
            />
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
        editingProduct={editingProduct}
        onProductAdded={(product) => {
          if (product) {
            // Refresh products data when a product is added/updated
            // This will trigger a re-render of the ProductsTab
            console.log('Product added/updated:', product);
          }
          setEditingProduct(null);
        }}
      />
      
      <ViewCustomerModal 
        showModal={showViewCustomerModal}
        setShowModal={setShowViewCustomerModal}
        customer={selectedCustomer}
      />
      
      <EditCustomerModal 
        showModal={showEditCustomerModal}
        setShowModal={setShowEditCustomerModal}
        customer={selectedCustomer}
        onSave={(updatedCustomer) => {
          console.log('Updated customer:', updatedCustomer);
          // Here you would typically update the customer in your state/backend
        }}
      />
    </div>
  );
}
