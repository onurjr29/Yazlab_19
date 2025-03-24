const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/users/:id → Kullanıcı bilgilerini getir
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('name surname email tcKimlikNo phone'); // şifreyi dışarıda tut
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }
    res.json(user);
  } catch (err) {
    console.error('Kullanıcı verisi alınırken hata:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

module.exports = router;
