import { APIUser } from '../api/user';
import Store from '../store';
import Router from '../router/Router';

interface ProfileFormModel {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  display_name: string;
}

const apiUser = new APIUser();

export default class ControllerUser {
  public async changeProfile(data: ProfileFormModel) {
    try {
      const resp = await apiUser.request('/profile', JSON.stringify(data));
      Store.set([{ path: 'user', value: resp }]);
      // if (resp === 'OK') { // TODO: надо ли?
      //   const user = await apiAuth.get('/user');
      //   Store.set([{ path: 'user', value: user }]);
      //   Router.go('/messenger');
      // }
    } catch (err) {
      console.log('CATCHED!!1');
      console.log(err);
    }
  }
}
