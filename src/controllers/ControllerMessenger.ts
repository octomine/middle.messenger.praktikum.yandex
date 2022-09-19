import { SocketIO } from '../services/socket-io';
import Store, { Indexed } from '../store';

export class ControllerMessenger {
  private socket?: SocketIO;

  constructor() {

  }

  openChat(token: string) {
    this.socket = new SocketIO(`/${Store.getUserId()}/${Store.getChatId()}/${token}`);
  }

  sendMessage(msg: string) {
    this.socket?.send(msg, 'message');
  }

  recieveMessage(msg: Indexed | Indexed[]) {
    const { type } = msg;
    switch (type) {
      case 'message':
        break;
      case 'user connected':
        break;
      case 'pong':
        break;
      default:
        const messages = msg.map(({ user_id, content, time }) => {
          const modifiers = user_id === Store.getUserId() ? 'my' : '';
          return { content, time, modifiers };
        }).reverse();
        Store.set('currentChat.messages', messages);
    }
  }
}

export default new ControllerMessenger();
