import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

const ProductCard = ({ product }) => {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPct = hasDiscount ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="product-card group"
    >
      <Link to={`/products/${product._id}`} className="block">
        {/* Image */}
        <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-square relative">
          <motion.img
            src={product.images?.[0] || 'https://via.placeholder.com/300x300?text=No+Image'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {product.isNew && (
            <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">NEW</span>
          )}
          {hasDiscount && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">-{discountPct}%</span>
          )}
        </div>

        {/* Info */}
        <div className="pt-3 px-1 pb-2">
          <h3 className="font-semibold text-sm text-black truncate mb-1">{product.name}</h3>
          <StarRating rating={product.rating} />
          <div className="flex items-center gap-2 mt-1.5">
            <span className="font-bold text-base">${product.price}</span>
            {hasDiscount && (
              <>
                <span className="text-gray-400 line-through text-sm">${product.originalPrice}</span>
                <span className="text-red-500 text-xs font-semibold">-{discountPct}%</span>
              </>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
