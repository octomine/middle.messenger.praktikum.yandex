import Block, { TBlockProps } from '../../components/common/block';
import { Indexed, connect } from '../../store';
import ControllerUserLogin from '../../controllers/user-login';

import FormWrapper from '../../wrappers/form-wrapper';

import tmpl from './tmpl.hbs';

const mapStateToProps = (state: Indexed) => ({
  errors: state.login.errors,
});

class PageLogin extends Block<TBlockProps> {
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

    this.children.form = new (connect(FormWrapper, mapStateToProps))(ctx);
  }

  submit() {
    const req = this.form.submit();
    this.controller.login(req);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}

export default PageLogin;