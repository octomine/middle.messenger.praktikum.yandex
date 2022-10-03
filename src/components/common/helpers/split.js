module.exports = function (data) {
  console.log("split");
  console.log(data);
  return typeof data === "string" ? data.split(",") : [];
};
