const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController');
const authenticate = require('../middlewares/authMiddleware');
const restrictTo = require('../middlewares/roleMiddleware');

router.post('/submit', authenticate, restrictTo('Employee'), interviewController.submitInterview);

router.get('/all', authenticate, restrictTo('HR'), interviewController.getInterviews);

module.exports = router;
