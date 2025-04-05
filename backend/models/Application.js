const mongoose = require('mongoose');
const JuryAssignment = require('./JuryAssignment');

const BelgeSchema = new mongoose.Schema({
  kategori: String,
  kisiSayisi: Number,
  belgeUrl: String,
  sistemPuani: { type: Number, default: 0 }, // sistem tarafından hesaplanan puan
  juriPuani: { type: Number, default: 0 }    // jürinin elle girdiği puan
});

const ApplicationSchema = new mongoose.Schema({
  ilan_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ilan', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  juri_id: { type: mongoose.Schema.Types.ObjectId, ref: 'JuryAssignment', required: true },
  name: String,
  surname: String,
  email: String,
  phone: String,
  message: String,
  belgeler: [{ belgeIsim: String, belgeIcerik: BelgeSchema }],
  toplamSistemPuani: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

ApplicationSchema.post('findOneAndDelete', async function (doc) {
  if (doc?.juri_id) {
    await JuryAssignment.findByIdAndUpdate(doc.juri_id, {
      $pull: { application_ids: doc._id }
    });
  }
});

module.exports = mongoose.model('Application', ApplicationSchema);
