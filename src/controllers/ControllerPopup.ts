import Store from '../store';
import ControllerUser from './ControllerUser';

class ControllerPopup {
  constructor() {

  }

  addUser() {
    Store.set('popup', {
      isShown: true,
      title: 'Добавить пользователя',
      button: 'Добавить',
      action: (login: string) => ControllerUser.search({ login }).then((users) => {
        console.log(users);
      }),
    });
  }

  removeUser() {
    Store.set('popup', {
      isShown: true,
      title: 'Удалить пользователя',
      button: 'Удалить',
      action: () => this.hide(),
    });
  }

  show() {
    Store.set('popup.isShown', true);
  }

  hide() {
    Store.set('popup.isShown', false);
  }
}

export default new ControllerPopup();
