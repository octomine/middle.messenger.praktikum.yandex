import Block, { TBlockProps } from "../../components/common/block";
import FormWrapper from "../../wrappers/form-wrapper";
import tmpl from './tmpl.hbs';
import { APIAuth } from "../../api/api-auth";

export default class Login extends Block<TBlockProps> {
  constructor(props: TBlockProps = {}) {
    super(props);
  }

  get form(): FormWrapper {
    return this.children.form as FormWrapper;
  }

  init() {
    const ctx = {
      title: 'Вход',
      block: 'login',
      fields: [
        { name: 'login', title: 'Логин', isRequired: true },
        {
          name: 'password', title: 'Пароль', isPassword: true, isRequired: true,
        },
      ],
      button: 'Авторизоваться',
      submit: this.submit.bind(this),
      link: 'Нет аккаунта?',
      linkPath: '/sign-up',
    };

    this.children.form = new FormWrapper(ctx);
  }

  submit() {
    console.log(this.form.submit());
    new APIAuth().signin(JSON.stringify(this.form.submit()));
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
