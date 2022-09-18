import { Indexed } from '../store';

export const FIELDS_LOGIN: Indexed = {
  login: { title: 'Логин', isRequired: true },
  password: { title: 'Пароль', isPassword: true, isRequired: true },
};

export const FIELDS_REGISTRATION: Indexed = {
  email: { title: 'Почта', isRequired: true },
  login: { title: 'Логин', isRequired: true },
  first_name: { title: 'Имя', isRequired: true },
  second_name: { title: 'Фамилия', isRequired: true },
  display_name: { title: 'Имя в чате', isRequired: true },
  phone: { title: 'Телефон', isRequired: true },
  password: { title: 'Пароль', isPassword: true, isRequired: true },
  password_check: { title: 'Пароль (ещё раз)', isPassword: true },
};

export const FIELDS_PROFILE: Indexed = {
  email: { title: 'Почта' },
  login: { title: 'Логин' },
  first_name: { title: 'Имя' },
  second_name: { title: 'Фамилия' },
  display_name: { title: 'Имя в чате' },
  phone: { title: 'Телефон' },
};
