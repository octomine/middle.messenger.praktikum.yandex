import { queryStringify } from '../utils';

enum Method {
  Get = 'Get',
  Post = 'Post',
  Put = 'Put',
  Patch = 'Patch',
  Delete = 'Delete',
}

export type Options = {
  method: Method;
  data?: any;
  headers?: Record<string, string>
};

export class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';

  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  getEndpoint(): string {
    return this.endpoint;
  }

  public get<Response>(path = '/', data: unknown = {}): Promise<Response> {
    return this.request<Response>(`${this.endpoint}${path}${queryStringify(data)}`, { data, method: Method.Get });
  }

  public post<Response = void>(path: string, data?: unknown): Promise<Response> {
    return this.request<Response>(`${this.endpoint}${path}`, { data, method: Method.Post });
  }

  public put<Response = void>(path: string, data: unknown, headers?: Record<string, string>): Promise<Response> {
    return this.request<Response>(`${this.endpoint}${path}`, { data, headers, method: Method.Put });
  }

  public patch<Response = void>(path: string, data: unknown): Promise<Response> {
    return this.request<Response>(`${this.endpoint}${path}`, { data, method: Method.Patch });
  }

  public delete<Response = void>(path: string, data: unknown): Promise<Response> {
    return this.request<Response>(`${this.endpoint}${path}`, { data, method: Method.Delete });
  }

  request<Response>(url: string, opts: Options = { method: Method.Get }): Promise<Response> {
    const { method, headers, data } = opts;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      if (headers) {
        Object.entries(headers).forEach(([key, value]) => xhr.setRequestHeader(key, value));
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }
      xhr.withCredentials = true;
      xhr.responseType = 'json';

      xhr.onabort = () => reject(new Error('abort'));
      xhr.onerror = () => reject(new Error('netwrok error'));
      xhr.ontimeout = () => reject(new Error('timeout'));

      if (method === Method.Get || !data) {
        xhr.send();
      } else {
        xhr.send(data instanceof FormData ? data : JSON.stringify(data)); // TODO: ????????????????, ?????? ?????????????? ?????????? ????????????????
      }
    });
  }
}
