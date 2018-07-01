const express = require('express');
const userRoutes = require('./userRoutes.js');
const scheduleRoutes = require('./scheduleRoutes.js');
const configRoutes = require('./configRoutes.js');
const validate = require("../middlewares/validations/index.js");

const router = express.Router();
router.use(validate);
router.use('/user', userRoutes);
router.use('/schedule', scheduleRoutes);
router.use('/config', configRoutes);

module.exports = router;