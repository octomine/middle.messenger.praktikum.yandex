import Block, { TBlockProps } from "../../components/common/block";
import FormWrapper from "../../wrappers/form-wrapper";
import tmpl from './tmpl.hbs';
import ControllerUserLogin from "../../controllers/user-login";

class Login extends Block<TBlockProps> {
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
      button: 'Авторизоваться',
      submit: this.submit.bind(this),
      link: 'Нет аккаунта?',
      linkPath: '/sign-up',
      mapStateToProps: (state: object) => ({
        fields: state.login?.fields
      })
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

export default Login;
