const mongoose = require('mongoose');

const JuryAssignmentSchema = new mongoose.Schema({
  jury_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // Her jüri için sadece bir kayıt olacak şekilde
  },
  application_ids: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
  }]
});

// Otomatik olarak başvuru sayısını hesaplayan sanal alan
JuryAssignmentSchema.virtual('applicationsCount').get(function () {
  return this.application_ids?.length || 0;
});

JuryAssignmentSchema.set('toJSON', { virtuals: true });
JuryAssignmentSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('JuryAssignment', JuryAssignmentSchema);
    