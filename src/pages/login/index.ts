import Block from '../../components/base/index'
import FormWrapper from "../../wrappers/form-wrapper/FormWrapper";

const ctx = {
  title: "Вход",
  block: "login",
  fields: [
    { name: "login", title: "Логин" },
    { name: "password", title: "Пароль", password: true },
  ],
  button: 'Авторизоваться',
  link: 'Нет аккаунта?',
  // submit: () => form.collect(),
  submit: () => {
    form.collect()
    form.setProps({ fields: [{ name: "login", error: '!!!' }] })
  },
}

const form = new FormWrapper(ctx);

function render(query: string, block: Block<unknown>) {
  const root = document.querySelector(query);
  root.appendChild(block.getContent());
  block.dispatchComponentDidMount();

  return root;
}

render('.main', form);
