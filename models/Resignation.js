const mongoose = require('mongoose');

const resignationSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lastWorkingDay: Date,
  reason: String,
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  exitDate: Date
});

module.exports = mongoose.model('Resignation', resignationSchema);
