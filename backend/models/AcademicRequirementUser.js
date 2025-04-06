const mongoose = require('mongoose');

const RoleRequirementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  title_val: { type: String, required: true },
  requirements: {
    table3: { type: mongoose.Schema.Types.Mixed, default: {} } // key-value çiftleri
  }
}, { _id: false });

const AcademicRequirementSchema = new mongoose.Schema({
  field: { type: String, required: true },
  roles: [RoleRequirementSchema],
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AcademicRequirementUser', AcademicRequirementSchema);
