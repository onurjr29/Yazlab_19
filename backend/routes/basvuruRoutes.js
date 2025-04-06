const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');
const Application = require('../models/Application');

const JuryAssignment = require('../models/JuryAssignment');

const Ilan = require("../models/Ilan"); // <- ilan modelini içe aktar

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

      let parsedMeta = [];
      try {
        parsedMeta = JSON.parse(belgeler_meta || '[]');
      } catch (e) {
        return res.status(400).json({ error: 'belgeler_meta geçersiz formatta JSON olmalı.' });
      }

      const belgelerDosyalari = req.files['belgeler'] || req.files['belgeler[]'] || [];
      const ozgecmisDosya = req.files?.ozgecmis?.[0];

      const belgeler = parsedMeta.map((meta, i) => ({
        belgeIsim: meta.kategori,
        belgeIcerik: {
          kategori: meta.kategori,
          kisiSayisi: Number(meta.kisiSayisi || 1),
          belgeUrl: belgelerDosyalari[i]?.location || ''
        }
      }));

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
        return res.status(400).json({ error: "Başvuru atanacak jüri bulunamadı." });
      }

      const secilenJuri = uygunJuriListesi[Math.floor(Math.random() * uygunJuriListesi.length)];

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

      // ✅ İlanın başvuru sayısını 1 artır
      await Ilan.findByIdAndUpdate(ilan_id, {
        $inc: { count: 1 }
      });

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



router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const apps = await Application.find({ user_id: userId }).populate("ilan_id", "baslik").sort({ createdAt: -1 });
    res.json(apps);
  } catch (err) {
    console.error("Başvuru listeleme hatası:", err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

module.exports = router;


module.exports = router;

