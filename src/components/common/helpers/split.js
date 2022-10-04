module.exports = function (data) {
  return typeof data === "string" ? data.split(",") : [];
};
