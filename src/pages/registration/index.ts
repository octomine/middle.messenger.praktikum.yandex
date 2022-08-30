import { render } from '../../utils/render';
import FormWrapper from "../../wrappers/form-wrapper/FormWrapper";

const ctx = {
  title: "Регистрация",
  fields: [
    { name: "email", title: "Почта" },
    { name: "login", title: "Логин" },
    { name: "first_name", title: "Имя" },
    { name: "second_name", title: "Фамилия" },
    { name: "phone", title: "Телефон" },
    { name: "password", title: "Пароль", isPassword: true },
    { name: "password_check", title: "Пароль (ещё раз)", isPassword: true, isEqual: "password" },
  ],
  block: "registration",
  button: "Зарегистрироваться",
  link: "Войти",
  submit: () => console.log(form.collect())
};

const form = new FormWrapper(ctx);

render('.main', form);
