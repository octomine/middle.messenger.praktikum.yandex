const { JSDOM } = require("jsdom");
const Handlebars = require("handlebars");
const fs = require("fs");

// const partialStyles = require("./src/components/common/partials/styles.hbs");
const helperSplit = require("./src/components/common/helpers/split");

const { window } = new JSDOM('<main class="main"></main>', {
  url: "http://localhost:3000",
});

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;

require.extensions[".hbs"] = function (module, filename) {
  const stylesPartial = fs.readFileSync(
    "./src/components/common/partials/styles.hbs",
    "utf-8"
  );

  Handlebars.registerHelper("split", helperSplit);
  Handlebars.registerPartial("styles", stylesPartial);

  const contents = fs.readFileSync(filename, "utf-8");

  module.exports = Handlebars.compile(contents);
};
