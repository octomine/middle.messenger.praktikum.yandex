import { APIAuth } from '../api/auth'

interface LoginFormModel {
  login: string;
  password: string;
}

const apiAuth = new APIAuth();

export default class ControllerUserLogin {
  public async login(data: LoginFormModel) {
    try {
      const res = await apiAuth.request('/signin', JSON.stringify(data));
      console.log(res);
    } catch (err) {
      console.log('CATCHED!!1');
      console.log(err);
    }
  }
}