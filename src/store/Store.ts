import EventBus from "../utils/event-bus";
import Block, { TBlockProps } from "../components/common/block";

export enum StoreEvents {
  Updated = 'upadated'
}

class Store extends EventBus {
  private state: object = {
    login: {
      fields: [
        { name: 'login', title: 'Логин', isRequired: true },
        {
          name: 'password', title: 'Пароль', isPassword: true, isRequired: true,
        },
      ],
    }
  };

  public getState(): object {
    return this.state;
  }

  public set(path: string, value: unknown) {
    // this.state = { ...this.state, [path]: value };
    this.state = { fields: [{ name: 'login', error: '!!!' }] };
    console.log(this.state);

    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
