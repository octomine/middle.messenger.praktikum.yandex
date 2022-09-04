class EventBus {
  listeners: object;

  constructor() {
    this.listeners = {}
  }

  on(event: string, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback)
  }

  off(event: string, callback) {
    if (!this.listeners[event]) {
      throw new Error(`Отсутствует событие ${event}`);
    }
    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback)
  }

  emit(event: string, ...args) {
    if (!this.listeners[event]) {
      throw new Error(`Отсутствует событие ${event}`);
    }
    this.listeners[event].forEach((listener) => listener(...args))
  }
}

export default EventBus;
