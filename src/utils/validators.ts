import { INPUT_ERRORS } from './input-errors';

export type ValidType = {
  error?: string
}

export const name = (value: string): ValidType => {
  const re = /(^[A-ZА-Я])[-a-zA-Zа-яА-Я]*/g;
  return re.test(value) ? {} : { error: INPUT_ERRORS.WRONG };
}

export const login = (value: string): ValidType => {
  const re1 = /[-_a-zA-Z\d]{3,20}/g; // от 3 до 20 цифр или латинских букв
  const re2 = /[a-zA-Z]/g
  if (!re1.test(value)) {
    return { error: INPUT_ERRORS.WRONG };
  }
  return re2.test(value) ? {} : { error: INPUT_ERRORS.ONE_LETTER };
}

export const email = (value: string): ValidType => {
  const re = /[-.\w]+@([\w-]+\.)+[\w-]+/g;
  return re.test(value) ? {} : { error: INPUT_ERRORS.WRONG_EMAIL };
}

export const phone = (value: string): ValidType => {
  const re = /^[+]?\d{10,15}/g;
  return re.test(value) ? {} : { error: INPUT_ERRORS.WRONG_PHONE };
}

export const password = (value: string): ValidType => {
  const re1 = /\w{8,40}/g; // от 8 до 40 любых символов

  return re1.test(value) ? {} : { error: INPUT_ERRORS.EASY_PASSWORD };
}
