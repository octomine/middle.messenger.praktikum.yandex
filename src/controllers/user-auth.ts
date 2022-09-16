import { APIAuth } from '../api/auth';
import Store from '../store';
import Router from '../router/Router';

interface LoginFormModel {
  login: string;
  password: string;
}

interface SignupFormModel {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

const apiAuth = new APIAuth();

export default class ControllerUserAuth {
  public async getProfile() {
    return apiAuth.get('/user').then((user) => {
      Store.set([{ path: 'user', value: user }]);
    }).catch((err) => {
      // TODO: отслеживать статус, наверно здесь
      console.log(`controller CATCHED ${err}`);
      throw new Error(err);
    })
  }

  public async login(data: LoginFormModel) {
    try {
      const resp = await apiAuth.request('/signin', JSON.stringify(data));
      if (resp === 'OK') { // TODO: надо ли?
        this.getProfile();
        Router.go('/messenger');
      }
    } catch (err) {
      console.log('CATCHED!!1');
      console.log(err);
      Store.set([
        { path: 'login.errors.login.error', value: '!!!' },
        { path: 'login.errors.password.error', value: '!!!' },
      ]);
    }
  }

  public async signup(data: SignupFormModel) {
    try {
      const resp = await apiAuth.request('/signup', JSON.stringify(data));
      console.log(resp);
      this.getProfile();
      Router.go('/messenger');
    } catch (err) {
      console.log('CATCHED!!1');
      console.log(err);
    }
  }
}
