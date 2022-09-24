import Block from '../components/common/block';
import { render } from '../utils/render';

export interface RouteProps {
  rootQuery: string;
}

export default class Route {
  _pathname: string;

  _blockClass: any;

  _block: Block<unknown> | null;

  _props: RouteProps;

  constructor(pathname: string, view: unknown, props: RouteProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
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
      this._block = new this._blockClass();
    }
    render(this._props.rootQuery, this._block);
  }
}
