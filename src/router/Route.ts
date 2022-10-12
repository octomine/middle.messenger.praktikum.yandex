import Block from '@components/common/block';
import { render } from '../utils';

export interface BlcokConstructable<P extends Record<string, any> = any> {
  new(props: P): Block<P>;
}

export interface RouteProps {
  rootQuery: string;
}

export default class Route {
  private _pathname: string;

  private _blockClass: BlcokConstructable;

  private _block: Block | null;

  private _props: RouteProps;

  constructor(pathname: string, view: BlcokConstructable, props: RouteProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  leave(): void {
    this._block = null;
  }

  match(pathname: string): boolean {
    return pathname === this._pathname;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass({});
      render(this._props.rootQuery, this._block!);
    }
  }
}
