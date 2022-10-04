import APIBase from './APIBase';
import { SignupData } from './APIAuth';

export interface PasswordData extends Record<string, string> {
  oldPassword: string;
  newPassword: string;
}

export interface FindUserData {
  login: string;
}

export interface UserProps {
  id: string;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export class APIUser extends APIBase {
  constructor() {
    super('/user');
  }

  profile(data: SignupData) {
    return this.http.put('/profile', data);
  }

  avatar(data: FormData) {
    return this.http.put('/profile/avatar', data, {});
  }

  password(data: PasswordData) {
    return this.http.put('/password', data);
  }

  read(id: string) {
    return this.http.get(`/${id}`);
  }

  search(data: FindUserData) {
    return this.http.post<UserProps[]>('/search', data);
  }

  create = undefined;

  delete = undefined;

  update = undefined;
}

export default new APIUser();
