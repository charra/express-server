const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');
const moment = require('moment');

const appCongig = require("./env");
const validate = require('../api/middlewares/validations');
const routes = require('../api/routes');
const customResponces = require("../api/response");

const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  Object.keys(customResponces).forEach(key => {
    res[key] = customResponces[key]
  });
  next();
});

// ensure log directory exists
fs.existsSync(appCongig.logDirectory) || fs.mkdirSync(appCongig.logDirectory);

const getLogFileName = () => {
  return `${moment().format("DD_MM_YYYY")}.log`;
};

// create a rotating write stream
const accessLogStream = rfs(getLogFileName(), {
  interval: '1d', // rotate daily
  path: appCongig.logDirectory
});

// setup the logger
app.use(morgan(appCongig.logs, {stream: accessLogStream}))

app.use('/v1', routes);

//serverError handler - in any custom responces check stacktrace & send 500 status
//final - not found handler
app.use(function(req, res, next) {
  res.notFound();
});

module.exports = app;
