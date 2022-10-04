module.exports = function (...args) {
  return args.length === 0
    ? args
    : args
        .filter((item) => typeof item === "string" && item.length > 0)
        .reduce((res, curr) => `${res},${curr}`);
};
