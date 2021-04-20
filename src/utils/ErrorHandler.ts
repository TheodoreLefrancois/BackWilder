module.exports = (callback: () => void) => {
  return function (req, res, next) {
    callback(req, res, next).catch(next);
  };
};
