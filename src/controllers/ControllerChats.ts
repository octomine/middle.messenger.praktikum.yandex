import API, { APIChats, GetChatsData, AddUsersData } from '../api/APIChats';
import Store, { Indexed } from '../store';
import ControllerMessenger from './ControllerMessenger';

export interface CurrentChatData {
  id: string;
  title: string;
  avatar: string | null;
  created_by: number;
  unread_count: number;
  last_message: Indexed | null;
}

export class ControllerChats {
  private readonly api: APIChats;

  constructor() {
    this.api = API;
  }

  selectChat(currentChat: CurrentChatData) {
    const { id } = currentChat;
    Store.set('currentChat', currentChat);
    this.getToken(id);
  }

  getChats(data: GetChatsData) {
    return this.api.getChats(data)
      .then((chats) => Store.set('chats', chats))
      .catch((err) => console.error(err));
  }

  addUsers(data: AddUsersData) {
    return this.api.addUsers(data)
      .then(() => console.log('DONE!!1'))
      .catch((err) => console.error(err));
  }

  getToken(id: string) {
    return this.api.getToken(id)
      .then(({ token }) => ControllerMessenger.openChat(token))
      .catch((err) => console.error(err));
  }
}

export default new ControllerChats();
