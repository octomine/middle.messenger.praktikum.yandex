import { EventBus, set } from '../utils';

export type Indexed<T = any> = {
  [key in string]: T
};

export enum StoreEvents {
  Updated = 'upadated',
}

class Store extends EventBus {
  private state: Indexed = {
    popup: {
      isShown: false,
      flag: 'input',
      users: [],
    },
    errors: {
      login: {
        login: null,
        password: null,
      },
      signup: {
        email: null,
        login: null,
        first_name: null,
        second_name: null,
        display_name: null,
        phone: null,
        password: null,
        password_check: null,
      },
    },
    user: {
      edit: false,
      password: false,
      id: null,
      avatar: null,
      userName: null,
      settings: {},
    },
    chats: [],
    currentChat: {
      messages: [],
    },
  };

  public getState(): Indexed {
    return this.state;
  }

  public getUserId(): string {
    const { user: { settings: { id } } } = this.getState();
    return id;
  }

  public getChatId(): string {
    const { currentChat: { id } } = this.getState();
    return id;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
