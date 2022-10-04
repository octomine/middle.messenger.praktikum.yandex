import ControllerMessenger from '../controllers/ControllerMessenger';

export class SocketIO {
  static API_URL = 'wss://ya-praktikum.tech/ws/chats';

  private socket: WebSocket;

  private intervalId?: NodeJS.Timer;

  constructor(url: string) {
    this.socket = new WebSocket(`${SocketIO.API_URL}${url}`);

    this.socket.addEventListener('open', () => {
      console.log('socket is OPENED!!1');
      this.intervalId = setInterval(this.ping.bind(this), 30 * 1000);
      this.getMessages();
    });
    this.socket.addEventListener('close', () => {
      console.log('socket is CLOSED!!1');
    });
    this.socket.addEventListener('message', (evt: MessageEvent) => {
      console.log('got message');
      const message = JSON.parse(evt.data);
      ControllerMessenger.recieveMessage(message);
    });
    this.socket.addEventListener('error', (evt: Event) => {
      console.log('ERROR!!1');
      console.log(evt);
    });
  }

  private ping() {
    console.log('socket ping');
    this.socket.send(JSON.stringify({ type: 'ping' }));
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

  public close() {
    clearInterval(this.intervalId);
    this.socket.close();
  }
}
