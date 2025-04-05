const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  resignation: { type: mongoose.Schema.Types.ObjectId, ref: 'Resignation' },
  feedback: String
});

module.exports = mongoose.model('ExitInterview', interviewSchema);
