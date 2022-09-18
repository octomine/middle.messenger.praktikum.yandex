import API, { APIAuth, SigninData, SignupData } from '../api/APIAuth';
import Store from '../store';
import Router from '../router/Router';

class ControllerAuth {
  private readonly api: APIAuth;

  constructor() {
    this.api = API;
  }

  setError(name: string, error: string | null) {
    console.log('gonna set');
    console.log(`authErrors.${name}`, error);
    Store.set(`authErrors.${name}`, error);
  }

  signin(data: SigninData) {
    return this.api.signin(data)
      .then(() => this.fetchUser())
      .then(() => Router.go('/messenger'))
      .catch((err) => console.error(err));
  }

  signup(data: SignupData) {
    return this.api.signup(data)
      .then(() => this.fetchUser())
      .then(() => Router.go('/settings'))
      .catch((err) => console.error(err));
  }

  logout() {
    return this.api.logout()
      .then(() => Router.go('/'))
      .catch((err) => console.error(err));
  }

  fetchUser() {
    return this.api.read()
      .then((user) => Store.set('user.settings', user));
  }
}

export default new ControllerAuth();
