const express = require('express');
const router = express.Router();
const AcademicRequirement = require('../models/AcademicRequirement');

// GET: Tüm akademik gereksinimleri getir
router.get('/', async (req, res) => {
    try {
      const data = await AcademicRequirement.find();
      console.log('Veritabanından gelen:', data); // burası önemli
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Sunucu hatası', details: err.message });
    }
  });

  // GET /api/requirements/title/:title → Sadece title'a göre requirements getir
router.get('/title/:title_val', async (req, res) => {
    try {
      const { title_val } = req.params;

      // Tüm kayıtları tara
      const records = await AcademicRequirement.find();
      // Tüm kayıtlarda ilgili title varsa getir
      for (const record of records) {
        const role = record.roles.find(r => r.title_val === title_val);
        if (role) {
          console.log('Veritabanından gelen:', role); // burası önemli
          return res.json({
            field: record.field,
            requirements: role.requirements
          });
        }
      }
  
      return res.status(404).json({ message: 'Pozisyona ait kayıt bulunamadı' });
    } catch (err) {
      res.status(500).json({ error: 'Sunucu hatası', details: err.message });
    }
  });
  

// POST: Yeni akademik gereksinim ekle
router.post('/', async (req, res) => {
  try {
    const newRequirement = new AcademicRequirement(req.body);
    await newRequirement.save();
    res.status(201).json({ message: 'Gereksinim başarıyla eklendi', data: newRequirement });
  } catch (err) {
    res.status(400).json({ error: 'Kayıt başarısız', details: err.message });
  }
});



module.exports = router;
