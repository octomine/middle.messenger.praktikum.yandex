import API, { APIUser, PasswordData, FindUserData } from '../api/APIUser';
import Store from '../store';
import { SignupData } from '../api/APIAuth';

export class ControllerUser {
  private readonly api: APIUser;

  constructor() {
    this.api = API;
  }

  editSettings() {
    const newState = { edit: true, password: false };
    Store.set('user', newState);
  }

  editPassword() {
    const newState = { edit: true, password: true };
    Store.set('user', newState);
  }

  closeEdit() {
    const newState = { edit: false };
    Store.set('user', newState);
  }

  // api
  profile(data: SignupData) {
    return this.api.profile(data)
      .then((settings) => Store.set('user', { edit: false, settings }))
      .catch((err) => console.error(err));
  }

  password(data: PasswordData) {
    return this.api.password(data)
      .then(() => Store.set('user.edit', false))
      .catch((err) => console.error(err));
  }

  search(data: FindUserData) {
    return this.api.search(data)
      .then((users) => users)
      .catch((err) => console.error(err));
  }
}

export default new ControllerUser();
