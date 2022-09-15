import { APIBase } from './base';
import { HTTP } from '../services/network';

const inst = new HTTP('/auth');

export class APIAuth extends APIBase {
  request(url: string, data: string) {
    return inst.post(url, { data, headers: { 'content-type': 'application/json' } })
      .then(({ response }) => {
        if (response === 'OK') {
          return response;
        }
        const { reason } = JSON.parse(response);
        if (reason) {
          throw new Error(reason);
        }
        return response;
      });
  }

  get(url: string) {
    return inst.get(url)
      .then(({ response }) => {
        const resp = JSON.parse(response);
        const { reason } = resp;
        if (reason) {
          throw new Error(reason);
        };
        return resp;
      });
  }
}
