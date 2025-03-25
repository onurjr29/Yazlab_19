const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { identityNumber, name, surname, email, password, phone, birthDate } = req.body;

    // E-posta kontrolü
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Bu e-posta adresi zaten kayıtlı' });
    }

    // Şifre hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // Kullanıcı oluştur
    const newUser = await User.create({
      identityNumber,
      name,
      surname,
      email,
      password: hashedPassword,
      phone,
      birthDate, // ✅ Doğum tarihi backend'e de eklendi
      role: "applicant"
    });

    // JWT oluştur
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Kayıt başarılı',
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
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kullanıcıyı bul
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Geçersiz e-posta adresi veya şifre' });
    }

    // Şifreyi kontrol et
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Geçersiz e-posta adresi veya şifre' });
    }

    // Token oluştur
    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name, surname: user.surname, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Giriş başarılı',
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
    res.status(400).json({ message: error.message });
  }
};
