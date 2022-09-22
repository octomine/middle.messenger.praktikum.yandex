import APIBase from "./APIBase";

export class APIResuources extends APIBase {
  constructor() {
    super('/resources')
  }

  getPath(path: string): string {
    return `${this.http.getEndpoint()}${path}`;
  }

  create(data: FormData) {
    return this.http.post('/', data)
      .then((result) => result)
      .catch((err) => console.error(err))
  }

  read = undefined;
  update = undefined;
  delete = undefined;
}

export default new APIResuources();
