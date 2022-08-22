import "../../components/common/styles";
import "../../components/button";
import "../../components/label";
import "../../components/form";
import "../../components/input";
import "../../wrappers/form-wrapper";

import tmpl from "./tmpl.hbs";

const ctx = {
  title: {
    txt: "Вход",
  },
  form: {
    fields: [
      { title: "Логин", error: "Неверный логин" },
      { title: "Пароль", error: "Неверный пароль", password: true },
    ],
    block: "login",
  },
  button: {
    label: "Авторизоваться",
  },
  link: {
    label: "Нет аккаунта?",
    styles: "footer",
  },
};

window.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementsByClassName("main")[0];
  const el = tmpl(ctx);

  main.innerHTML = el;
});
