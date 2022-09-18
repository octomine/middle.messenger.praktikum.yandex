import APIBase from './APIBase';
import { SignupData } from './APIAuth';

export interface PasswordData {
  oldPassword: string;
  newPassword: string;
}

export class APIUser extends APIBase {
  constructor() {
    super('/user');
  }

  profile(data: SignupData) {
    return this.http.put('/profile', data);
  }

  password(data: PasswordData) {
    return this.http.put('/password', data);
  }

  create = undefined;

  delete = undefined;

  read = undefined;

  update = undefined;
}

export default new APIUser();
