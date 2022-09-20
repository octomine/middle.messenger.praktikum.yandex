import Store from '../store';
import ControllerUser from './ControllerUser';
import ControllerChats from './ControllerChats';

class ControllerPopup {
  constructor() {

  }

  addUser() {
    Store.set('popup', {
      isShown: true,
      flag: 'input',
      title: 'Введите логин',
      button: 'Найти',
      action: (login: string) => ControllerUser.search({ login }).then((data) => {
        const users = data.map(({
          id, login, display_name, first_name, second_name,
        }) => ({
          id,
          login: display_name || login,
          name: `${first_name} ${second_name}`,
        }));
        Store.set('popup', {
          flag: 'list',
          title: 'Добавить пользователя',
          button: 'Назад',
          action: this.addUser.bind(this),
          onUser: (id: string) => ControllerChats.addUsers({ users: [id], chatId: Store.getChatId() })
            .then(() => this.hide()),
        });
        this.showUsers(users);
      }),
    });
  }

  showUsers(users) {
    Store.set('popup', {
      users,
    });
  }

  removeUser() {
    Store.set('popup', {
      isShown: true,
      flag: 'list',
      title: 'Удалить пользователя',
      button: 'Закрыть',
      action: () => this.hide(),
      onUser: (id: string) => ControllerChats.removeUsers({ users: [id], chatId: Store.getChatId() })
        .then(() => this.hide()),
    });
    ControllerChats.getUsers().then((users) => this.showUsers(users));
  }

  show() {
    Store.set('popup.isShown', true);
  }

  hide() {
    Store.set('popup.isShown', false);
  }
}

export default new ControllerPopup();
