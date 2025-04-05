const ExitInterview = require('../models/ExitInterview');

exports.submitInterview = async (req, res) => {
  const { resignationId, feedback } = req.body;
  try {
    const interview = await ExitInterview.create({
      resignation: resignationId,
      feedback
    });
    res.status(201).json(interview);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getInterviews = async (req, res) => {
  try {
    const interviews = await ExitInterview.find().populate({
      path: 'resignation',
      populate: { path: 'employee', select: 'name email' }
    });
    res.json(interviews);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
