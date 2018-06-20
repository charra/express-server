module.exports = function() {
  this.status(401);
  const data = {
    status: "fail",
    message: "Token expired or not found."
  };
  return this.json({data: data});
};
