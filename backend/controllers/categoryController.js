// GET /api/categories
const getCategories = async (req, res) => {
  try {
    const categories = [
      { id: 'casual', name: 'Casual', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80', count: 0 },
      { id: 'formal', name: 'Formal', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80', count: 0 },
      { id: 'party', name: 'Party', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=80', count: 0 },
      { id: 'gym', name: 'Gym', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80', count: 0 },
    ];
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getCategories };
