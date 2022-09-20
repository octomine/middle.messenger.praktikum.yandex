import ControllerMessenger from '../controllers/ControllerMessenger';

export class SocketIO {
  static API_URL = 'wss://ya-praktikum.tech/ws/chats';

  private socket: WebSocket;

  constructor(url: string) {
    this.socket = new WebSocket(`${SocketIO.API_URL}${url}`);

    this.socket.addEventListener('open', () => {
      console.log('socket is OPENED!!1');
      this.getMessages();
    });
    this.socket.addEventListener('close', () => {
      console.log('socket is CLOSED!!1');
    });
    this.socket.addEventListener('message', (evt) => {
      console.log('got message');
      const message = JSON.parse(evt.data);
      ControllerMessenger.recieveMessage(message);
    });
    this.socket.addEventListener('error', (evt) => {
      console.log('ERROR!!1');
      console.log(evt.data);
    });
  }

  public send(content: string, type: string) {
    this.socket.send(JSON.stringify({
      content,
      type,
    }));
  }

  public getMessages() {
    this.send('0', 'get old');
  }
}
