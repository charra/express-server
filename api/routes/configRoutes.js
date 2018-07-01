const express = require('express');
const authorize = require('../middlewares/auth.js');
const configController = require('../controllers/configController');
const configRoutes = new configController();

const router = express.Router();

router.get('/getcategories', authorize, configRoutes.getCategories);

module.exports = router;
