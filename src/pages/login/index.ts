import Block from '../../components/base/index'

import "../../components/label";
import "../../components/form";
import "../../components/input";

import FormWrapper from "../../wrappers/form-wrapper/FormWrapper";
import Button from '../../components/button';
import Form from '../../components/form';
import Input from '../../components/input';

const ctx = {
  title: { txt: "Вход" },
  form: new Form({
    fields: [
      new Input({ name: "login", title: "Логин", error: "Неверный логин" }),
      new Input({
        name: "password", title: "Пароль", error: "Неверный пароль", password: true,
      }),
    ],
    block: "login",
  }),
  button: new Button({
    label: "Авторизоваться",
    events: {
      click: () => login()
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

function login() {
  // TODO: валидация!!1
  console.log(form.children.form.collect());
}

const form = new FormWrapper(ctx);

function render(query: string, block: Block) {
  const root = document.querySelector(query);
  root.appendChild(block.getContent());
  block.dispatchComponentDidMount();

  return root;
}

render('.main', form);