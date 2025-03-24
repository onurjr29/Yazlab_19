const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');
const Application = require('../models/Application');

router.post(
  '/',
  upload.fields([
    { name: 'ozgecmis', maxCount: 1 },
    { name: 'belgeler[]', maxCount: 20 },
  ]),
  async (req, res) => {
    try {
      const {
        ilan_id,
        user_id,
        name,
        surname,
        email,
        phone,
        message,
        belgeler_meta
      } = req.body;

      // Belgeler meta verisini parse et
      let parsedMeta = [];
      try {
        parsedMeta = JSON.parse(belgeler_meta || '[]');
      } catch (e) {
        return res.status(400).json({ error: 'belgeler_meta geçersiz formatta JSON olmalı.' });
      }
      
      const belgelerDosyalari = req.files['belgeler'] || req.files['belgeler[]'] || [];
      const ozgecmisDosya = req.files?.ozgecmis?.[0];

      // Belgeleri eşle
      const belgeler = parsedMeta.map((meta, i) => ({
        belgeIsim: meta.kategori,
        belgeIcerik: {
          kategori: meta.kategori,
          kisiSayisi: Number(meta.kisiSayisi || 1),
          belgeUrl: belgelerDosyalari[i]?.location || ''
        }
      }));

      // CV’yi de belgeler arasına ekle
      if (ozgecmisDosya) {
        belgeler.push({
          belgeIsim: 'ozgecmis',
          belgeIcerik: {
            kategori: 'CV',
            kisiSayisi: 1,
            belgeUrl: ozgecmisDosya.location
          }
        });
      }

      // MongoDB’ye kaydet
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
      res.status(201).json({ message: 'Başvuru başarıyla kaydedildi.' });
    } catch (err) {
      console.error('Başvuru Hatası:', err);
      res.status(500).json({ error: 'Sunucu hatası', detail: err.message });
    }
  }
);

module.exports = router;
