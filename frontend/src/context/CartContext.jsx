import { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import api from '../lib/api';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, items: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_SESSION':
      return { ...state, sessionId: action.payload };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], loading: false, sessionId: null });

  useEffect(() => {
    let sessionId = localStorage.getItem('shopco_session');
    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem('shopco_session', sessionId);
    }
    dispatch({ type: 'SET_SESSION', payload: sessionId });
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const { data } = await api.get('/cart');
      dispatch({ type: 'SET_CART', payload: data.items || [] });
    } catch { dispatch({ type: 'SET_CART', payload: [] }); }
  };

  const addToCart = async (productId, quantity = 1, size = '', color = '') => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const { data } = await api.post('/cart', { productId, quantity, size, color });
      if (data.sessionId && !localStorage.getItem('shopco_session')) {
        localStorage.setItem('shopco_session', data.sessionId);
      }
      dispatch({ type: 'SET_CART', payload: data?.cart?.items || [] });
      return true;
    } catch (err) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return false;
    }
  };

  const updateItem = async (itemId, quantity) => {
    try {
      const { data } = await api.put(`/cart/${itemId}`, { quantity });
      dispatch({ type: 'SET_CART', payload: data.items || [] });
    } catch {}
  };

  const removeItem = async (itemId) => {
    try {
      const { data } = await api.delete(`/cart/${itemId}`);
      dispatch({ type: 'SET_CART', payload: data.items || [] });
    } catch {}
  };

  const clearCart = async () => {
    try {
      await api.delete('/cart/clear');
      dispatch({ type: 'SET_CART', payload: [] });
    } catch {}
  };

  const cartCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discount = subtotal * 0.1;
  const deliveryFee = subtotal > 0 ? 15 : 0;
  const total = subtotal - discount + deliveryFee;

  return (
    <CartContext.Provider value={{ ...state, cartCount, subtotal, discount, deliveryFee, total, addToCart, updateItem, removeItem, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
