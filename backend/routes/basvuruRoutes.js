const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');
const Application = require('../models/Application');

const JuryAssignment = require('../models/JuryAssignment');

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

      const uygunJuriListesi = await JuryAssignment.find({
        $expr: { $lt: [{ $size: "$application_ids" }, 5] }
      });

      if (uygunJuriListesi.length === 0) {
        return res.status(400).json({ error: "Başvuru atanacak jüri bulunamadı. Maksimum kapasiteye ulaşılmış olabilir." });
      }

      const randomIndex = Math.floor(Math.random() * uygunJuriListesi.length);
      const secilenJuri = uygunJuriListesi[randomIndex];

      // Başvuru ID’sini ekle
     

      // Başvuru kaydedilsin
      const yeniBasvuru = new Application({
        ilan_id,
        user_id,
        name,
        surname,
        email,
        phone,
        message,
        belgeler,
        juri_id: secilenJuri.jury_id
      });
      secilenJuri.application_ids.push(yeniBasvuru._id);
      await secilenJuri.save();
      await yeniBasvuru.save();

      // 🎯 Jüri havuzundan uygun bir jüri seç

      res.status(201).json({
        message: 'Başvuru başarıyla kaydedildi ve jüriye atandı.',
        applicationId: yeniBasvuru._id
      });
      
    } catch (err) {
      console.error('Başvuru Hatası:', err);
      res.status(500).json({ error: 'Sunucu hatası', detail: err.message });
    }
  }
);

// routes/applicationRoutes.js
router.get("/:id", async (req, res) => {
  try {
    const app = await Application.findById(req.params.id).populate("ilan_id");
    if (!app) return res.status(404).json({ message: "Başvuru bulunamadı" });
    res.json(app);
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası", detail: err.message });
  }
});


module.exports = router;
