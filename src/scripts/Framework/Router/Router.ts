import { ComponentClass, Route, RouteClass } from "./Route";
import { ComponentList, ComponentProps } from "../types";
import { ErrorProps } from "../../Pages/Error/ErrorPage";

export class Router {
  private static __instance: Router;

  private routes: Route[] = [];
  private currentRoute: Route | null = null;
  private errorRoute: Route | null = null;

  constructor(
    private historyObject: History | null = null,
    private RouteClass: RouteClass = Route,
    private browserWindow: Window = window
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
    componentList: ComponentList[]
  ): this {
    const route = new this.RouteClass(pathname, block, props, componentList);
    this.routes.push(route);

    return this;
  }

  useOnError(
    block: ComponentClass,
    props: ComponentProps,
    componentList: ComponentList[]
  ): this {
    this.errorRoute = new this.RouteClass("", block, props, componentList);

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

        this._onRoute(target.location.pathname);
      }
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);

    if (route === this.currentRoute) return;

    if (!route) {
      if (this.currentRoute) this.currentRoute.leave();
      this.currentRoute = this.errorRoute;

      const errorProps: ErrorProps = {
        errorCode: "404",
        errorMessage: "Уупппс, ничего не найдено :(",
      };

      this.errorRoute?.render(errorProps);
      return;
    }

    if (this.currentRoute) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;
    route.render();
  }

  go(pathname: string): void {
    if (this.historyObject) {
      this.historyObject.pushState({}, "", pathname);
      this._onRoute(pathname);
    }
  }

  back(): void {
    if (this.historyObject) this.historyObject.back();
  }

  forward(): void {
    if (this.historyObject) this.historyObject.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
