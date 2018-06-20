module.exports = function(message) {
  // Set status code
  this.status(400);
  const data = {status: "fail"};
  if (message && message.length < 60) { //delete stacktraces
    data.message = message;
    return this.json({data: data});
  }
  else { //delete stacktraces
    return this.serverError();
  }
};

