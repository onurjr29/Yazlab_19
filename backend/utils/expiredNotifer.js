const Ilan = require('../models/Ilan');
const Basvuru = require('../models/Application'); // varsa başvuru modeli
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // kendi SMTP'ine göre değiştir
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

async function notifyExpiredIlanlar() {
  const today = new Date().toISOString().split('T')[0];

  const expiredIlanlar = await Ilan.find({
    bitis_tarihi: { $lt: today }
  });

  for (const ilan of expiredIlanlar) {
    const { ad, soyad, baslik, bitis_tarihi, count } = ilan;

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: 'yonetici@mail.com', // buraya ilgili yöneticinin maili gelmeli, ileride `ilan.yonetici_email` gibi
      subject: `İlan Süresi Bitti: ${baslik}`,
      html: `
        <p><strong>${baslik}</strong> ilanının süresi <strong>${bitis_tarihi}</strong> tarihinde sona ermiştir.</p>
        <p><strong>Başvuran kişi sayısı:</strong> ${count}</p>
        <p><strong>Yönetici:</strong> ${ad} ${soyad}</p>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`📧 Mail gönderildi: ${baslik}`);
    } catch (err) {
      console.error(`❌ Mail gönderilemedi (${baslik}):`, err);
    }
  }
}

module.exports = notifyExpiredIlanlar;
