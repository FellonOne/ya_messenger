import { Middleware } from './interface/Middleware';
import { BaseRouteMiddleware, RouteMiddlewareResult } from './interface/RouteMiddleware';
import { pagesRoutes } from '../pages';

export class RouteMiddleware implements BaseRouteMiddleware {
  private readonly middlewares: Middleware[] = [];
  private route: string;

  constructor() {
    this.route = pagesRoutes.NOT_FOUND;
  }

  public setRoute(route: string): this {
    this.route = route;
    return this;
  }

  public addMiddleware(middleware: Middleware): this {
    this.middlewares.push(middleware);
    return this;
  }

  public async process(): Promise<RouteMiddlewareResult> {
    for (const middleware of this.middlewares) {
      const res = await middleware.check();
      if (!res)
        return {
          state: res,
          route: this.route,
        };
    }

    return {
      state: true,
      route: '',
    };
  }
}
