const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

/**
 * Kullanıcıya sonuç maili gönderir.
 * @param {string} to Kullanıcının e-posta adresi
 * @param {string} name Kullanıcının adı
 * @param {string} ilanBaslik İlgili ilan başlığı
 * @param {"olumlu" | "olumsuz"} sonuc Başvuru sonucu
 */
async function sendApprovalEmail(to, name, ilanBaslik, sonuc) {
  const sonucMetni =
    sonuc === "olumlu"
      ? `<p><strong>${ilanBaslik}</strong> başlıklı ilana yapmış olduğunuz başvuru <span style="color:green;">olumlu</span> sonuçlanmıştır. Tebrik ederiz! 🎉</p>`
      : `<p><strong>${ilanBaslik}</strong> başlıklı ilana yapmış olduğunuz başvuru <span style="color:red;">olumsuz</span> sonuçlanmıştır. Başvurunuz için teşekkür ederiz.</p>`;

  const mailOptions = {
    from: `"KOU Akademik" <${process.env.MAIL_USER}>`,
    to,
    subject: "Başvuru Sonucunuz",
    html: `
      <p>Sayın ${name},</p>
      ${sonucMetni}
      <p>İyi günler dileriz.</p>
      <p><em>Kocaeli Üniversitesi Akademik Başvuru Sistemi</em></p>
    `,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendApprovalEmail };
