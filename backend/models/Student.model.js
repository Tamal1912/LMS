const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  courses: [String],
  grades: { type: Map, of: String },
});

module.exports = mongoose.model('Student', studentSchema);
