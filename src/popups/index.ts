import "../components/common/styles";
import "../components/label";
import "../components/button";
import "../components/input";
import "../wrappers/popup-wrapper";

import tmpl from "./tmpl.hbs";

const ctx = {
  1: {
    title: {
      txt: "Загрузите файл",
    },
    custom: () => "button",
    customCtx: {
      label: "Выбрать файл на компьютере",
      modifiers: "link",
    },
    button: {
      label: "Поменять",
    },
  },
  2: {
    title: {
      txt: "Загрузите файл",
    },
    custom: () => "button",
    customCtx: {
      label: "Выбрать файл на компьютере",
      modifiers: "link",
    },
    button: {
      label: "Поменять",
    },
    footer: () => "label",
    footerCtx: {
      txt: "Нужно выбрать файл",
      modifiers: "s,error",
    },
  },
  3: {
    title: {
      txt: "Ошибка, попробуйте ещё раз",
      modifiers: "error",
    },
    custom: () => "button",
    customCtx: {
      label: "Выбрать файл на компьютере",
      modifiers: "link",
    }, // TODO: скорее всего надо запилить более другую кнопку или делать не через кнопку вовсе
    button: {
      label: "Поменять",
    },
  },
  4: {
    title: {
      txt: "Файл загружен",
    },
    contentText: "pic11.jpg",
    button: {
      label: "Поменять",
    },
  },
  5: {
    title: {
      txt: "Добавить пользователя",
    },
    custom: () => "input",
    customCtx: {
      title: "Логин",
    },
    button: {
      label: "Добавить",
    },
  },
  6: {
    title: {
      txt: "Удалить пользователя",
    },
    custom: () => "input",
    customCtx: {
      title: "Логин",
      value: "VoPup",
    },
    button: {
      label: "Удалить",
    },
  },
};

window.addEventListener("DOMContentLoaded", () => {
  let n = location.hash.replace("#", "");
  n = ctx[n] ? n : 1;
  const main = document.getElementsByClassName("main")[0];
  const el = tmpl(ctx[n]);

  main.innerHTML = el;
});
