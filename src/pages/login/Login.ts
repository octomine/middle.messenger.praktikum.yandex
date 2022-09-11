import Block, { TBlockProps } from "../../components/common/block";
import tmpl from './tmpl.hbs';
import FormWrapper from "../../wrappers/form-wrapper";

export default class Login extends Block<TBlockProps> {
  constructor(props: TBlockProps) {
    super({});
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
    this.children.form.submit()
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
