const express = require('express');
const schedule = require('../controllers/scheduleController');
const scheduleRoutes = new schedule();
const authorize = require('../middlewares/auth.js');//datesChecker
const datesChecker = require('../middlewares/datesChecker.js')

const router = express.Router();

router.post('/create', authorize, datesChecker, scheduleRoutes.create);
router.put('/join/:scheduleId', authorize, datesChecker, scheduleRoutes.join);
router.get('/getlist', authorize, scheduleRoutes.getlist);

module.exports = router;
