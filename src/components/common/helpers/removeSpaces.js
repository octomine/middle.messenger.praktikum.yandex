module.exports = function (options) {
  return options.fn(this).replace(/\s+/g, " ");
};
