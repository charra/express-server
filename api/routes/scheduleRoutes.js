const express = require('express');
const schedule = require('../controllers/scheduleController');
const scheduleRoutes = new schedule();
const authorize = require('../middlewares/auth.js');

const router = express.Router();

router.post('/create', authorize, scheduleRoutes.create);
router.put('/join', authorize, scheduleRoutes.join);
router.get('/getlist', authorize, scheduleRoutes.getlist);

module.exports = router;
