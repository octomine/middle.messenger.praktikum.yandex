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
    login: {
      errors: {},
    },
  };

  public getState(): Indexed {
    return this.state;
  }

  public set(newState: Indexed[]) {
    newState.forEach(({ path, value }) => set(this.state, path, value));
    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
