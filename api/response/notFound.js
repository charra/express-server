module.exports = function(message) {
  // Set status code
  this.status(404);
  const data = {
    status: "error",
    message: "Route not found."
  };
  return this.json({data: data});
};