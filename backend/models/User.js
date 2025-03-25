const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },                      // Ad
  surname: { type: String, required: true },                   // Soyad
  identityNumber: { type: String, required: true },            // TC Kimlik No
  email: { type: String, required: true, unique: true },       // E-posta
  password: { type: String, required: true },                  // Şifre (hashed)
  birthDate: { type: Date, required: true },                   // ✅ Doğum tarihi eklendi!
  role: { type: String, enum: ["applicant", "admin"], default: "applicant" },
  phone: { type: String, required: false },                    // Opsiyonel telefon
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
