import APIBase from './APIBase';
import Store from '../store';

export interface TokenData {
  token: string;
}

export interface GetChatsData {
  offset: number;
  limit: number;
  title: string;
}

export interface CreateChatData {
  title: string;
}

export interface AddUsersData {
  users: string[];
  chatId: string;
}

export class APIChats extends APIBase {
  constructor() {
    super('/chats');
  }

  getChats(data: GetChatsData) {
    return this.http.get('/', data);
  }

  create(data: CreateChatData) {
    return this.http.post('/', data);
  }

  delete(chatId: string) {
    return this.http.delete('/', { chatId });
  }

  getUsers() {
    return this.http.get(`/${Store.getChatId()}/users`);
  }

  addUsers(data: AddUsersData) {
    return this.http.put('/users', data);
  }

  removeUsers(data: AddUsersData) {
    return this.http.delete('/users', data);
  }

  getToken(id: string): Promise<TokenData> {
    return this.http.post(`/token/${id}`);
  }

  read = undefined;

  update = undefined;
}

export default new APIChats();
