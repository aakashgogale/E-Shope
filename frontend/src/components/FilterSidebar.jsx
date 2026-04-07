import { useState } from 'react';
import { Sliders, X, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = ['casual', 'formal', 'party', 'gym'];

const FilterSidebar = ({ filters, onChange, onClose }) => {
  const [priceRange, setPriceRange] = useState([filters.minPrice || 0, filters.maxPrice || 500]);
  const [openSections, setOpenSections] = useState({ category: true, price: true, rating: true });

  const toggle = (key) => setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));

  const apply = () => {
    onChange({ minPrice: priceRange[0], maxPrice: priceRange[1] });
    if (onClose) onClose();
  };

  const reset = () => {
    setPriceRange([0, 500]);
    onChange({ category: '', minPrice: '', maxPrice: '', rating: '' });
    if (onClose) onClose();
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 sticky top-28">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-base flex items-center gap-2"><Sliders size={16} /> Filters</h3>
        <div className="flex items-center gap-2">
          <button onClick={reset} className="text-xs text-gray-400 hover:text-black underline">Reset</button>
          {onClose && <button onClick={onClose} className="md:hidden"><X size={18} /></button>}
        </div>
      </div>

      {/* Category */}
      <div className="border-t border-gray-100 pt-4 mb-4">
        <button onClick={() => toggle('category')} className="w-full flex items-center justify-between font-semibold text-sm mb-3">
          Dress Style {openSections.category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        <AnimatePresence>
          {openSections.category && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
              <div className="flex flex-col gap-2">
                {CATEGORIES.map(cat => (
                  <label key={cat} className="flex items-center justify-between cursor-pointer text-sm py-1 hover:text-black group">
                    <span className={`capitalize ${filters.category === cat ? 'font-semibold' : 'text-gray-600'}`}>{cat}</span>
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={filters.category === cat}
                      onChange={() => onChange({ category: cat === filters.category ? '' : cat })}
                      className="accent-black"
                    />
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Price Range */}
      <div className="border-t border-gray-100 pt-4 mb-4">
        <button onClick={() => toggle('price')} className="w-full flex items-center justify-between font-semibold text-sm mb-3">
          Price Range {openSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        <AnimatePresence>
          {openSections.price && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
              <div className="px-1">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min={0} max={500} step={10}
                  value={priceRange[1]}
                  onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full mb-2"
                />
                <input
                  type="range"
                  min={0} max={500} step={10}
                  value={priceRange[0]}
                  onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-full"
                />
                <button onClick={apply} className="mt-3 w-full btn-primary py-2 text-xs">Apply Price</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Rating */}
      <div className="border-t border-gray-100 pt-4">
        <button onClick={() => toggle('rating')} className="w-full flex items-center justify-between font-semibold text-sm mb-3">
          Rating {openSections.rating ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        <AnimatePresence>
          {openSections.rating && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
              <div className="flex flex-col gap-2">
                {[5, 4, 3, 2].map(r => (
                  <label key={r} className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      name="rating"
                      checked={Number(filters.rating) === r}
                      onChange={() => onChange({ rating: r === Number(filters.rating) ? '' : r })}
                      className="accent-black"
                    />
                    <span className="flex items-center gap-0.5">
                      {Array(r).fill(0).map((_, i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}
                      {Array(5 - r).fill(0).map((_, i) => <span key={i} className="text-gray-200 text-sm">★</span>)}
                      <span className="ml-1 text-gray-500">& up</span>
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FilterSidebar;
