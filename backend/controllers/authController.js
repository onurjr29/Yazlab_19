const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { verifyIdentity } = require('../services/edevletVerify');

// ✅ Kullanıcı kaydı
exports.register = async (req, res) => {
  try {
    const { identityNumber, name, surname, email, password, phone, birthDate } = req.body;

    // ✅ Kimlik doğrulama (e-Devlet)
    const isValid = await verifyIdentity({ identityNumber, name, surname, birthDate });
    if (!isValid) {
      return res.status(400).json({
        message: 'Kimlik bilgileri doğrulanamadı.'
      });
    }

    // ✅ E-posta veya TC daha önce kayıtlı mı?
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Bu e-posta adresi zaten kayıtlı.' });
    }

    const existingIdentity = await User.findOne({ identityNumber });
    if (existingIdentity) {
      return res.status(400).json({ message: 'Bu TC Kimlik Numarası zaten kayıtlı.' });
    }

    // ✅ Şifre hashleme
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Kullanıcı oluştur
    const newUser = await User.create({
      identityNumber,
      name,
      surname,
      email,
      password: hashedPassword,
      phone,
      birthDate,
      role: "applicant"
    });

    // ✅ JWT oluştur
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Kayıt başarılı.',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        surname: newUser.surname,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error("❌ Kayıt sırasında hata:", error);
    res.status(500).json({ message: 'Sunucu hatası. Lütfen tekrar deneyiniz.' });
  }
};

// ✅ Giriş
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Geçersiz e-posta adresi veya şifre.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Geçersiz e-posta adresi veya şifre.' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Giriş başarılı.',
      token,
      user: {
        id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("❌ Giriş sırasında hata:", error);
    res.status(500).json({ message: 'Sunucu hatası. Lütfen tekrar deneyiniz.' });
  }
};
