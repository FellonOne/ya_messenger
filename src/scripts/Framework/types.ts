import { Tree } from "./DataStruct/Tree";
import { ComponentClass } from "./Router/Route";

export type ComponentList = { name: string; value: ComponentClass };
export type ComponentProps = {
  [key: string]: unknown;
};

export interface IComponent {
  getComponent(): ComponentList[];
  /**
   * Меняем пропсы компоненту
   * @param {ComponentProps} newProps
   */
  setProps(newProps: ComponentProps): void;

  getTree(): Tree<HTMLElement | Text | DocumentFragment>;

  /**
   * Метод, который необходимо реализовать в классе наследнике
   */
  render(): string;
}
