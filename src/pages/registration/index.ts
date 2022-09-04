import { render } from '../../utils/render';
import FormWrapper from '../../wrappers/form-wrapper/FormWrapper';
import { email, name, phone, password, login } from '../../utils/validators';

const ctx = {
  title: 'Регистрация',
  fields: [
    { name: 'email', title: 'Почта', validator: email },
    { name: 'login', title: 'Логин', validator: login },
    { name: 'first_name', title: 'Имя', validator: name },
    { name: 'second_name', title: 'Фамилия', validator: name },
    { name: 'phone', title: 'Телефон', validator: phone },
    { name: 'password', title: 'Пароль', validator: password, isPassword: true },
    { name: 'password_check', title: 'Пароль (ещё раз)', isPassword: true, isEqual: 'password' },
  ],
  block: 'registration',
  button: 'Зарегистрироваться',
  link: 'Войти',
  submit: () => form.collect()
};

const form = new FormWrapper(ctx);

render('.main', form);
