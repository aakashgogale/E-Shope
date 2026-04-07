import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import useProducts from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';

const SORT_OPTIONS = [
  { value: '', label: 'Most Popular' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

const Products = () => {
  const [searchParams] = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const initialFilters = {
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    sort: searchParams.get('sort') || '',
    isNew: searchParams.get('isNew') || '',
    isTopSelling: searchParams.get('isTopSelling') || '',
  };

  const { products, loading, total, pages, filters, updateFilters, setPage } = useProducts(initialFilters);

  useEffect(() => {
    // Sync URL params to filters when they change
    const params = {};
    if (searchParams.get('category')) params.category = searchParams.get('category');
    if (searchParams.get('search')) params.search = searchParams.get('search');
    if (searchParams.get('sort')) params.sort = searchParams.get('sort');
    if (searchParams.get('isNew')) params.isNew = searchParams.get('isNew');
    if (searchParams.get('isTopSelling')) params.isTopSelling = searchParams.get('isTopSelling');
    if (Object.keys(params).length) updateFilters(params);
  }, [searchParams]);

  const currentSort = SORT_OPTIONS.find(o => o.value === filters.sort) || SORT_OPTIONS[0];

  return (
    <div className="container-main py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-400 mb-6">
        Home / <span className="text-black font-medium capitalize">{filters.category || 'All Products'}</span>
      </div>

      <div className="flex gap-6">
        {/* Sidebar — desktop */}
        <aside className="hidden md:block w-64 shrink-0">
          <FilterSidebar filters={filters} onChange={updateFilters} />
        </aside>

        {/* Mobile sidebar drawer */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 z-40 md:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.div
                initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.25 }}
                className="fixed left-0 top-0 bottom-0 w-72 bg-white z-50 p-5 overflow-y-auto md:hidden"
              >
                <FilterSidebar filters={filters} onChange={updateFilters} onClose={() => setSidebarOpen(false)} />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
            <div>
              <h1 className="font-bold text-xl capitalize">{filters.category || 'All Products'}</h1>
              <p className="text-sm text-gray-400">{total} products found</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Mobile filter button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-50"
              >
                <SlidersHorizontal size={16} /> Filters
              </button>

              {/* Sort */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-50 min-w-[180px] justify-between"
                >
                  <span>Sort: {currentSort.label}</span>
                  <ChevronDown size={14} className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {sortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                      className="absolute right-0 top-full mt-1 bg-white border border-gray-100 rounded-xl shadow-xl z-30 min-w-[200px]"
                    >
                      {SORT_OPTIONS.map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => { updateFilters({ sort: opt.value }); setSortOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl ${filters.sort === opt.value ? 'font-semibold' : ''}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Active filters */}
          {(filters.category || filters.search || filters.rating || filters.minPrice) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {filters.category && (
                <span className="flex items-center gap-1.5 bg-black text-white text-xs px-3 py-1.5 rounded-full">
                  {filters.category}
                  <button onClick={() => updateFilters({ category: '' })}><X size={12} /></button>
                </span>
              )}
              {filters.search && (
                <span className="flex items-center gap-1.5 bg-black text-white text-xs px-3 py-1.5 rounded-full">
                  "{filters.search}"
                  <button onClick={() => updateFilters({ search: '' })}><X size={12} /></button>
                </span>
              )}
              {filters.rating && (
                <span className="flex items-center gap-1.5 bg-black text-white text-xs px-3 py-1.5 rounded-full">
                  {filters.rating}★ & up
                  <button onClick={() => updateFilters({ rating: '' })}><X size={12} /></button>
                </span>
              )}
            </div>
          )}

          {/* Product grid */}
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {Array(9).fill(0).map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-2xl aspect-square animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-5xl mb-4">🔍</p>
              <p className="font-semibold text-lg">No products found</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            >
              {products.map((p, i) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              <button
                onClick={() => setPage(filters.page - 1)}
                disabled={filters.page <= 1}
                className="px-4 py-2 border border-gray-200 rounded-full text-sm hover:bg-gray-50 disabled:opacity-40"
              >
                ← Prev
              </button>
              {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 rounded-full text-sm font-medium ${p === filters.page ? 'bg-black text-white' : 'border border-gray-200 hover:bg-gray-50'}`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(filters.page + 1)}
                disabled={filters.page >= pages}
                className="px-4 py-2 border border-gray-200 rounded-full text-sm hover:bg-gray-50 disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
