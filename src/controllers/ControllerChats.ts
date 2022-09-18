import API, { APIChats, GetChatsData } from '../api/APIChats';
import Store from '../store';

export class ControllerChats {
  private readonly api: APIChats;

  constructor() {
    this.api = API;
  }

  getChats(data: GetChatsData) {
    return this.api.getChats(data)
      .then((chats) => Store.set('chats', chats))
      .catch((err) => console.error(err));
  }
}

export default new ControllerChats();
