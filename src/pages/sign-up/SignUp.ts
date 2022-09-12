import Block, { TBlockProps } from "../../components/common/block";
import { email, login, phone, password, name } from "../../utils/validators";

import tmpl from './tmpl.hbs';
import FormWrapper from "../../wrappers/form-wrapper";

export default class SignUp extends Block<TBlockProps> {
  constructor(props: TBlockProps = {}) {
    super(props);
  }

  get form(): FormWrapper {
    return this.children.form as FormWrapper;
  }

  init() {
    const ctx = {
      title: 'Регистрация',
      fields: [
        { name: 'email', title: 'Почта', isRequired: true, validator: email },
        { name: 'login', title: 'Логин', isRequired: true, validator: login },
        { name: 'first_name', title: 'Имя', validator: name },
        { name: 'second_name', title: 'Фамилия', validator: name },
        { name: 'phone', title: 'Телефон', validator: phone },
        {
          name: 'password', title: 'Пароль', isRequired: true, validator: password, isPassword: true,
        },
        {
          name: 'password_check', title: 'Пароль (ещё раз)', isPassword: true, isEqual: 'password',
        },
      ],
      block: 'registration',
      button: 'Зарегистрироваться',
      submit: this.submit.bind(this),
      link: 'Войти',
      linkPath: '/',
    };

    this.children.form = new FormWrapper(ctx);
  }

  submit() {
    this.form.submit()
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
