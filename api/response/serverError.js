module.exports = function() {
  // Set status code
  this.status(500);
  const data = {
    status: "error",
    message: "A Server error has occured. Retry, or Cancel and return to the Previous Screen."
  };
  return this.json({data: data});
};