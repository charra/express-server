module.exports = function(data) {
  // Set status code
  this.status(200);
  const responce = {
    status: "success",
    data: data
  };
  return this.json(responce);
};