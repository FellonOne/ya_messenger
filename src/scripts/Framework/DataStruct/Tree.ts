export class Tree<T> {
  private readonly _value: T;
  private _parent: Tree<T> | null;
  private _childrens: Tree<T>[];
  private readonly _fragmentChildrens: Tree<T>[];

  constructor(value: T) {
    this._value = value;
    this._parent = null;
    this._childrens = [];
    this._fragmentChildrens = [];
  }

  get value(): T {
    return this._value;
  }

  get childrens(): Tree<T>[] {
    return this._childrens;
  }

  set childrens(value: Tree<T>[]) {
    this._childrens = value;
  }

  get fragmentChildrens(): Tree<T>[] {
    return this._fragmentChildrens;
  }

  get parent(): Tree<T> | null {
    return this._parent;
  }

  set parent(val: Tree<T> | null) {
    this._parent = val;
  }

  setParent(parent: Tree<T>): void {
    this._parent = parent;
  }

  /**
   * Получаем родителя дерева
   * @param {Tree} tree
   */
  public static getParent<T>(tree: Tree<T>): Tree<T> {
    if (tree._parent === null) return tree;
    else return this.getParent(tree._parent);
  }
}
