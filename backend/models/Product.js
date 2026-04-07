const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true, min: 0 },
  originalPrice: { type: Number, default: null },
  discount: { type: Number, default: 0 }, // percentage
  category: { type: String, required: true, enum: ['casual', 'formal', 'party', 'gym'], lowercase: true },
  images: [{ type: String }],
  colors: [{ type: String }],
  sizes: [{ type: String }],
  rating: { type: Number, default: 4.0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  inStock: { type: Boolean, default: true },
  isNew: { type: Boolean, default: false },
  isTopSelling: { type: Boolean, default: false },
  tags: [{ type: String }],
}, { timestamps: true, suppressReservedKeysWarning: true });

productSchema.index({ name: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Product', productSchema);
