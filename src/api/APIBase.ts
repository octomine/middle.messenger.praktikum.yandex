import { HTTPTransport } from '@services/network';

export default abstract class APIBase {
  protected http: HTTPTransport;

  protected constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint);
  }

  get endpoint(): string {
    return this.http.getEndpoint();
  }

  public abstract create?(data: unknown): Promise<unknown>;

  public abstract read?(identifier?: string): Promise<unknown>;

  public abstract update?(indeifier: string, data: unknown): Promise<unknown>;

  public abstract delete?(identifier: string): Promise<unknown>;
}
