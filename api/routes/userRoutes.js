const express = require('express');
const user = require('../controllers/userController');
const userRoutes = new user();
const checkUserUnique = require("../middlewares/checkUserUnique.js");

const router = express.Router();

router.post('/login', userRoutes.login);
router.post('/register', checkUserUnique, userRoutes.create);

module.exports = router;
