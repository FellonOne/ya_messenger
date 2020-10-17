import { ComponentClass, Route, RouteClass } from './Route';
import { ComponentList, ComponentProps } from '../types';
import { ErrorProps } from '../../Pages/Error/ErrorPage';
import { BaseRouteMiddleware } from '../../Middleware/interface/RouteMiddleware';
import { isEmpty } from '../Utils/isEmpty';
import { Trim } from '../Utils/Trim';
import { Get } from '../Utils/Get';

type ParamsObject = { [key: string]: unknown };

export class Router {
  private static __instance: Router;

  private routes: Route[] = [];
  private currentRoute: Route | null = null;
  private errorRoute: Route | null = null;
  private prevPathName = '';

  constructor(
    private historyObject: History | null = null,
    private RouteClass: RouteClass = Route,
    private browserWindow: Window = window,
  ) {
    if (Router.__instance) {
      return Router.__instance;
    }

    Router.__instance = this;
  }

  use(
    pathname: string,
    block: ComponentClass,
    props: ComponentProps = {},
    componentList: ComponentList[],
    middlewares: BaseRouteMiddleware[] = [],
  ): this {
    const route = new this.RouteClass(pathname, block, props, componentList, middlewares);
    this.routes.push(route);

    return this;
  }

  useOnError(
    block: ComponentClass,
    props: ComponentProps,
    componentList: ComponentList[],
    middlewares: BaseRouteMiddleware[] = [],
  ): this {
    this.errorRoute = new this.RouteClass('', block, props, componentList, middlewares);

    return this;
  }

  start(): void {
    // На смену роута вызываем перерисовку
    this.browserWindow.onpopstate = (event: Event) => {
      if (event.currentTarget) {
        const target = (event.currentTarget as unknown) as {
          location: {
            pathname: string;
          };
        };

        this._onRoute(target.location.pathname).catch(console.log);
      }
    };

    let params: ParamsObject = {};
    const route = this.getRoute(window.location.pathname);

    if (route && this.patternExist(route?.getPathname() ?? '')) {
      params = this.getParamsFromPathname(window.location.pathname, route.getPathname()) ?? {};
    }

    this._onRoute(window.location.pathname, params).catch(console.log);
  }

  renderNotFoundRoute(): void {
    if (this.currentRoute) this.currentRoute.leave();
    this.currentRoute = this.errorRoute;

    const errorProps: ErrorProps = {
      errorCode: '404',
      errorMessage: 'Уупппс, ничего не найдено :(',
    };

    this.errorRoute?.render(errorProps);
    this.historyObject?.pushState({}, '', '/404');
    return;
  }

  async _onRoute(pathname: string, params: ParamsObject = {}): Promise<void> {
    let route = this.getRoute(pathname);

    if (!route) return this.renderNotFoundRoute();

    const middlewareResult = await route.checkMiddleware();
    if (!middlewareResult.state) {
      const errorRoute = this.getRoute(middlewareResult.redirectUrl);

      if (!errorRoute) return this.renderNotFoundRoute();
      route = errorRoute;

      this.historyObject?.pushState({}, '', middlewareResult.redirectUrl);
    }

    if (route === this.currentRoute && pathname === this.prevPathName) {
      return;
    }
    if (this.currentRoute) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;
    this.prevPathName = pathname;

    route.render(params);
  }

  go(pathname: string, params: ParamsObject = {}): void {
    if (this.patternExist(pathname)) {
      if (isEmpty(params)) throw Error(`empty props, but required => ${pathname}`);

      pathname = this.matchPathnameWithParams(pathname, params);
    }

    if (this.historyObject) {
      this.historyObject.pushState({}, '', pathname);
      this._onRoute(pathname, params).catch(console.log);
    }
  }

  protected matchPathnameWithParams(pathname: string, params: ParamsObject): string {
    const result = pathname.match(/{:([\w])*}/gm);
    if (result === null) return pathname;

    result.forEach((pattern) => {
      const name = Trim(pattern, '{}: ');
      const value = String(Get(params, name));

      pathname = pathname.replace(pattern, value);
    });

    return pathname;
  }

  protected getParamsFromPathname(
    pathnameWithParam: string,
    matchPathname: string,
  ): ParamsObject | null {
    const splitPathnameWithParam = pathnameWithParam.split('/');
    const splitMatchPathname = matchPathname.split('/');

    const res: ParamsObject = {};
    if (splitPathnameWithParam.length !== splitMatchPathname.length) return null;

    for (let i = 0; i < splitPathnameWithParam.length; i += 1) {
      if (this.patternExist(splitMatchPathname[i])) {
        const name = Trim(splitMatchPathname[i], `{}:' `);

        res[name] = splitPathnameWithParam[i];
      }
    }

    return res;
  }

  protected patternExist(pathname: string): boolean {
    const res = pathname.match(/{:([\w])*}/);
    return res !== null && res.length > 0;
  }

  back(): void {
    if (this.historyObject) this.historyObject.back();
  }

  forward(): void {
    if (this.historyObject) this.historyObject.forward();
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }
}
