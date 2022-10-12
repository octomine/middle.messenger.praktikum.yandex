export type TFieldProps = Record<string, Record<string, string | boolean>>;

export const FIELDS_LOGIN: TFieldProps = {
  login: { title: 'Логин', isRequired: true, errorSpace: 'login' },
  password: {
    title: 'Пароль', isPassword: true, isRequired: true, errorSpace: 'login',
  },
};

export const FIELDS_REGISTRATION: TFieldProps = {
  email: {
    title: 'Почта', isRequired: true, validated: true, errorSpace: 'signup',
  },
  login: {
    title: 'Логин', isRequired: true, validated: true, errorSpace: 'signup',
  },
  first_name: {
    title: 'Имя', isRequired: true, validated: true, errorSpace: 'signup',
  },
  second_name: {
    title: 'Фамилия', isRequired: true, validated: true, errorSpace: 'signup',
  },
  display_name: { title: 'Имя в чате', isRequired: true, errorSpace: 'signup' },
  phone: {
    title: 'Телефон', isRequired: true, validated: true, errorSpace: 'signup',
  },
  password: {
    title: 'Пароль', isPassword: true, isRequired: true, validated: true, errorSpace: 'signup',
  },
  password_check: {
    title: 'Пароль (ещё раз)', isPassword: true, isEqual: 'password', errorSpace: 'signup',
  },
};

export const FIELDS_PROFILE: TFieldProps = {
  email: { title: 'Почта' },
  login: { title: 'Логин' },
  first_name: { title: 'Имя' },
  second_name: { title: 'Фамилия' },
  display_name: { title: 'Имя в чате' },
  phone: { title: 'Телефон' },
};

export enum InputErrors {
  IsRequired = 'Обязательное поле',
  Wrong = 'Поле заполнено неверно',
  OneLetter = 'Логин должен содержать хотя бы одну букву',
  WrongEmail = 'Неверрный формат почты',
  WrongPhone = 'Неверрный формат телефона',
  EasyPassword = 'Очень простой пароль',
  NotEqual = 'Значения не совпадают',
}
