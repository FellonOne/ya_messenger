import { isEqual } from "../Utils/isEqual";
import { ComponentList, ComponentProps } from "../types";
import { Component } from "../Component";
import { Render } from "../Render";

export type ComponentClass = new (
  props: ComponentProps,
  componentList: ComponentList[]
) => Component;

export type RouteClass = new (
  pathName: string,
  componentClass: ComponentClass,
  props: ComponentProps,
  componentList: ComponentList[]
) => Route;

export class Route {
  private _block: Component | null;

  constructor(
    private pathname: string,
    private componentClass: ComponentClass,
    private props: ComponentProps,
    private componentList: ComponentList[]
  ) {
    this._block = null;
  }

  leave() {
    if (this._block) {
      this._block.detachComponent();
      this._block = null;
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this.pathname);
  }

  public render(customProps: ComponentProps | null = null): void {
    if (!this._block) {
      this._block = new this.componentClass(
        customProps !== null ? customProps : this.props,
        this.componentList
      );
    }

    new Render().init().add(this._block);
  }
}
