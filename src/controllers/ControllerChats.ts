import API, {
  APIChats, GetChatsData, AddUsersData, CreateChatData,
} from '../api/APIChats';
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

class ControllerChats {
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

  getUsers() {
    return this.api.getUsers()
      .then((users) => users)
      .catch((err) => console.error(err));
  }

  addUsers(data: AddUsersData) {
    return this.api.addUsers(data)
      .then(() => console.log('DONE!!1'))
      .catch((err) => console.error(err));
  }

  removeUsers(data: AddUsersData) {
    return this.api.removeUsers(data)
      .then(() => console.log('DONE!!1'))
      .catch((err) => console.error(err));
  }

  createChat(data: CreateChatData) {
    return this.api.create(data)
      .then((res) => res)
      .catch((err) => console.error(err));
  }

  deleteChat() {
    return this.api.delete(Store.getChatId()) // нигде, кроме открытого чата этого нет
      .then(() => Store.set('currentChat', { messages: [] }))
      .catch((err) => console.error(err));
  }

  getToken(id: string) {
    return this.api.getToken(id)
      .then(({ token }) => ControllerMessenger.openChat(token))
      .catch((err) => console.error(err));
  }
}

export default new ControllerChats();
