import Handlebars from "handlebars/dist/handlebars.runtime";
import tmpl from "./tmpl.hbs";

Handlebars.registerPartial("styles", tmpl);

Handlebars.registerHelper("split", (data) =>
  typeof data === "string" ? data.split(",") : []
);
Handlebars.registerHelper("trim", (data) => data.trim());
Handlebars.registerHelper("concat", (...args) =>
  args.length == 0
    ? args
    : args
        .filter((item) => typeof item === "string" && item.length > 0)
        .reduce((res, curr) => `${res},${curr}`)
);
// TODO: подумать ещё, нет ли тут где дыры с типами или ещё какой
