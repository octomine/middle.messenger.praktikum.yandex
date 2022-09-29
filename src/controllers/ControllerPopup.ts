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
      inputTitle: 'Логин',
      button: 'Найти',
      action: (login: string) => ControllerUser.search({ login }).then((data) => {
        const users = data.map(({
          id, avatar, login, display_name, first_name, second_name,
        }) => ({
          avatar,
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
    ControllerChats.getUsers().then((users) => this.showUsers(users as any[]));
  }

  showUsers(users: any[]) {
    Store.set('popup', {
      users,
    });
  }

  addAvatar() {
    Store.set('popup', {
      isShown: true,
      flag: 'upload',
      title: 'Загрузите файл',
      button: 'Поменять',
      action: (fd: FormData) => ControllerUser.avatar(fd).then((user) => {
        Store.set('user.settings', user);
        this.hide();
      }),
    });
  }

  addChat() {
    Store.set('popup', {
      isShown: true,
      flag: 'input',
      title: 'Введите название чата',
      inputTitle: 'Название чата',
      button: 'Создать',
      action: (title: string) => ControllerChats.createChat({ title })
        .then((id) => ControllerChats.selectChat({ id }))
        .then(() => ControllerChats.getChats({}))
        .then(() => this.hide()),
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
