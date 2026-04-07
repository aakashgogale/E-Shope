const Order = require('../models/Order');
const Cart = require('../models/Cart');

// POST /api/orders
const createOrder = async (req, res) => {
  try {
    const { items, subtotal, discount, deliveryFee, total, shippingAddress } = req.body;
    const order = await Order.create({ user: req.user.id, items, subtotal, discount, deliveryFee, total, shippingAddress });
    // Clear cart after order
    const sessionId = req.headers['x-session-id'];
    if (sessionId) await Cart.findOneAndDelete({ sessionId });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/orders (user's orders)
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/orders/all (admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createOrder, getMyOrders, getAllOrders };
