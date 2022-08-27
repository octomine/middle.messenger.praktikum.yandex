import Block from '../../components/base/index'

import "../../components/label";
import "../../components/form";
import "../../components/input";

import FormWrapper from "../../wrappers/form-wrapper/FormWrapper";
import Button from '../../components/button';

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
  button: new Button({
    label: "Авторизоваться",
    events: {
      click: () => console.log('LOG IN!!1')
    }
  }),
  link: new Button({
    label: "Нет аккаунта?",
    modifiers: "link",
    events: {
      click: () => console.log('REGISTER!!1')
    }
  }),
};

const form = new FormWrapper(ctx);

function render(query: string, block: Block) {
  const root = document.querySelector(query);
  root.appendChild(block.getContent());
  block.dispatchComponentDidMount();

  return root;
}

render('.main', form);