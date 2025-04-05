const Resignation = require('../models/Resignation');
const isHoliday = require('../utils/calendarific');
const sendEmail = require('../utils/mailer');

exports.submitResignation = async (req, res) => {
  const { lastWorkingDay, reason, country } = req.body;

  try {
    const date = new Date(lastWorkingDay);
    if (date.getDay() === 0 || date.getDay() === 6) {
      return res.status(400).json({ error: 'Weekend is not allowed' });
    }

    const holiday = await isHoliday(lastWorkingDay, country);
    if (holiday) {
      return res.status(400).json({ error: 'Selected date is a public holiday' });
    }

    const resignation = await Resignation.create({
      employee: req.user._id,
      lastWorkingDay,
      reason
    });

    res.status(201).json(resignation);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getPendingResignations = async (req, res) => {
  const resignations = await Resignation.find({ status: 'Pending' }).populate('employee');
  res.json(resignations);
};

exports.approveResignation = async (req, res) => {
  const { id } = req.params;
  const { exitDate } = req.body;

  try {
    const resignation = await Resignation.findById(id).populate('employee');
    if (!resignation) return res.status(404).json({ error: 'Resignation not found' });

    resignation.status = 'Approved';
    resignation.exitDate = exitDate;
    await resignation.save();

    await sendEmail(resignation.employee.email, 'Resignation Approved', `
      <p>Hi ${resignation.employee.name},</p>
      <p>Your resignation has been <strong>approved</strong>.</p>
      <p>Your exit date is <strong>${exitDate}</strong>.</p>
    `);

    res.json(resignation);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.rejectResignation = async (req, res) => {
  const { id } = req.params;

  try {
    const resignation = await Resignation.findById(id).populate('employee');
    if (!resignation) return res.status(404).json({ error: 'Resignation not found' });

    resignation.status = 'Rejected';
    await resignation.save();

    await sendEmail(resignation.employee.email, 'Resignation Rejected', `
      <p>Hi ${resignation.employee.name},</p>
      <p>Your resignation has been <strong>rejected</strong>.</p>
    `);

    res.json(resignation);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
