import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['streaming', 'music', 'gaming', 'software', 'vpn', 'cloud', 'custom'],
  },
  customCategory: {
    type: String,
    required: function(this: any) {
      return this.category === 'custom';
    },
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  description: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  available: {
    type: Boolean,
    default: true,
  },
  sales: {
    type: Number,
    default: 0,
  },
  revenue: {
    type: Number,
    default: 0,
  },
  trend: {
    type: String,
    default: '+0%',
  },
}, {
  timestamps: true,
});

// Calculate revenue when sales are updated
productSchema.pre('save', function(next: any) {
  if (this.isModified('sales') || this.isModified('price')) {
    this.revenue = this.sales * this.price;
  }
  next();
});

// Virtual for formatted price
productSchema.virtual('formattedPrice').get(function() {
  return `$${this.price.toFixed(2)}`;
});

// Virtual for formatted revenue
productSchema.virtual('formattedRevenue').get(function() {
  return `$${this.revenue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
});

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

export default mongoose.models.Product || mongoose.model('Product', productSchema);
