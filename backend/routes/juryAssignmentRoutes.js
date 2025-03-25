const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const jwt = require('jsonwebtoken');


// GET /api/juries/:juryId/count
router.get('/:juryId/count', async (req, res) => {
  try {
    const juryData = await JuryAssignment.findOne({ jury_id: req.params.juryId });
    if (!juryData) return res.status(404).json({ message: 'Jüri bulunamadı' });

    const count = juryData.application_ids.length;
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// backend/routes/juryApplications.js
// GET /api/jury-applications
router.get('/', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Yetkisiz erişim" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'jury') {
      return res.status(403).json({ message: "Yalnızca jüriler erişebilir" });
    }

    const juryId = decoded.id;
    console.log(juryId);

    const apps = await Application.find({ juri_id: juryId })
      .populate("ilan_id", "baslik")
      .select("name surname ilan_id");

    res.json(apps);
  } catch (err) {
    console.error("Jüri başvuruları alınırken hata:", err);
    res.status(500).json({ message: "Sunucu hatası", detail: err.message });
  }
});


module.exports = router;
// Compare this snippet from backend/controllers/userController.js