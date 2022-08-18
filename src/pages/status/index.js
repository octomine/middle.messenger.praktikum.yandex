import "../../components/common/styles";
import "../../components/button";
import "../../components/label";

import tmpl from "./tmpl.hbs";

const ctx = {
  404: {
    title: { txt: "404" },
    subtitle: { txt: "Не туда попали", block: "status" },
    link: { label: "Назад к чатам" },
  },
  500: {
    title: { txt: "500" },
    subtitle: { txt: "Мы уже фиксим", block: "status" },
    link: { label: "Назад к чатам" },
  },
};

window.addEventListener("DOMContentLoaded", () => {
  let status = location.hash.replace("#", "");
  status = ctx[status] ? status : 404;
  document.title = status;

  const main = document.getElementsByClassName("main")[0];
  const el = tmpl(ctx[status]);

  main.innerHTML = el;
});
