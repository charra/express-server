module.exports = (date) => {
  const checkTime =  new Date().getTime() + (1000 * 60 * 60);
  if (date >= checkTime) {
    return true;
  }
  else {
    return false;
  }
};