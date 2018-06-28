const schema = require('require-all')({
  dirname: `${__dirname}/schema`
});
const datesValidation = require("./datesValidation");
const Ajv = require("ajv");
const ajv = new Ajv();

//user
ajv.addSchema(schema.userLogin, "/user/login");
ajv.addSchema(schema.userRegister, "/user/register");

//schedule
ajv.addSchema(schema.scheduleCreate, "/schedule/create");
ajv.addSchema(schema.scheduleJoin, "/schedule/join");

const validator = function(req, res, next) {
  let shortPath = req.path;
  let valid;
  if(Object.keys(req.body).length) {
    valid = ajv.validate(req.path, req.body);
  }
  req.method === "GET" ? valid = true : "";
  if(!valid) { 
    delete ajv.errors[0].schemaPath;
    if(ajv.errors[0].keyword === "format") {
      let matchFormat = ajv.errors[0].params.format.split("_").join(" ");
      res.badRequest(`Wrong ${matchFormat} format`);
    }
    else if(ajv.errors[0].keyword === "maxLength") {
      res.badRequest(`Field ${ajv.errors[0].dataPath.split(".data.")[1]} ${ajv.errors[0].message}`);
    }
    else {
      res.forbidden(ajv.errors[0].message);
    }
  }
  else next();
};
module.exports = validator;