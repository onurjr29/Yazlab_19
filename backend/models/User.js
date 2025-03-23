const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    tcKimlikNo: { type: String, required: true }, // Adayın TC kimlik numarası
    name: { type: String, required: true }, // Adayın adı
    email: { type: String, required: true, unique: true }, // E-posta
    password: { type: String, required: true }, // Şifre (hashed olarak saklanmalı)
    role: { type: String, enum: ["applicant", "admin"], default: "applicant" }, // Kullanıcı rolü
    phone: { type: String, required: false }, // Telefon numarası (isteğe bağlı)
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }] // Başvuru ID'leri
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
