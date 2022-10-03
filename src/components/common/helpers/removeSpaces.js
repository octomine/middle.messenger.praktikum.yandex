module.exports = function (options) {
  console.log("remove!!1");
  return options.fn(this).replace(/\s+/g, "");
};
