import { useState, useEffect, useCallback } from 'react';
import api from '../lib/api';

const useProducts = (initialFilters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [filters, setFilters] = useState({ page: 1, limit: 12, ...initialFilters });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== '' && v !== null && v !== undefined));
      const { data } = await api.get('/products', { params });
      setProducts(data.products);
      setTotal(data.total);
      setPages(data.pages);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const updateFilters = (newFilters) => setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  const setPage = (page) => setFilters(prev => ({ ...prev, page }));

  return { products, loading, error, total, pages, filters, updateFilters, setPage, refetch: fetchProducts };
};

export default useProducts;
