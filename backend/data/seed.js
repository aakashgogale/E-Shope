const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Product = require('../models/Product');

const products = [
  // New Arrivals
  {
    name: 'T-shirt with Tape Details',
    description: 'A comfortable everyday t-shirt with unique tape detailing on the sleeves.',
    price: 120, originalPrice: null, discount: 0,
    category: 'casual',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80'],
    colors: ['black', 'white', 'gray'], sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.5, reviewCount: 88, isNew: true, isTopSelling: false, tags: ['t-shirt', 'casual', 'tape'],
  },
  {
    name: 'Skinny Fit Jeans',
    description: 'Classic skinny fit jeans with a modern cut for all-day comfort.',
    price: 240, originalPrice: 260, discount: 20,
    category: 'casual',
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80'],
    colors: ['blue', 'black', 'gray'], sizes: ['28', '30', '32', '34', '36'],
    rating: 3.5, reviewCount: 65, isNew: true, isTopSelling: false, tags: ['jeans', 'skinny', 'denim'],
  },
  {
    name: 'Checkered Shirt',
    description: 'Stylish checkered pattern shirt perfect for casual outings.',
    price: 180, originalPrice: null, discount: 0,
    category: 'casual',
    images: ['https://images.unsplash.com/photo-1563389313-e4507e85c67d?w=500&q=80'],
    colors: ['red', 'blue', 'green'], sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.5, reviewCount: 72, isNew: true, isTopSelling: false, tags: ['shirt', 'checkered', 'casual'],
  },
  {
    name: 'Sleeve Striped T-shirt',
    description: 'Bold striped sleeve t-shirt with a relaxed fit for casual wear.',
    price: 130, originalPrice: 160, discount: 30,
    category: 'casual',
    images: ['https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=500&q=80'],
    colors: ['orange', 'white', 'black'], sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.5, reviewCount: 54, isNew: true, isTopSelling: false, tags: ['t-shirt', 'striped', 'sleeve'],
  },
  // Top Selling
  {
    name: 'Vertical Striped Shirt',
    description: 'Elegant vertical striped shirt with a slim fit silhouette.',
    price: 212, originalPrice: 232, discount: 20,
    category: 'formal',
    images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&q=80'],
    colors: ['green', 'white', 'navy'], sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 5.0, reviewCount: 120, isNew: false, isTopSelling: true, tags: ['shirt', 'striped', 'formal'],
  },
  {
    name: 'Courage Graphic T-shirt',
    description: 'Bold graphic tee with artistic prints for the fearless.',
    price: 145, originalPrice: null, discount: 0,
    category: 'casual',
    images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80'],
    colors: ['orange', 'black', 'white'], sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.0, reviewCount: 98, isNew: false, isTopSelling: true, tags: ['graphic', 't-shirt', 'casual'],
  },
  {
    name: 'Loose Fit Bermuda Shorts',
    description: 'Relaxed bermuda shorts perfect for summer and beach outings.',
    price: 80, originalPrice: null, discount: 0,
    category: 'casual',
    images: ['https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=500&q=80'],
    colors: ['khaki', 'navy', 'olive'], sizes: ['S', 'M', 'L', 'XL'],
    rating: 3.0, reviewCount: 45, isNew: false, isTopSelling: true, tags: ['shorts', 'bermuda', 'casual'],
  },
  {
    name: 'Faded Skinny Jeans',
    description: 'Trendy faded skinny jeans with a modern distressed look.',
    price: 210, originalPrice: null, discount: 0,
    category: 'casual',
    images: ['https://images.unsplash.com/photo-1604176354204-9268737828e4?w=500&q=80'],
    colors: ['black', 'gray'], sizes: ['28', '30', '32', '34'],
    rating: 4.5, reviewCount: 87, isNew: false, isTopSelling: true, tags: ['jeans', 'faded', 'skinny'],
  },
  // Additional products - Formal
  {
    name: 'Classic Oxford Shirt',
    description: 'Timeless oxford shirt for a polished professional look.',
    price: 195, originalPrice: 220, discount: 12,
    category: 'formal',
    images: ['https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&q=80'],
    colors: ['white', 'light-blue', 'gray'], sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.8, reviewCount: 160, isNew: false, isTopSelling: false, tags: ['oxford', 'formal', 'shirt'],
  },
  {
    name: 'Slim Fit Blazer',
    description: 'Sharp slim-fit blazer perfect for business meetings and formal events.',
    price: 450, originalPrice: 520, discount: 15,
    category: 'formal',
    images: ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80'],
    colors: ['navy', 'charcoal', 'black'], sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.9, reviewCount: 203, isNew: false, isTopSelling: true, tags: ['blazer', 'formal', 'slim'],
  },
  // Party
  {
    name: 'Sequin Party Top',
    description: 'Glitzy sequin top that shines on the dance floor.',
    price: 165, originalPrice: 200, discount: 18,
    category: 'party',
    images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80'],
    colors: ['gold', 'silver', 'black'], sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.7, reviewCount: 134, isNew: true, isTopSelling: false, tags: ['party', 'sequin', 'glam'],
  },
  {
    name: 'Velvet Blazer',
    description: 'Luxurious velvet blazer for a night out to remember.',
    price: 320, originalPrice: 380, discount: 16,
    category: 'party',
    images: ['https://images.unsplash.com/photo-1533310266094-8898a03807dd?w=500&q=80'],
    colors: ['burgundy', 'navy', 'emerald'], sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.6, reviewCount: 89, isNew: false, isTopSelling: true, tags: ['velvet', 'blazer', 'party'],
  },
  // Gym
  {
    name: 'Performance Dry-Fit Tee',
    description: 'Moisture-wicking dry-fit tee for intense workout sessions.',
    price: 85, originalPrice: null, discount: 0,
    category: 'gym',
    images: ['https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&q=80'],
    colors: ['black', 'white', 'red', 'blue'], sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.8, reviewCount: 312, isNew: false, isTopSelling: true, tags: ['gym', 'dry-fit', 'performance'],
  },
  {
    name: 'Compression Gym Shorts',
    description: 'High-performance compression shorts for maximum athletic output.',
    price: 65, originalPrice: 80, discount: 19,
    category: 'gym',
    images: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80'],
    colors: ['black', 'navy', 'gray'], sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.5, reviewCount: 178, isNew: true, isTopSelling: false, tags: ['gym', 'shorts', 'compression'],
  },
  {
    name: 'Athletic Hoodie',
    description: 'Lightweight athletic hoodie for pre and post workout comfort.',
    price: 140, originalPrice: 165, discount: 15,
    category: 'gym',
    images: ['https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=500&q=80'],
    colors: ['gray', 'black', 'navy'], sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.7, reviewCount: 245, isNew: false, isTopSelling: false, tags: ['hoodie', 'gym', 'athletic'],
  },
  {
    name: 'Linen Casual Shirt',
    description: 'Breathable linen shirt for a relaxed summer vibe.',
    price: 110, originalPrice: null, discount: 0,
    category: 'casual',
    images: ['https://images.unsplash.com/photo-1589992896855-44e193d8d438?w=500&q=80'],
    colors: ['beige', 'white', 'sage'], sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.3, reviewCount: 67, isNew: true, isTopSelling: false, tags: ['linen', 'casual', 'shirt'],
  },
  {
    name: 'Oversized Hoodie',
    description: 'Cozy oversized hoodie for ultimate comfort on lazy days.',
    price: 155, originalPrice: 180, discount: 14,
    category: 'casual',
    images: ['https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=500&q=80'],
    colors: ['cream', 'gray', 'black', 'dusty-pink'], sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.9, reviewCount: 421, isNew: false, isTopSelling: true, tags: ['hoodie', 'oversized', 'casual'],
  },
  {
    name: 'Tailored Trousers',
    description: 'Precision-tailored trousers for a sharp professional appearance.',
    price: 275, originalPrice: 310, discount: 11,
    category: 'formal',
    images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&q=80'],
    colors: ['charcoal', 'navy', 'black', 'gray'], sizes: ['28', '30', '32', '34', '36', '38'],
    rating: 4.6, reviewCount: 143, isNew: false, isTopSelling: false, tags: ['trousers', 'formal', 'tailored'],
  },
  {
    name: 'Party Bodycon Dress',
    description: 'Figure-flattering bodycon dress that turns heads at every event.',
    price: 190, originalPrice: 230, discount: 17,
    category: 'party',
    images: ['https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&q=80'],
    colors: ['black', 'red', 'emerald'], sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.8, reviewCount: 198, isNew: true, isTopSelling: true, tags: ['dress', 'bodycon', 'party'],
  },
  {
    name: 'Sport Leggings',
    description: 'High-waist sport leggings with four-way stretch for full range of motion.',
    price: 95, originalPrice: 115, discount: 17,
    category: 'gym',
    images: ['https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&q=80'],
    colors: ['black', 'gray', 'navy', 'olive'], sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.9, reviewCount: 567, isNew: false, isTopSelling: true, tags: ['leggings', 'gym', 'sport'],
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shopco');
    console.log('Connected to MongoDB');
    await Product.deleteMany({});
    console.log('Cleared existing products');
    const inserted = await Product.insertMany(products);
    console.log(`✅ Seeded ${inserted.length} products successfully!`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
