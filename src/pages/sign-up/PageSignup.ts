import Block, { TBlockProps } from '../../components/common/block';

import tmpl from './tmpl.hbs';
import FormWrapper from '../../wrappers/form-wrapper';
import ControllerAuth from '../../controllers/ControllerAuth';
import { SignupData } from '../../api/APIAuth';
import { FIELDS_REGISTRATION } from '../../consts';
import { connect, Indexed } from '../../store';

const withRegistration = connect((state: Indexed) => {
  const { errors: { signup: errors } } = state;
  const fields = Object.keys(FIELDS_REGISTRATION).map<Indexed>((name) => {
    const field = { name, ...FIELDS_REGISTRATION[name] };
    const error = errors[name];
    return { ...field, error };
  });
  return { fields, errorSpace: 'signup' };
});

export default class PageSignup extends Block<TBlockProps> {
  constructor(props: TBlockProps = {}) {
    super(props);
  }

  get form(): FormWrapper {
    return this.children.form as FormWrapper;
  }

  init() {
    const ctx = {
      title: 'Регистрация',
      block: 'registration',
      button: 'Зарегистрироваться',
      submit: this.submit.bind(this),
      link: 'Войти',
      linkPath: '/',
    };

    this.children.form = new (withRegistration(FormWrapper))(ctx);
  }

  submit() {
    const req = this.form.submit();
    if (Object.keys(req).length > 0) {
      ControllerAuth.signup(req as SignupData);
    }
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
