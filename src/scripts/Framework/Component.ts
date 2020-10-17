import { Tree } from './DataStruct/Tree';
import { StringTemplator } from './Templator/Templator';
import { ComponentProps, IComponent, ComponentList } from './types';
import { EventBus } from './Utils/EventBus';
import { isObject } from './Utils/isObject';
import { Reconciliation } from './Reconciliation';

/**
 * Эвенты компонента
 */
// eslint-disable-next-line comma-dangle
const enum ComponentEvents {
  INIT = 'init',
  RENDER = 'flow:render',
  CDM = 'flow:component-did-mount',
  CDU = 'flow:component-did-update',
  CWU = 'flow:component-will-unmount',
}

/**
 * Базовый Компонент
 */
export class Component implements IComponent {
  private readonly eventBus: EventBus;

  private readonly _props: ComponentProps;

  private _parentElement: HTMLElement | Text | DocumentFragment | null;

  private _componentTree: Tree<HTMLElement | Text | DocumentFragment> | null;

  private readonly _componentList: ComponentList[];

  private _childrenComponents: Component[] = [];

  protected componentDelete = false;

  constructor(props: ComponentProps = {}, componentList: ComponentList[] = []) {
    this.eventBus = new EventBus();

    this._props = Component.proxyfyProps(props);
    this._componentList = componentList;

    this._parentElement = null;
    this._componentTree = null;

    this.registerEvents();
    this.eventBus.emit(ComponentEvents.INIT);
  }

  private registerEvents() {
    this.eventBus.on(ComponentEvents.INIT, this.init.bind(this));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.eventBus.on(ComponentEvents.RENDER, this._render.bind(this));
    this.eventBus.on(ComponentEvents.CDM, this._componentDidMount.bind(this));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.eventBus.on(ComponentEvents.CDU, this._componentDidUpdate.bind(this));
    this.eventBus.on(ComponentEvents.CWU, this._componentWillUnmount.bind(this));
  }

  private init(): void {
    this.eventBus.emit(ComponentEvents.RENDER);
    this.eventBus.emitAsync(ComponentEvents.CDM);
  }

  private _componentDidMount(): void {
    this.componentDidMount(this.props);
  }

  // eslint-disable-next-line no-unused-vars
  public componentDidMount(props: ComponentProps): void {
    // user realisation in nested classes
  }

  private _componentDidUpdate(oldProps: ComponentProps, newProps: ComponentProps): void {
    this.componentDidUpdate(oldProps, newProps);
  }

  // eslint-disable-next-line no-unused-vars
  public componentDidUpdate(oldProps: ComponentProps, newProps: ComponentProps): void {
    // user realisation in nested classes
  }

  private _componentWillUnmount(): void {
    this.componentDelete = true;

    this._childrenComponents.forEach((comp) => {
      if (comp._componentWillUnmount) comp._componentWillUnmount();
    });
    this.componentWillUnmount(this._props);
  }

  // eslint-disable-next-line no-unused-vars
  public componentWillUnmount(props: ComponentProps): void {
    // user realisation in nested classes
  }

  private _componentWillUpdate(oldProps: ComponentProps, newProps: ComponentProps): void {
    const update = this.componentWillUpdate(oldProps, newProps);

    if (update) {
      Object.assign(this.props, newProps);

      this.eventBus.emit(ComponentEvents.RENDER, true);
      this.eventBus.emitAsync(ComponentEvents.CDU, oldProps, newProps);
    } else {
      console.log(`-------------------> sss`);
    }
  }

  // eslint-disable-next-line no-unused-vars
  public componentWillUpdate(oldProps: ComponentProps, newProps: ComponentProps): boolean {
    return true;
  }

  protected get props(): ComponentProps {
    return this._props;
  }

  protected get componentList(): ComponentList[] {
    return this._componentList;
  }

  public getComponent(): ComponentList[] {
    return this.componentList;
  }

  /**
   * Меняем пропсы компоненту
   * @param {ComponentProps} newProps
   */
  public setProps(newProps: ComponentProps): void {
    if (!newProps || !isObject(newProps)) return;

    this._componentWillUpdate(this.props, newProps);
  }

  public getTree(): Tree<HTMLElement | Text | DocumentFragment> {
    if (this._componentTree === null) throw Error('Component tree is null');
    return this._componentTree;
  }

  protected _render(isUpdate = false): Tree<HTMLElement | Text | DocumentFragment> {
    /**
     * Если же произошло обновление дерева, скажем потомкам, что они будут демонтированны
     */
    if (isUpdate)
      this._childrenComponents.forEach((comp) => {
        if (comp._componentWillUnmount) {
          comp._componentWillUnmount();
        }
      });

    const { tree: componentTree, childrenComponents } = new StringTemplator(
      this.render(),
      this.componentList,
    ).compile(this.props);

    if (!componentTree) throw Error('Component tree did not get');

    // First Render
    if (!this._componentTree) {
      this._componentTree = componentTree;

      this._parentElement = Tree.getParent<HTMLElement | Text | DocumentFragment>(
        this._componentTree,
      ).value;
    } else {
      new Reconciliation(this._componentTree, componentTree).init();
    }

    this._childrenComponents = childrenComponents as Component[];
    return this._componentTree;
  }

  public detachComponent(): void {
    this.eventBus.emit(ComponentEvents.CWU);

    const parentComponent = this._parentElement?.parentElement;
    if (parentComponent && this._parentElement !== null) {
      parentComponent.removeChild(this._parentElement);
    }
  }

  /**
   * Метод, который необходимо реализовать в классе наследнике
   */
  public render(): string {
    throw Error('method do not implement');
  }

  /**
   * Проксируем пропсы компонента
   * @param {ComponentProps} props
   */
  private static proxyfyProps(props: ComponentProps): ComponentProps {
    return new Proxy(props, {
      set: (target: ComponentProps, property: string, value: unknown) => {
        target[property] = value;
        return true;
      },
    });
  }
}
