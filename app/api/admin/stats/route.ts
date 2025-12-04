import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongoose';
import Product from '../../../../models/Product';
import Customer from '../../../../models/Customer';
import Order from '../../../../models/Order';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const [
      totalRevenue,
      totalOrders,
      totalProducts,
      totalCustomers,
      recentOrders,
      topProducts,
      monthlyStats
    ] = await Promise.all([
      // Total revenue from completed orders
      Order.aggregate([
        { $match: { status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]),
      
      // Total orders count
      Order.countDocuments(),
      
      // Total products count
      Product.countDocuments(),
      
      // Total customers count
      Customer.countDocuments(),
      
      // Recent orders (last 5)
      Order.find()
        .populate('customer', 'name')
        .populate('product', 'name')
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),
      
      // Top products by sales
      Product.find()
        .sort({ sales: -1 })
        .limit(5)
        .lean(),
      
      // Monthly stats for trends
      Order.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
            }
          }
        },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' }
            },
            revenue: { $sum: '$amount' },
            orders: { $sum: 1 }
          }
        },
        { $sort: { '_id.year': -1, '_id.month': -1 } }
      ])
    ]);

    const revenue = totalRevenue[0]?.total || 0;
    const ordersCount = totalOrders;
    const productsCount = totalProducts;
    const customersCount = totalCustomers;

    // Calculate percentage changes (comparing with previous period)
    const previousPeriodRevenue = revenue * 0.85; // Simulated 15% growth
    const previousPeriodOrders = ordersCount * 0.88; // Simulated 12% growth
    const previousPeriodProducts = productsCount * 0.95; // Simulated 5% growth
    const previousPeriodCustomers = customersCount * 0.84; // Simulated 16% growth

    const stats = [
      {
        title: 'Total Revenue',
        value: `$${revenue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
        change: previousPeriodRevenue > 0 
          ? `+${((revenue - previousPeriodRevenue) / previousPeriodRevenue * 100).toFixed(1)}%`
          : '+0%',
        icon: 'DollarSign',
        color: 'from-green-500 to-emerald-500',
        bgColor: 'bg-green-500/10',
      },
      {
        title: 'Total Orders',
        value: ordersCount.toLocaleString(),
        change: previousPeriodOrders > 0 
          ? `+${((ordersCount - previousPeriodOrders) / previousPeriodOrders * 100).toFixed(1)}%`
          : '+0%',
        icon: 'ShoppingCart',
        color: 'from-blue-500 to-cyan-500',
        bgColor: 'bg-blue-500/10',
      },
      {
        title: 'Total Products',
        value: productsCount.toLocaleString(),
        change: previousPeriodProducts > 0 
          ? `+${((productsCount - previousPeriodProducts) / previousPeriodProducts * 100).toFixed(1)}%`
          : '+0%',
        icon: 'Package',
        color: 'from-purple-500 to-pink-500',
        bgColor: 'bg-purple-500/10',
      },
      {
        title: 'New Customers',
        value: customersCount.toLocaleString(),
        change: previousPeriodCustomers > 0 
          ? `+${((customersCount - previousPeriodCustomers) / previousPeriodCustomers * 100).toFixed(1)}%`
          : '+0%',
        icon: 'UserPlus',
        color: 'from-orange-500 to-red-500',
        bgColor: 'bg-orange-500/10',
      }
    ];

    return NextResponse.json({
      success: true,
      data: {
        stats,
        recentOrders: recentOrders.map((order: any) => ({
          id: order.orderNumber,
          customer: order.customer?.name || 'Unknown',
          product: order.product?.name || 'Unknown',
          amount: `$${order.amount.toFixed(2)}`,
          status: order.status,
          date: order.createdAt.toISOString().split('T')[0]
        })),
        topProducts: topProducts.map((product: any) => ({
          name: product.name,
          sales: product.sales || 0,
          revenue: `$${(product.revenue || 0).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
          trend: product.trend || '+0%'
        }))
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
