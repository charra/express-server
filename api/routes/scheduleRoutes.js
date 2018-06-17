const express = require('express');
const schedule = require('../controllers/scheduleController');
const scheduleModel = require('../models/Schedule');
const scheduleRoutes = new schedule(scheduleModel);
const authorize = require('../middlewares/auth.js');

const router = express.Router();

router.post('/create', authorize, scheduleRoutes.create);
router.put('/join', authorize, scheduleRoutes.join);
router.get('/getlist', authorize, scheduleRoutes.getlist);

module.exports = router;
