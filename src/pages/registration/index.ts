import Block from '../../components/base/index'
import FormWrapper from "../../wrappers/form-wrapper/FormWrapper";

const ctx = {
  title: "Регистрация",
  fields: [
    { name: "email", title: "Почта" },
    { name: "login", title: "Логин" },
    { name: "first_name", title: "Имя" },
    { name: "second_name", title: "Фамилия" },
    { name: "phone", title: "Телефон" },
    { name: "password", title: "Пароль", password: true },
    { name: "", title: "Пароль (ещё раз)", password: true },
  ],
  block: "registration",
  button: "Зарегистрироваться",
  link: "Войти",
  submit: () => console.log(form.collect())
};

const form = new FormWrapper(ctx);

function render(query: string, block: Block) {
  const root = document.querySelector(query);
  root.appendChild(block.getContent());
  block.dispatchComponentDidMount();

  return root;
}

render('.main', form);
