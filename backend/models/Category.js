const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  category: String,
  categoryName: String,
  categoryCode: String,
  description: String,
  value: Number
});

module.exports = mongoose.model('Category', CategorySchema);
