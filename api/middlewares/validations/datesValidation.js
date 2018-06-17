module.exports = (date) => {
  const checkTime = Date.now() + (1000 * 60 * 60);
  if (date >= checkTime) {
    return true;
  }
  else {
    return false;
  }
};