const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const connection = require("./env");
const validate = require('../api/middlewares/validations');
const fs = require('fs');
const path = require('path');

const routes = require('../api/routes');
const customResponces = require("../api/response");
//const error = require('../api/middlewares/error');

const app = express();

// request logging in file
app.use(morgan(connection.logs));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//add request validation for all routes
//app.use(validate);
app.use(function(req, res, next) {
  Object.keys(customResponces).forEach(key => {
    res[key] = customResponces[key]
  });
  next();
});

app.use('/', routes);

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'logfile.log'))

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))

module.exports = app;