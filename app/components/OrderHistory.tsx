import type React from 'react';

export interface OrderItem {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  icon: React.ReactNode;
  features: string[];
  rating: number;
  reviews: number;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total: number;
  items: OrderItem[];
  paymentMethod: string;
  trxId: string;
  payerNumber: string;
}

export interface OrderHistoryProps {
  orders: Order[];
  onSelectOrder: (order: Order) => void;
  onReorder: (order: Order) => void;
  onBackToHome: () => void;
}

export default function OrderHistory({ orders, onSelectOrder, onReorder, onBackToHome }: OrderHistoryProps) {
  return null as any;
}
