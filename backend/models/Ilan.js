const mongoose = require('mongoose');

const IlanSchema = new mongoose.Schema({
  bolum: { type: String, required: true },
  pozisyon: { type: String, required: true },
  ad: { type: String, required: true },
  soyad: { type: String, required: true },
  baslik: { type: String, required: true },
  aciklama: { type: String, required: true },
  baslangic_tarihi: { type: String, required: true },
  bitis_tarihi: { type: String, required: true },
  selected_categories: { type: Object, default: {} },
  total_points: {
    min: { type: Number, default: null },
    max: { type: Number, default: null }
  }
}, { timestamps: true });

module.exports = mongoose.model('Ilan', IlanSchema);
