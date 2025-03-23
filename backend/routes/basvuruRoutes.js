const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');
const Application = require('../models/Application');

// Başvuru ve dosya yükleme endpointi
router.post('/', upload.array('belgeler'), async (req, res) => {
  try {
    const { ilan_id, user_id, name, surname, email, phone, message, belgeler_meta } = req.body;

    // belgeler_meta: frontend'den gelen JSON string
    const metaParsed = JSON.parse(belgeler_meta);
    
    // belgeler dosya url'leri ile birleştirilir
    const belgeler = req.files.map((file, i) => ({
      kategori: metaParsed[i].kategori,
      kisiSayisi: metaParsed[i].kisiSayisi,
      belgeUrl: file.location
    }));

    const yeniBasvuru = new Application({
      ilan_id,
      user_id,
      name,
      surname,
      email,
      phone,
      message,
      belgeler
    });

    await yeniBasvuru.save();
    res.status(201).json({ message: 'Başvuru başarıyla kaydedildi' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

module.exports = router;