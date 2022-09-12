import Block, { TBlockProps } from "../../components/common/block";
import FormWrapper from "../../wrappers/form-wrapper";
import tmpl from './tmpl.hbs';
import ControllerUserLogin from "../../controllers/user-login";

export default class Login extends Block<TBlockProps> {
  controller: ControllerUserLogin;

  constructor(props: TBlockProps = {}) {
    super(props);
    this.controller = new ControllerUserLogin();
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
    this.controller.login(this.form.submit());
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
