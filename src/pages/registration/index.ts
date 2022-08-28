import Block from '../../components/base/index'

import "../../components/label";
import "../../components/form";
import "../../components/input";

import FormWrapper from "../../wrappers/form-wrapper/FormWrapper";
import Button from '../../components/button';
import Form from '../../components/form';
import Input from '../../components/input';

const ctx = {
  title: {
    txt: "Регистрация",
  },
  form: new Form({
    fields: [
      new Input({ name: "email", title: "Почта" }),
      new Input({ name: "login", title: "Логин" }),
      new Input({ name: "first_name", title: "Имя" }),
      new Input({ name: "second_name", title: "Фамилия" }),
      new Input({ name: "phone", title: "Телефон" }),
      new Input({ name: "password", title: "Пароль", password: true }),
      new Input({ name: "", title: "Пароль (ещё раз)", password: true }),
    ],
    block: "registration",
  }),
  button: new Button({
    label: "Зарегистрироваться",
    events: {
      click: () => register()
    }
  }),
  link: new Button({
    label: "Войти",
    modifiers: "link",
  }),
};

function register() {
  // TODO: вот тут как-то не так, сделать более лучше
  const res = form.children.form.collect();
  const tmp = res.filter(({ error }) => error);
  const errors = tmp.reduce((res, item) => {
    const { name, error } = item;
    return { ...res, [name]: error };
  }, {});
  // if (errors) { // TODO: isEmpty
  //   form.children.form.showErrors(errors);
  //   render('.main', form);
  // } else {
    const toReq = res.reduce((res, { name, value }) => ({ ...res, [name]: value }), {});
    console.log(toReq);// выводить поля формы в лог
  // }
}

const form = new FormWrapper(ctx);

function render(query: string, block: Block) {
  const root = document.querySelector(query);
  root.appendChild(block.getContent());
  block.dispatchComponentDidMount();

  return root;
}

render('.main', form);
