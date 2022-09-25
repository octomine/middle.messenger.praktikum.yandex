import Route from './Route';

class Router {
  routes: Array<Route> = [];

  history: History;

  _currentRoute: Route | null = null;

  _notFoundRoute: Route | null = null;

  constructor() {
    this.history = window.history;
  }

  get pathname(): string {
    return window.location.pathname;
  }

  use(pathname: string, block: unknown) {
    const route = new Route(pathname, block, { rootQuery: 'main' });
    this.routes.push(route);
    return this;
  }

  notFound(block: unknown) {
    this._notFoundRoute = new Route('', block, { rootQuery: 'main' });
    return this;
  }

  start() {
    window.onpopstate = (evt) => {
      this._onRoute(evt.currentTarget.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  _onRoute(pathname: string) {
    let route = this.getRoute(pathname);
    if (!route) {
      if (!this._notFoundRoute) {
        return;
      }
      route = this._notFoundRoute;
    }

    this._currentRoute = route;
    this._currentRoute.render();
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default new Router();
