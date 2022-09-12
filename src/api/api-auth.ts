import { APIBase } from "./api-base";
import { HTTP } from "../services/network";

const inst = new HTTP('/auth');

export class APIAuth extends APIBase {
  signin(data: string) {
    return inst.post('/signin', { data, headers: { 'content-type': 'application/json' } });
  }
}
