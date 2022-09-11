enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export type Options = {
  method: METHOD;
  headers?: object;
  data?: any;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

class HTTP {
  get(url: string, opts: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...opts, method: METHOD.GET });
  }

  post(url: string, opts: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...opts, method: METHOD.POST });
  }

  put(url: string, opts: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...opts, method: METHOD.PUT });
  }

  patch(url: string, opts: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...opts, method: METHOD.PATCH });
  }

  delete(url: string, opts: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...opts, method: METHOD.DELETE });
  }

  request(url: string, opts: Options = { method: METHOD.GET }): Promise<XMLHttpRequest> {
    const { method, data, headers = {} } = opts;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      Object.keys(headers).forEach((key) => xhr.setRequestHeader(key, headers[key]));

      xhr.onload = function () {
        console.log(xhr);
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}

export { HTTP };
