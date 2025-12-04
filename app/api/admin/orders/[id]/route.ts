import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../../lib/mongoose';
import Order from '../../../../../models/Order';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const order = await Order.findById(params.id)
      .populate('customer', 'name email phone address')
      .populate('product', 'name price imageUrl');
    
    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const body = await request.json();
    const order = await Order.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    ).populate('customer', 'name email').populate('product', 'name');

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: order,
      message: 'Order updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating order:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Order with this number already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update order' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const order = await Order.findByIdAndDelete(params.id);

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Order deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete order' },
      { status: 500 }
    );
  }
}
