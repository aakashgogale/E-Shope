import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { items, subtotal, discount, deliveryFee, total, updateItem, removeItem, loading } = useCart();

  if (loading) return (
    <div className="container-main py-12">
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map(i => <div key={i} className="h-24 bg-gray-100 rounded-2xl" />)}
      </div>
    </div>
  );

  if (items.length === 0) return (
    <div className="container-main py-20 text-center">
      <ShoppingBag size={64} className="mx-auto mb-4 text-gray-200" />
      <h2 className="font-bold text-2xl mb-2">Your cart is empty</h2>
      <p className="text-gray-400 mb-6">Looks like you haven't added anything yet.</p>
      <Link to="/products" className="btn-primary inline-block">Start Shopping</Link>
    </div>
  );

  return (
    <div className="container-main py-8 md:py-12">
      <h1 className="font-black text-3xl md:text-4xl uppercase mb-8">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart items */}
        <div className="flex-1">
          <div className="border border-gray-100 rounded-3xl overflow-hidden divide-y divide-gray-100">
            <AnimatePresence>
              {items.map(item => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex gap-4 p-5"
                >
                  {/* Image */}
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-2xl overflow-hidden shrink-0">
                    <img
                      src={item.image || 'https://via.placeholder.com/100'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-sm md:text-base truncate">{item.name}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          {item.size && <span className="text-xs text-gray-400">Size: <span className="text-black font-medium">{item.size}</span></span>}
                          {item.color && <span className="text-xs text-gray-400">Color: <span className="text-black font-medium capitalize">{item.color}</span></span>}
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item._id)}
                        className="text-red-400 hover:text-red-600 transition-colors p-1 shrink-0"
                        aria-label="Remove item"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="font-bold text-base">${(item.price * item.quantity).toFixed(2)}</span>
                      {/* Qty controls */}
                      <div className="flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1">
                        <button
                          onClick={() => updateItem(item._id, item.quantity - 1)}
                          className="hover:opacity-70"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-semibold w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateItem(item._id, item.quantity + 1)}
                          className="hover:opacity-70"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:w-96 shrink-0">
          <div className="border border-gray-100 rounded-3xl p-6 sticky top-28">
            <h2 className="font-bold text-xl mb-5">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-red-500">
                <span className="flex items-center gap-1"><Tag size={13} /> Discount (10%)</span>
                <span className="font-semibold">-${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery Fee</span>
                <span className="font-semibold">${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-black">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Promo code */}
            <div className="mt-4 flex gap-2">
              <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2 gap-2">
                <Tag size={14} className="text-gray-400 shrink-0" />
                <input type="text" placeholder="Add promo code" className="bg-transparent text-sm outline-none flex-1" />
              </div>
              <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                Apply
              </button>
            </div>

            <Link
              to="/checkout"
              className="mt-5 block btn-primary text-center py-4 text-base font-semibold"
            >
              Go to Checkout →
            </Link>

            <div className="mt-4 text-center">
              <Link to="/products" className="text-sm text-gray-400 hover:text-black underline">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
