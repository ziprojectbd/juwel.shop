import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongoose';
import Order from '../../../../models/Order';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const query: any = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (search) {
      query.$or = [
        { orderNumber: { $regex: search, $options: 'i' } },
        { notes: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      Order.find(query)
        .populate('customer', 'name email')
        .populate('product', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Order.countDocuments(query)
    ]);

    return NextResponse.json({
      success: true,
      data: orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['customer', 'product', 'amount'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate that customer and product are valid ObjectIds
    if (!body.customer.match(/^[0-9a-fA-F]{24}$/) || !body.product.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { success: false, error: 'Invalid customer or product ID' },
        { status: 400 }
      );
    }

    const order = new Order(body);
    await order.save();

    // Populate customer and product details for response
    await order.populate('customer', 'name email');
    await order.populate('product', 'name');

    return NextResponse.json({
      success: true,
      data: order,
      message: 'Order created successfully'
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating order:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Order with this number already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
