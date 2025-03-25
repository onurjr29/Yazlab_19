const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// ✅ Tüm kullanıcıları getir
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Kullanıcılar alınırken hata oluştu", error: err.message });
  }
});

// ✅ Belirli bir kullanıcıyı getir
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// ✅ Yeni kullanıcı oluştur
router.post("/", async (req, res) => {
  try {
    const { name, surname, email, phone, tcKimlikNo, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Bu e-posta zaten kayıtlı." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      surname,
      email,
      phone,
      tcKimlikNo,
      password: hashedPassword,
      role: role || "applicant",
    });

    // ✅ Eğer rol "jury" ise, jüri atama kaydı oluştur
    if (user.role === "jury") {
      await JuryAssignment.create({
        jury_id: user._id,
        application_ids: [],
      });
    }

    res.status(201).json({ message: "Kullanıcı oluşturuldu", user });
  } catch (err) {
    res.status(500).json({ error: "Kullanıcı oluşturulamadı", detail: err.message });
  }
});


// ✅ Kullanıcıyı güncelle
const JuryAssignment = require('../models/JuryAssignment');

router.put("/:id", async (req, res) => {
  try {
    const { name, surname, email, phone, tcKimlikNo, password, role } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "Kullanıcı bulunamadı" });

    const previousRole = user.role;

    const updateData = {
      name,
      surname,
      email,
      phone,
      tcKimlikNo,
      role
    };

    if (password && password.length >= 6) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // 🎯 1. Rol değişimi varsa, işleme devam etmeden kontrol yap
    if (previousRole === "jury" && role !== "jury") {
      const juryRecord = await JuryAssignment.findOne({ jury_id: user._id });

      if (juryRecord && juryRecord.application_ids.length > 0) {
        return res.status(400).json({
          error: "Bu kullanıcı jüri olarak atanmış başvurulara sahip. Rolü değiştirmeden önce bu atamaları kaldırmalısınız."
        });
      }

      // Eğer jüri ama başvurusu yoksa: kaydı sil
      await JuryAssignment.deleteOne({ jury_id: user._id });
    }

    // 🎯 2. Rol değişimi "jury"ye geçiyorsa, kayıt yoksa oluştur
    if (previousRole !== "jury" && role === "jury") {
      const existingJury = await JuryAssignment.findOne({ jury_id: user._id });
      if (!existingJury) {
        await JuryAssignment.create({
          jury_id: user._id,
          application_ids: []
        });
      }
    }

    // 🔁 Kullanıcıyı güncelle
    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json({ message: "Kullanıcı güncellendi", user: updatedUser });

  } catch (err) {
    console.error("Güncelleme hatası:", err);
    res.status(500).json({ error: "Güncelleme başarısız", detail: err.message });
  }
});

// ✅ Kullanıcı sil
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Kullanıcı silindi" });
  } catch (err) {
    res.status(500).json({ error: "Silme işlemi başarısız", detail: err.message });
  }
});

module.exports = router;
