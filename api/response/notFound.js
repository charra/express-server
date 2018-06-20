module.exports = function() {
  this.status(404);
  const data = {
    status: "error",
    message: "Route not found."
  };
  return this.json({data: data});
};