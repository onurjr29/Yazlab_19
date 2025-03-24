// backend/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, identityNumber, birthDate, password } = req.body;

  if (!name || !email || !identityNumber || !birthDate || !password) {
    return res.status(400).json({ message: "Tüm alanlar gereklidir." });
  }

  if (!/^\d{11}$/.test(identityNumber)) {
    return res.status(400).json({ message: "TC Kimlik Numarası 11 haneli olmalıdır." });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { identityNumber }] });

    if (existingUser) {
      return res.status(400).json({ message: "Bu e-posta veya TC zaten kayıtlı." });
    }

    const newUser = new User({
      name,
      email,
      identityNumber,
      birthDate: new Date(birthDate),
      password
    });

    await newUser.save();

    return res.status(201).json({ message: "Kayıt başarılı." });
  } catch (error) {
  console.error("Register Error:", {
    message: error.message,
    stack: error.stack,
    full: error
  });
  return res.status(500).json({ message: "Sunucu hatası.", error: error.message });
}

};

// Şimdilik login boş
exports.login = (req, res) => {
  res.send("login placeholder");
};
