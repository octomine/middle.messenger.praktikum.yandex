import Handlebars from "handlebars/dist/handlebars.runtime";
import "../label";
import tmpl from "./tmpl.hbs";

Handlebars.registerPartial("input", tmpl);
