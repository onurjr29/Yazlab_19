const mongoose = require('mongoose');

const BelgeSchema = new mongoose.Schema({
  kategori: String,
  kisiSayisi: Number,
  belgeUrl: String // Dosya ismini ya da URL'yi burada tut
});

const ApplicationSchema = new mongoose.Schema({
  ilan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ilan',
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // kullanıcı datası
    required: true
  },
  name: String,
  surname: String,
  email: String,
  phone: String,
  message: String,
  belgeler: [BelgeSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Application', ApplicationSchema);
