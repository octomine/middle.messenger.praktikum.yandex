import API, { APIResuources } from '../api/APIResources';

class ControllerResources {
  private readonly api: APIResuources;

  constructor() {
    this.api = API;
  }

  resourcePath(path: string | null) {
    return path ? this.api.getPath(path) : null;
  }

  upload(data: FormData) {
    return this.api.create(data);
  }
}

export default new ControllerResources();
