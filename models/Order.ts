import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'cancelled', 'refunded'],
    default: 'pending',
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'debit_card', 'paypal', 'stripe', 'crypto'],
    default: 'credit_card',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending',
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  deliveryDate: {
    type: Date,
    default: null,
  },
  notes: {
    type: String,
    trim: true,
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  }],
}, {
  timestamps: true,
});

// Generate order number before saving
orderSchema.pre('save', async function(next: any) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `#ORD-${String(count + 1).padStart(3, '0')}`;
  }
  next();
});

// Virtual for formatted amount
orderSchema.virtual('formattedAmount').get(function() {
  return `$${this.amount.toFixed(2)}`;
});

// Virtual for status with color
orderSchema.virtual('statusInfo').get(function() {
  const statusMap = {
    pending: { color: 'yellow', label: 'Pending' },
    processing: { color: 'blue', label: 'Processing' },
    completed: { color: 'green', label: 'Completed' },
    cancelled: { color: 'red', label: 'Cancelled' },
    refunded: { color: 'gray', label: 'Refunded' }
  };
  return statusMap[this.status as keyof typeof statusMap] || statusMap.pending;
});

// Virtual for formatted date
orderSchema.virtual('formattedDate').get(function() {
  return this.orderDate.toISOString().split('T')[0];
});

orderSchema.set('toJSON', { virtuals: true });
orderSchema.set('toObject', { virtuals: true });

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
