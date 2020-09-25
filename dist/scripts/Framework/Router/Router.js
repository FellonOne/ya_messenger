import { Route } from "./Route.js";
export class Router {
    constructor(historyObject = null, RouteClass = Route, browserWindow = window) {
        this.historyObject = historyObject;
        this.RouteClass = RouteClass;
        this.browserWindow = browserWindow;
        this.routes = [];
        this.currentRoute = null;
        this.errorRoute = null;
        if (Router.__instance) {
            return Router.__instance;
        }
        Router.__instance = this;
    }
    use(pathname, block, props = {}, componentList) {
        const route = new this.RouteClass(pathname, block, props, componentList);
        this.routes.push(route);
        return this;
    }
    useOnError(block, props, componentList) {
        this.errorRoute = new this.RouteClass("", block, props, componentList);
        return this;
    }
    start() {
        // На смену роута вызываем перерисовку
        this.browserWindow.onpopstate = (event) => {
            if (event.currentTarget) {
                const target = event.currentTarget;
                this._onRoute(target.location.pathname);
            }
        };
        this._onRoute(window.location.pathname);
    }
    _onRoute(pathname) {
        var _a;
        const route = this.getRoute(pathname);
        if (route === this.currentRoute)
            return;
        if (!route) {
            if (this.currentRoute)
                this.currentRoute.leave();
            this.currentRoute = this.errorRoute;
            const errorProps = {
                errorCode: "404",
                errorMessage: "Уупппс, ничего не найдено :(",
            };
            (_a = this.errorRoute) === null || _a === void 0 ? void 0 : _a.render(errorProps);
            return;
        }
        if (this.currentRoute) {
            this.currentRoute.leave();
        }
        this.currentRoute = route;
        route.render();
    }
    go(pathname) {
        if (this.historyObject) {
            this.historyObject.pushState({}, "", pathname);
            this._onRoute(pathname);
        }
    }
    back() {
        if (this.historyObject)
            this.historyObject.back();
    }
    forward() {
        if (this.historyObject)
            this.historyObject.forward();
    }
    getRoute(pathname) {
        return this.routes.find((route) => route.match(pathname));
    }
}
//# sourceMappingURL=Router.js.map