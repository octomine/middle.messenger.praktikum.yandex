enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

const BASE_URL = 'https://ya-praktikum.tech/api/v2';
const COMMON_OPTS = {
  credentials: 'include',
  mode: 'cors',
};

export type Options = {
  method: Method;
  headers?: object;
  data?: any;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

class HTTP {
  url: string;

  constructor(url: string) {
    this.url = `${BASE_URL}${url}`;
  }

  get(url: string, opts: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...opts, ...COMMON_OPTS, method: Method.GET });
  }

  post(url: string, opts: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...opts, ...COMMON_OPTS, method: Method.POST });
  }

  put(url: string, opts: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...opts, ...COMMON_OPTS, method: Method.PUT });
  }

  patch(url: string, opts: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...opts, ...COMMON_OPTS, method: Method.PATCH });
  }

  delete(url: string, opts: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...opts, ...COMMON_OPTS, method: Method.DELETE });
  }

  request(url: string, opts: Options = { method: Method.GET }): Promise<XMLHttpRequest> {
    const { method, data, headers = {} } = opts;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, `${this.url}${url}`);
      Object.keys(headers).forEach((key) => xhr.setRequestHeader(key, headers[key]));

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === Method.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}

export { HTTP };
