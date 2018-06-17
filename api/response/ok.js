module.exports = function(message) {
  // Set status code
  this.status(200);
  const data = {
    status: "succes",
    message: message
  };
  return this.json({data: data});
};