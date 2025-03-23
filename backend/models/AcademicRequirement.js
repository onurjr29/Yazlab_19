const mongoose = require('mongoose');

// Tek bir kategori için min-max puan bilgisi
const CategoryRequirementSchema = new mongoose.Schema({
  min: { type: Number, default: null },
  max: { type: Number, default: null }
}, { _id: false });

// Rol bazlı gereksinimler (Dr. Öğr. Üyesi, Doçent / Profesör)
const RoleRequirementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  title_val: { type: String, required: true },
  requirements: {
    categories: {
      type: Object, // Map yerine Object kullanıyoruz
      of: CategoryRequirementSchema,
      default: {}
    },
    total_points: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: null }
    }
  }
}, { _id: false });

// Ana şema
const AcademicRequirementSchema = new mongoose.Schema({
  field: { type: String, required: true }, // Alan adı
  roles: [RoleRequirementSchema],          // Birden fazla rol olabilir
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AcademicRequirement', AcademicRequirementSchema);
