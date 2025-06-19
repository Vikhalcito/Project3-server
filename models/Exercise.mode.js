const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String }, // e.g. 'legs', 'chest', 'back', etc.
  difficulty: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  videoUrl: { type: String }
});

module.exports = mongoose.model('Exercise', exerciseSchema);