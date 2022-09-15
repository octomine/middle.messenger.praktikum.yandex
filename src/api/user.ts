import { APIBase } from './base';
import { HTTP } from '../services/network';

const inst = new HTTP('/user');

export class APIUser extends APIBase {
  request(url: string, data: string) {
    return inst.put(url, { data, headers: { 'content-type': 'application/json' } })
      .then(({ response }) => {
        if (response === 'OK') {
          return response;
        }
        const resp = JSON.parse(response);
        const { reason } = resp;
        if (reason) {
          throw new Error(reason);
        }
        return resp;
      });
  }
}
