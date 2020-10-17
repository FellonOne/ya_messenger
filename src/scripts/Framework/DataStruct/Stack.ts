type StackNode<T> = {
  next: StackNode<T> | null;
  prev: StackNode<T> | null;
  value: T;
};

/**
 * Реализация стека
 */
export class Stack<T> {
  private tail: StackNode<T> | null;
  private _size: number;

  constructor() {
    this.tail = null;
    this._size = 0;
  }

  /**
   * Вставляем элемент в стек
   * @param {T} value
   * @return {T}
   */
  public push(value: T): number {
    const node: StackNode<T> = {
      value,
      next: null,
      prev: null,
    };

    if (this._size === 0) {
      this.tail = node;
    } else {
      if (this.tail !== null) this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }

    return ++this._size;
  }

  private isEmptyStack(): boolean {
    return this._size === 0;
  }

  /**
   * Снимает элемент со стека и возвращает его
   * @return {T}
   */
  public pop(): T {
    if (this.isEmptyStack() || this.tail === null) throw Error('stack is empty');
    const res = this.tail;

    this.tail = this.tail.prev;
    if (this.tail) this.tail.next = null;

    this._size -= 1;

    return res.value;
  }

  /**
   * Возвращает элемент со стека, не снимая его
   * @return {T}
   */
  public peek(): T {
    if (this.isEmptyStack() || this.tail === null) throw Error('stack is empty');

    return this.tail.value;
  }

  /**
   * Возвращает длину стека
   * @return {number}
   */
  public size(): number {
    return this._size;
  }
}
