const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Application = require("../models/Application");
const Category = require("../models/Category");
const AcademicRequirement = require("../models/AcademicRequirement");
const JuryAssignment = require("../models/JuryAssignment");

const calculateKatsayi = (kisiSayisi) => {
  if (kisiSayisi === 1) return 1;
  if (kisiSayisi === 2) return 0.8;
  if (kisiSayisi === 3) return 0.6;
  if (kisiSayisi === 4) return 0.5;
  if (kisiSayisi >= 5 && kisiSayisi <= 9) return 1 / kisiSayisi;
  return 0.1;
};

router.post("/:applicationId", async (req, res) => {
  try {
    const { applicationId } = req.params;

    const app = await Application.findOne({ _id: new mongoose.Types.ObjectId(applicationId) });

    if (!app) return res.status(404).json({ error: "Başvuru bulunamadı" });

    let toplamSistemPuani = 0;

    for (let belge of app.belgeler) {
      const kategoriKod = belge.belgeIcerik.kategori;
      const kategori = await Category.findOne({ categoryCode: kategoriKod });

      if (!kategori) continue;

      const temelDeger = kategori.value;
      const k = calculateKatsayi(belge.belgeIcerik.kisiSayisi || 1);
      const sistemPuani = temelDeger * k;

      belge.belgeIcerik.sistemPuani = parseFloat(sistemPuani.toFixed(2));
      toplamSistemPuani += sistemPuani;
    }

    app.markModified("belgeler");
    app.toplamSistemPuani = parseFloat(toplamSistemPuani.toFixed(2));

    await app.save();

    res.json({ message: "Puanlama tamamlandı", app });
  } catch (err) {
    console.error("Puanlama hatası:", err);
    res.status(500).json({ error: "Sunucu hatası", detail: err.message });
  }
});

// routes/puanlamaRoutes.js
const { sendApprovalEmail } = require('../utils/sendMail');

router.put("/:id/juri-puan", async (req, res) => {
  try {
    const { id } = req.params;
    const { belgeler, toplamJuriPuani, status } = req.body;

    const app = await Application.findById(id).populate("ilan_id");
    if (!app) return res.status(404).json({ error: "Başvuru bulunamadı" });

    // 📥 Başvuruya güncellenmiş belgeler, puan ve sonuç yaz
    app.belgeler = belgeler;
    app.toplamJuriPuani = toplamJuriPuani;
    app.status = status;
    await app.save();

    res.json({ message: "Jüri puanları güncellendi", application: app });
  } catch (err) {
    console.error("Jüri puanı güncelleme hatası:", err);
    res.status(500).json({ error: "Sunucu hatası", detail: err.message });
  }
});

router.put("/:id/final-karar", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, sonuc } = req.body;

    if (!["onaylandı", "reddedildi"].includes(status)) {
      return res.status(400).json({ error: "Geçersiz durum bilgisi" });
    }

    const app = await Application.findByIdAndUpdate(
      id,
      {
        $set: { status, sonuc }
      },
      { new: true }
    ).populate("ilan_id");

    if (!app) {
      return res.status(404).json({ error: "Başvuru bulunamadı" });
    }

    // ✅ Jüri havuzundan elle sil
    if (app.juri_id) {
      const jury = await JuryAssignment.findById(app.juri_id);
      if (jury) {
        jury.application_ids = jury.application_ids.filter(
          (id) => id.toString() !== app._id.toString()
        );
        await jury.save();
      }
    }

    // ✉️ Mail gönder
    await sendApprovalEmail(
      app.email,
      `${app.name} ${app.surname}`,
      app.ilan_id?.baslik || "Belirsiz İlan",
      sonuc
    );

    res.json({ message: "Final karar kaydedildi ve jüri havuzundan çıkarıldı", application: app });

  } catch (err) {
    console.error("Final karar hatası:", err);
    res.status(500).json({ error: "Sunucu hatası", detail: err.message });
  }
});

module.exports = router;
