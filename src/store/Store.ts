import EventBus from '../utils/event-bus';
import { set } from '../utils/set';

export type Indexed<T = unknown> = {
  [key in string]: T
};

export enum StoreEvents {
  Updated = 'upadated',
}

class Store extends EventBus {
  private state: Indexed = {
    authErrors: {},
    user: {
      edit: false,
      password: false,
      id: null,
      avatar: null,
      userName: null,
      settings: {},
    },
    chats: [],
  };

  public getState(): Indexed {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
