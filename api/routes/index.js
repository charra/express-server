const express = require('express');
const userRoutes = require('./userRoutes.js');
const scheduleRoutes = require('./scheduleRoutes.js');
const validate = require("../middlewares/validations/index.js");

const router = express.Router();
router.use(validate);
router.use('/user', userRoutes);
router.use('/schedule', scheduleRoutes);



module.exports = router;