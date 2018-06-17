const express = require('express');
const user = require('../controllers/userController');
const userModel = require('../models/User');
const userRoutes = new user(userModel);
const checkUnique = require("../middlewares/checkUnique.js");

const router = express.Router();

router.post('/login', userRoutes.login);
router.post('/register', checkUnique, userRoutes.create);

module.exports = router;
