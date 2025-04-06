const express = require('express');
const router = express.Router();
const AcademicRequirement = require('../models/AcademicRequirementUser');

// 📌 Tüm alanları getir
router.get('/', async (req, res) => {
  try {
    const all = await AcademicRequirement.find();
    res.json(all);
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
});

// 📌 Belirli alan ve title_val için gereksinimleri getir
router.get('/:field/:title_val', async (req, res) => {
  try {
    const { field, title_val } = req.params;

    const data = await AcademicRequirement.findOne({ field });
    if (!data) return res.status(404).json({ message: "Alan bulunamadı" });

    const role = data.roles.find(r => r.title_val === title_val);
    if (!role) return res.status(404).json({ message: "Rol bulunamadı" });

    res.json({ field: data.field, requirements: role.requirements });
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
});

// 📌 Yeni veri oluştur
router.post('/', async (req, res) => {
  try {
    const { field, roles } = req.body;

    const existing = await AcademicRequirement.findOne({ field });
    if (existing) return res.status(400).json({ message: "Bu alan zaten mevcut" });

    const newDoc = await AcademicRequirement.create({ field, roles });
    res.status(201).json(newDoc);
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
});

module.exports = router;
