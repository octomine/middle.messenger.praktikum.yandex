import API, { APIAuth, SigninData } from '../api/APIAuth';
import Store from '../store';
import Router from '../router/Router';

class ControllerAuth {
  private readonly api: APIAuth;

  constructor() {
    this.api = API;
  }

  signin(data: SigninData) {
    return this.api.signin(data)
      .then(() => this.fetchUser())
      .then(() => Router.go('/messenger'))
      .catch((err) => console.error(err));
  }

  fetchUser() {
    return this.api.read().then((user) => console.log(user))
  }
}

export default new ControllerAuth();
