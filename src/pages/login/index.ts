import { render } from '../../utils/render';
import FormWrapper from "../../wrappers/form-wrapper/FormWrapper";

const ctx = {
  title: "Вход",
  block: "login",
  fields: [
    { name: "login", title: "Логин", isRequired: true },
    { name: "password", title: "Пароль", isPassword: true, isRequired: true },
  ],
  button: 'Авторизоваться',
  link: 'Нет аккаунта?',
  submit: () => {
    console.log('---');
    console.log(form.collect());
  },
}

const form = new FormWrapper(ctx);

render('.main', form);
