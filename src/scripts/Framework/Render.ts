import { Component } from "./Component";

export class Render {
  private readonly rootId = "root";

  constructor(private rootElement: HTMLElement | null = null) {}

  /**
   * Выбираем рутовый элемент
   */
  init(): this {
    if (this.rootElement === null)
      this.rootElement = document.querySelector(`#${this.rootId}`);
    return this;
  }

  /**
   * Удаляем всех потомков у рутового элемента
   */
  private removeChildrenInRoot() {
    if (this.rootElement === null)
      throw Error(`ROOT element is null; check correct id name`);

    while (this.rootElement?.firstChild) {
      this.rootElement.removeChild(this.rootElement.firstChild);
    }
  }

  /**
   * Устанавливаем страницу в рутовый HTML элемент
   * @param Page
   */
  add(Page: Component): void {
    this.removeChildrenInRoot();
    this.rootElement?.appendChild(Page.getTree().value);
  }
}
