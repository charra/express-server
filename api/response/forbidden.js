module.exports = function(message) {
  // Set status code
  this.status(403);
  const data = {status: "fail"};
  if (message && message.length < 60) { //delete stacktraces
    data.message = message;
  }
  return this.json({data: data});
};
