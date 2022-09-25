import Block, { TBlockProps } from '../../components/common/block';
import { Indexed, connect } from '../../store';
import ControllerAuth from '../../controllers/ControllerAuth';

import FormWrapper from '../../wrappers/form-wrapper';

import tmpl from './tmpl.hbs';
import { SigninData } from '../../api/APIAuth';
import { FIELDS_LOGIN } from '../../consts';

const withLogin = connect((state: Indexed) => {
  const { errors: { login: errors } } = state;
  const fields = Object.keys(FIELDS_LOGIN).map<Indexed>((name) => {
    const field = { name, ...FIELDS_LOGIN[name] };
    const error = errors[name];
    return { ...field, error };
  });
  return { fields };
});

class PageLogin extends Block<TBlockProps> {
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
      button: 'Авторизоваться',
      submit: this.submit.bind(this),
      link: 'Нет аккаунта?',
      linkPath: '/sign-up',
    };

    this.children.form = new (withLogin(FormWrapper))(ctx);
  }

  submit() {
    const req = this.form.submit();
    if (Object.keys(req).length > 0) {
      ControllerAuth.signin(req as SigninData);
    }
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}

export default PageLogin;
