const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Application = require("../models/Application");
const Category = require("../models/Category");

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

module.exports = router;
