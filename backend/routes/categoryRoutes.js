const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// GET /api/categories → Tüm kategorileri getir
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ categoryCode: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Kategori verileri alınamadı', details: err.message });
  }
});

module.exports = router;
