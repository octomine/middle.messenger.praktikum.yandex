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
      new Input({ name: "login", title: "Логин" }),
      new Input({
        name: "password", title: "Пароль", password: true,
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
  const res = form.children.form.collect();
  const tmp = res.filter(({ error }) => error);
  const errors = tmp.reduce((res, item) => {
    const { name, error } = item;
    return { ...res, [name]: error };
  }, {});
  if (errors) {
    form.children.form.showErrors(errors);
    render('.main', form);
  } else {
    const toReq = res.reduce((res, { name, value }) => ({ ...res, [name]: value }), {});
    console.log(toReq);// выводить поля формы в лог
  }
}

const form = new FormWrapper(ctx);

function render(query: string, block: Block) {
  const root = document.querySelector(query);
  root.appendChild(block.getContent());
  block.dispatchComponentDidMount();

  return root;
}

render('.main', form);
