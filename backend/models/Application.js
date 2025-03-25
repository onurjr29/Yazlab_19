const mongoose = require('mongoose');
const JuryAssignment = require('./JuryAssignment');

const BelgeSchema = new mongoose.Schema({
  kategori: String,
  kisiSayisi: Number,
  belgeUrl: String
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
