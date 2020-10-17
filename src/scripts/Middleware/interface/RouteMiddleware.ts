export type RouteMiddlewareResult = {
  state: boolean;
  route: string;
};

export interface BaseRouteMiddleware {
  process(): Promise<RouteMiddlewareResult>;
}
