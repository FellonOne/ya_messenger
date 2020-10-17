import { isEqual } from '../Utils/isEqual';
import { ComponentList, ComponentProps } from '../types';
import { Component } from '../Component';
import { Render } from '../Render';
import { BaseRouteMiddleware } from '../../Middleware/interface/RouteMiddleware';

export type ComponentClass = new (
  props: ComponentProps,
  componentList: ComponentList[],
) => Component;

export type RouteClass = new (
  pathName: string,
  componentClass: ComponentClass,
  props: ComponentProps,
  componentList: ComponentList[],
  middlewares: BaseRouteMiddleware[],
) => Route;

type CheckMiddlewareResult = {
  state: boolean;
  redirectUrl: string;
};

export class Route {
  private _block: Component | null;

  constructor(
    private pathname: string,
    private componentClass: ComponentClass,
    private props: ComponentProps,
    private componentList: ComponentList[],
    private middlewares: BaseRouteMiddleware[],
  ) {
    this._block = null;
  }

  public getPathname(): string {
    return this.pathname;
  }

  public leave(): void {
    if (this._block) {
      this._block.detachComponent();
      this._block = null;
    }
  }

  public match(pathname: string): boolean {
    const findPattern = this.pathname.match(/{:([\w])*}/);

    if (findPattern === null || findPattern.length === 0) return isEqual(pathname, this.pathname);
    else {
      const splitPathName = pathname.split('/');
      const splitRoutePathName = this.pathname.split('/');

      if (splitPathName.length !== splitRoutePathName.length) return false;
      for (let i = 0; i < splitRoutePathName.length; i += 1) {
        const routePathNameMatch = splitRoutePathName[i].match(/{:([\w])*}/);
        if (routePathNameMatch === null || routePathNameMatch.length === 0) {
          if (splitRoutePathName[i].trim() !== splitPathName[i].trim()) return false;
        }
      }

      return true;
    }
  }

  public async checkMiddleware(): Promise<CheckMiddlewareResult> {
    for (const middleware of this.middlewares) {
      const res = await middleware.process();

      if (!res.state)
        return {
          state: res.state,
          redirectUrl: res.route,
        };
    }

    return {
      state: true,
      redirectUrl: '',
    };
  }

  public render(customProps: ComponentProps = {}): void {
    if (!this._block) {
      this._block = new this.componentClass(
        {
          ...this.props,
          ...customProps,
        },
        this.componentList,
      );
    }

    new Render().init().add(this._block);
  }
}
