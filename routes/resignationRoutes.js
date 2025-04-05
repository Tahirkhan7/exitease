const express = require('express');
const router = express.Router();
const resignationController = require('../controllers/resignationController');
const authenticate = require('../middlewares/authMiddleware');
const restrictTo = require('../middlewares/roleMiddleware');

router.post('/submit', authenticate, restrictTo('Employee'), resignationController.submitResignation);

router.get('/pending', authenticate, restrictTo('HR'), resignationController.getPendingResignations);

router.post('/approve/:id', authenticate, restrictTo('HR'), resignationController.approveResignation);

router.post('/reject/:id', authenticate, restrictTo('HR'), resignationController.rejectResignation);

module.exports = router;
