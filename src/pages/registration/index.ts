import "../../components/common/styles";
import "../../components/button";
import "../../components/label";
import "../../components/form";
import "../../components/input";
import "../../wrappers/form-wrapper";

import tmpl from "./tmpl.hbs";

const ctx = {
  title: {
    txt: "Регистрация",
  },
  form: {
    fields: [
      { title: "Почта", error: "Обязательное поле" },
      { title: "Логин", error: "Обязательное поле" },
      { title: "Имя" },
      { title: "Фамилия" },
      { title: "Телефон" },
      { title: "Пароль", error: "Обязательное поле" },
      { title: "Пароль (ещё раз)", error: "Пароли не совпадают" },
    ],
    block: "registration",
  },
  button: {
    label: "Зарегистрироваться",
  },
  link: {
    label: "Войти",
  },
};

window.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementsByClassName("main")[0];
  const el = tmpl(ctx);

  main.innerHTML = el;
});
