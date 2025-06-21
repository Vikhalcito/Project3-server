const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const routineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: {
    type: String,
    enum: ['warm-up', 'stretching', 'full-body'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true
  },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Routine', routineSchema);