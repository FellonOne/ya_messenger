import { Tree } from "./DataStruct/Tree.js";
import { StringTemplator } from "./Templator/Templator.js";
import { EventBus } from "./Utils/EventBus.js";
import { isObject } from "./Utils/isObject.js";
import { Reconciliation } from "./Reconciliation.js";
/**
 * Базовый Компонент
 */
export class Component {
    constructor(props = {}, componentList = []) {
        this.eventBus = new EventBus();
        this._props = this.proxyfyProps(props);
        this._componentList = componentList;
        this._parentElement = null;
        this._componentTree = null;
        this.registerEvents();
        this.eventBus.emit("init" /* INIT */);
    }
    registerEvents() {
        this.eventBus.on("init" /* INIT */, this.init.bind(this));
        this.eventBus.on("flow:render" /* RENDER */, this._render.bind(this));
        this.eventBus.on("flow:component-did-mount" /* CDM */, this._componentDidMount.bind(this));
        this.eventBus.on("flow:component-did-update" /* CDU */, this._componentDidUpdate.bind(this));
        this.eventBus.on("flow:component-will-unmount" /* CWU */, this._componentWillUnmount.bind(this));
    }
    init() {
        this.eventBus.emit("flow:render" /* RENDER */);
        this.eventBus.emitAsync("flow:component-did-mount" /* CDM */);
    }
    _componentDidMount() {
        this.componentDidMount(this.props);
    }
    componentDidMount(props) { }
    _componentDidUpdate(oldProps, newProps) {
        this.componentDidUpdate(oldProps, newProps);
    }
    componentDidUpdate(oldProps, newProps) { }
    _componentWillUnmount() {
        this.componentWillUnmount(this._props);
    }
    componentWillUnmount(props) { }
    _componentWillUpdate(oldProps, newProps) {
        const update = this.componentWillUpdate(oldProps, newProps);
        if (update) {
            Object.assign(this.props, newProps);
            this.eventBus.emit("flow:render" /* RENDER */);
            this.eventBus.emitAsync("flow:component-did-update" /* CDU */, oldProps, newProps);
        }
    }
    componentWillUpdate(oldProps, newProps) {
        return true;
    }
    get props() {
        return this._props;
    }
    get componentList() {
        return this._componentList;
    }
    getComponent() {
        return this.componentList;
    }
    /**
     * Меняем пропсы компоненту
     * @param {ComponentProps} newProps
     */
    setProps(newProps) {
        if (!newProps || !isObject(newProps))
            return;
        this._componentWillUpdate(this.props, newProps);
    }
    getTree() {
        if (this._componentTree === null)
            throw Error("Component tree is null");
        return this._componentTree;
    }
    _render() {
        const componentTree = new StringTemplator(this.render(), this.componentList).compile(this.props);
        if (!componentTree)
            throw Error("Component tree did not get");
        // First Render
        if (!this._componentTree) {
            this._componentTree = componentTree;
            this._parentElement = Tree.getParent(this._componentTree).value;
        }
        else {
            new Reconciliation(this._componentTree, componentTree).init();
        }
        return this._componentTree;
    }
    detachComponent() {
        var _a;
        this.eventBus.emit("flow:component-will-unmount" /* CWU */);
        const parentComponent = (_a = this._parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
        if (parentComponent && this._parentElement !== null) {
            parentComponent.removeChild(this._parentElement);
        }
    }
    /**
     * Метод, который необходимо реализовать в классе наследнике
     */
    render() {
        throw Error("method do not implement");
    }
    /**
     * Проксируем пропсы компонента
     * @param {ComponentProps} props
     */
    proxyfyProps(props) {
        return new Proxy(props, {
            set: (target, property, value) => {
                target[property] = value;
                return true;
            },
        });
    }
}
//# sourceMappingURL=Component.js.map