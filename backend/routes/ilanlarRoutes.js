const express = require('express');
const router = express.Router();
const Ilan = require('../models/Ilan');

// GET: Tüm ilanları getir
router.get('/', async (req, res) => {
  try {
    const ilanlar = await Ilan.find();
    res.json(ilanlar);
  } catch (err) {
    res.status(500).json({ error: 'Veriler alınamadı', details: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ilan = await Ilan.findById(id);

    if (!ilan) {
      return res.status(404).json({ error: 'İlan bulunamadı' });
    }

    res.json(ilan);
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatası', details: err.message });
  }
});


// POST: Yeni ilan ekle
router.post('/', async (req, res) => {
  try {
    const yeniIlan = new Ilan(req.body);
    const kayit = await yeniIlan.save();
    res.status(201).json({ message: 'İlan başarıyla kaydedildi', data: kayit });
  } catch (err) {
    res.status(400).json({ error: 'Kayıt başarısız', details: err.message });
  }
});


module.exports = router;
