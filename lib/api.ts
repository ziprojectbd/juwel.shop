import  { API_CALL } from 'auth-fingerprint';

// Simple fingerprint tracking (fallback approach)
const getDeviceFingerprint = () => {
  // Generate a simple device fingerprint
  const userAgent = navigator.userAgent;
  const screenResolution = `${window.screen.width}x${window.screen.height}`;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const language = navigator.language;
  
  return btoa(`${userAgent}|${screenResolution}|${timezone}|${language}`).substring(0, 32);
};

// Enhanced fetch with fingerprint tracking
const apiCallWithFingerprint = async (url: string, options: RequestInit = {}): Promise<Response> => {
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-Device-Fingerprint': getDeviceFingerprint(),
      ...options.headers,
    },
  });
};

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface Product {
  _id: string;
  name: string;
  category: string;
  customCategory?: string;
  price: number;
  stock: number;
  description?: string;
  imageUrl?: string;
  featured: boolean;
  available: boolean;
  sales: number;
  revenue: number;
  trend: string;
  formattedPrice?: string;
  formattedRevenue?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  avatar?: string;
  totalSpent: number;
  totalOrders: number;
  status: 'active' | 'inactive' | 'suspended';
  registeredAt: string;
  lastOrderDate?: string;
  formattedTotalSpent?: string;
  statusInfo?: {
    color: string;
    label: string;
  };
}

export interface Order {
  _id: string;
  orderNumber: string;
  customer: Customer | string;
  product: Product | string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded';
  paymentMethod: string;
  paymentStatus: string;
  orderDate: string;
  deliveryDate?: string;
  notes?: string;
  items?: Array<{
    product: Product | string;
    quantity: number;
    price: number;
  }>;
  formattedAmount?: string;
  statusInfo?: {
    color: string;
    label: string;
  };
  formattedDate?: string;
}

export interface Stats {
  stats: Array<{
    title: string;
    value: string;
    change: string;
    icon: string;
    color: string;
    bgColor: string;
  }>;
  recentOrders: Array<{
    id: string;
    customer: string;
    product: string;
    amount: string;
    status: string;
    date: string;
  }>;
  topProducts: Array<{
    name: string;
    sales: number;
    revenue: string;
    trend: string;
  }>;
}

// Generic API request function using fingerprint-enhanced fetch
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await apiCallWithFingerprint(`/api/admin${endpoint}`, options);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }

    return data;
  } catch (error) {
    console.error('API request error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Product API calls
export const productApi = {
  getProducts: (params?: {
    page?: number;
    limit?: number;
    category?: string;
    featured?: boolean;
    search?: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    return apiRequest<Product[]>(`/products${searchParams.toString() ? `?${searchParams.toString()}` : ''}`);
  },

  getProduct: (id: string) => apiRequest<Product>(`/products/${id}`),

  createProduct: (product: Omit<Product, '_id' | 'createdAt' | 'updatedAt' | 'formattedPrice' | 'formattedRevenue' | 'sales' | 'revenue' | 'trend'>) =>
    apiRequest<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    }),

  updateProduct: (id: string, product: Partial<Product>) =>
    apiRequest<Product>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    }),

  deleteProduct: (id: string) =>
    apiRequest<null>(`/products/${id}`, {
      method: 'DELETE',
    }),
};

// Customer API calls
export const customerApi = {
  getCustomers: (params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    return apiRequest<Customer[]>(`/customers${searchParams.toString() ? `?${searchParams.toString()}` : ''}`);
  },

  getCustomer: (id: string) => apiRequest<Customer>(`/customers/${id}`),

  createCustomer: (customer: Omit<Customer, '_id' | 'registeredAt' | 'formattedTotalSpent' | 'statusInfo'>) =>
    apiRequest<Customer>('/customers', {
      method: 'POST',
      body: JSON.stringify(customer),
    }),

  updateCustomer: (id: string, customer: Partial<Customer>) =>
    apiRequest<Customer>(`/customers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(customer),
    }),

  deleteCustomer: (id: string) =>
    apiRequest<null>(`/customers/${id}`, {
      method: 'DELETE',
    }),
};

// Order API calls
export const orderApi = {
  getOrders: (params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    return apiRequest<Order[]>(`/orders${searchParams.toString() ? `?${searchParams.toString()}` : ''}`);
  },

  getOrder: (id: string) => apiRequest<Order>(`/orders/${id}`),

  createOrder: (order: Omit<Order, '_id' | 'orderNumber' | 'orderDate' | 'formattedAmount' | 'statusInfo' | 'formattedDate'>) =>
    apiRequest<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    }),

  updateOrder: (id: string, order: Partial<Order>) =>
    apiRequest<Order>(`/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(order),
    }),

  deleteOrder: (id: string) =>
    apiRequest<null>(`/orders/${id}`, {
      method: 'DELETE',
    }),
};

// Stats API call
export const statsApi = {
  getStats: () => apiRequest<Stats>('/stats'),
};
