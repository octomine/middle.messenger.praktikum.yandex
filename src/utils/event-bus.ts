class EventBus {
  listeners: Record<string, Array<(...args: unknown[]) => void>>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: () => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string, callback: () => void) {
    if (!this.listeners[event]) {
      throw new Error(`Отсутствует событие ${event}`);
    }
    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
  }

  emit(event: string, ...args: unknown[]) {
    if (!this.listeners[event]) {
      console.log(`Отсутствует событие ${event}`);
      return;
    }
    this.listeners[event].forEach((listener) => listener(...args));
  }
}

export default EventBus;
