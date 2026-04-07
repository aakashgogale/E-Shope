const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { v4: uuidv4 } = require('uuid');

// GET /api/cart
const getCart = async (req, res) => {
  try {
    const sessionId = req.headers['x-session-id'] || req.query.sessionId;
    if (!sessionId) return res.json({ items: [] });
    const cart = await Cart.findOne({ sessionId }).populate('items.product');
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, size, color } = req.body;
    let sessionId = req.headers['x-session-id'] || req.body.sessionId;
    if (!sessionId) sessionId = uuidv4();

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ sessionId });
    if (!cart) cart = new Cart({ sessionId, items: [] });

    const existingIdx = cart.items.findIndex(
      i => i.product.toString() === productId && i.size === size && i.color === color
    );

    if (existingIdx >= 0) {
      cart.items[existingIdx].quantity += quantity;
    } else {
      cart.items.push({ product: productId, name: product.name, image: product.images[0], price: product.price, quantity, size, color });
    }

    await cart.save();
    res.json({ cart, sessionId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/cart/:itemId
const updateCartItem = async (req, res) => {
  try {
    const sessionId = req.headers['x-session-id'] || req.body.sessionId;
    const { quantity } = req.body;
    const cart = await Cart.findOne({ sessionId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    if (quantity <= 0) {
      cart.items.pull(req.params.itemId);
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/cart/:itemId
const removeFromCart = async (req, res) => {
  try {
    const sessionId = req.headers['x-session-id'];
    const cart = await Cart.findOne({ sessionId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    cart.items.pull(req.params.itemId);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/cart
const clearCart = async (req, res) => {
  try {
    const sessionId = req.headers['x-session-id'];
    await Cart.findOneAndDelete({ sessionId });
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
