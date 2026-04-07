const Newsletter = require('../models/Newsletter');

// POST /api/newsletter
const subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });
    const existing = await Newsletter.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Already subscribed' });
    await Newsletter.create({ email });
    res.status(201).json({ message: 'Successfully subscribed! 🎉' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { subscribe };
