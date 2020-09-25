import { isEqual } from "../Utils/isEqual.js";
import { Render } from "../Render.js";
export class Route {
    constructor(pathname, componentClass, props, componentList) {
        this.pathname = pathname;
        this.componentClass = componentClass;
        this.props = props;
        this.componentList = componentList;
        this._block = null;
    }
    leave() {
        if (this._block) {
            this._block.detachComponent();
            this._block = null;
        }
    }
    match(pathname) {
        return isEqual(pathname, this.pathname);
    }
    render(customProps = null) {
        if (!this._block) {
            this._block = new this.componentClass(customProps !== null ? customProps : this.props, this.componentList);
        }
        new Render().init().add(this._block);
    }
}
//# sourceMappingURL=Route.js.map