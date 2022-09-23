import Store from "../store";

class ControllerInput {
  constructor() {

  }

  setError(name: string, error: string | null) {
    Store.set(`errors.${name}`, error);
  }
}

export default new ControllerInput();
