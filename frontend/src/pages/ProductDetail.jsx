import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, Heart, Share2, ShieldCheck, RotateCcw, Truck } from 'lucide-react';
import api from '../lib/api';
import StarRating from '../components/StarRating';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const { addToCart } = useCart();
  const { addToast } = useToast();

  useEffect(() => {
    setLoading(true);
    api.get(`/products/${id}`)
      .then(r => {
        setProduct(r.data);
        if (r.data.colors?.length) setSelectedColor(r.data.colors[0]);
        if (r.data.sizes?.length) setSelectedSize(r.data.sizes[0]);
      })
      .catch(() => addToast('Product not found', 'error'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async () => {
    if (!selectedSize) return addToast('Please select a size', 'error');
    setAdding(true);
    const ok = await addToCart(product._id, qty, selectedSize, selectedColor);
    if (ok) addToast(`"${product.name}" added to cart 🛒`, 'success');
    else addToast('Failed to add to cart', 'error');
    setAdding(false);
  };

  if (loading) return (
    <div className="container-main py-12">
      <div className="grid md:grid-cols-2 gap-10 animate-pulse">
        <div className="bg-gray-100 rounded-3xl aspect-square" />
        <div className="space-y-4">
          <div className="h-8 bg-gray-100 rounded w-3/4" />
          <div className="h-4 bg-gray-100 rounded w-1/2" />
          <div className="h-10 bg-gray-100 rounded w-1/4" />
        </div>
      </div>
    </div>
  );

  if (!product) return <div className="container-main py-12 text-center text-gray-400">Product not found</div>;

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPct = hasDiscount ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="container-main py-8 md:py-12">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-400 mb-8 flex items-center gap-2">
        <Link to="/" className="hover:text-black">Home</Link> /
        <Link to="/products" className="hover:text-black">Products</Link> /
        <Link to={`/products?category=${product.category}`} className="capitalize hover:text-black">{product.category}</Link> /
        <span className="text-black font-medium truncate max-w-[200px]">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        {/* Images */}
        <div className="flex gap-4">
          {/* Thumbnails */}
          {product.images?.length > 1 && (
            <div className="flex flex-col gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === i ? 'border-black' : 'border-transparent'}`}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
          {/* Main image */}
          <motion.div className="flex-1 bg-gray-100 rounded-3xl overflow-hidden aspect-square" layoutId={`product-${product._id}`}>
            <img
              src={product.images?.[selectedImage] || ''}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Info */}
        <div>
          {product.isNew && <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">NEW ARRIVAL</span>}
          <h1 className="font-black text-3xl md:text-4xl uppercase mb-3 leading-tight">{product.name}</h1>

          <div className="flex items-center gap-3 mb-4">
            <StarRating rating={product.rating} count={product.reviewCount} size={16} />
          </div>

          <div className="flex items-center gap-3 mb-5">
            <span className="font-black text-3xl">${product.price}</span>
            {hasDiscount && (
              <>
                <span className="text-gray-400 line-through text-xl">${product.originalPrice}</span>
                <span className="bg-red-100 text-red-600 text-sm font-bold px-2.5 py-0.5 rounded-full">-{discountPct}%</span>
              </>
            )}
          </div>

          <p className="text-gray-500 text-sm leading-relaxed mb-6">{product.description}</p>

          <div className="border-t border-gray-100 pt-5 mb-5">
            {/* Color selector */}
            {product.colors?.length > 0 && (
              <div className="mb-5">
                <p className="text-sm font-semibold mb-2.5">Select Color</p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-1.5 rounded-full border text-sm capitalize transition-all ${selectedColor === color ? 'bg-black text-white border-black' : 'border-gray-200 hover:border-gray-400'}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size selector */}
            {product.sizes?.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2.5">
                  <p className="text-sm font-semibold">Choose Size</p>
                  <button className="text-xs text-gray-400 underline">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[52px] py-2 px-3 rounded-full border text-sm font-medium transition-all ${selectedSize === size ? 'bg-black text-white border-black' : 'border-gray-200 hover:border-gray-400 bg-gray-50'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-3 border border-gray-200 rounded-full px-4 py-2">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="hover:opacity-70 transition-opacity">
                <Minus size={16} />
              </button>
              <span className="font-semibold text-base w-6 text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="hover:opacity-70 transition-opacity">
                <Plus size={16} />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={adding}
              className="flex-1 btn-primary py-3.5 text-base disabled:opacity-70"
            >
              {adding ? 'Adding...' : 'Add to Cart'}
            </button>
            <button
              onClick={() => setWishlist(!wishlist)}
              className={`p-3 border rounded-full transition-all ${wishlist ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-200 hover:border-gray-400'}`}
            >
              <Heart size={20} className={wishlist ? 'fill-red-500' : ''} />
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { Icon: Truck, label: 'Free Delivery', sub: 'Orders over $100' },
              { Icon: RotateCcw, label: 'Free Returns', sub: '30 day return' },
              { Icon: ShieldCheck, label: 'Secure Pay', sub: '100% Protected' },
            ].map(({ Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center text-center bg-gray-50 rounded-2xl p-3">
                <Icon size={20} className="mb-1 text-gray-600" />
                <p className="text-xs font-semibold">{label}</p>
                <p className="text-[10px] text-gray-400">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
