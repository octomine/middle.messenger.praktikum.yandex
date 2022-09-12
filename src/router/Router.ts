import Route from "./Route";

class Router {
  routes: Array<Route>;
  history: History;
  _currentRoute: Route | null;

  constructor() {
    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
  }

  use(pathname: string, block: unknown) {
    const route = new Route(pathname, block, { rootQuery: 'main' });
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (evt) => {
      this._onRoute(evt.currentTarget.location.pathname);
    }

    this._onRoute(window.location.pathname);
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    this._currentRoute.render();
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname))
  }
}

export default new Router();
