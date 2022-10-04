import APIBase from './APIBase';

export interface SigninData extends Record<string, string> {
  login: string;
  password: string;
}

export interface SignupData extends Record<string, string> {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface User extends SignupData {
  id: string;
  avatar: string;
}

export class APIAuth extends APIBase {
  constructor() {
    super('/auth');
  }

  signin(data: SigninData) {
    return this.http.post('/signin', data);
  }

  signup(data: SignupData) {
    return this.http.post('/signup', data);
  }

  read(): Promise<User> {
    return this.http.get('/user');
  }

  logout() {
    return this.http.post('/logout');
  }

  create = undefined;

  update = undefined;

  delete = undefined;
}

export default new APIAuth();
