/**
 * Шина-событий
 */
export class EventBus {
  /**
   * Все слушатели шины
   */
  private readonly listeners: {
    [key: string]: ((...args: unknown[]) => unknown)[];
  } = {};

  /**
   * Вызываем обработчик с переданными аргументами
   * @param {string} eventName
   * @param {unknows[]} args
   */
  emit(eventName: string, ...args: unknown[]): this {
    if (Array.isArray(this.listeners[eventName])) {
      this.listeners[eventName].forEach((cb) => {
        cb(...args);
      });
    }

    return this;
  }

  /**
   *
   * @param {string} eventName
   * @param {unknown[]} args
   */
  emitAsync(eventName: string, ...args: unknown[]): this {
    setTimeout(() => this.emit(eventName, ...args), 0);

    return this;
  }

  /**
   * Регистрируем событие в обработчике
   * @param {string} eventName
   * @param {Function} fn
   */
  on(eventName: string, fn: (...args: unknown[]) => unknown): this {
    if (this.listeners[eventName] === undefined) this.listeners[eventName] = [];

    const exist = this.listeners[eventName].find((el) => el === fn);
    if (!exist) this.listeners[eventName].push(fn);

    return this;
  }

  /**
   * Отписываемся от события
   * @param {string} eventName
   * @param {Function} fn
   */
  off(eventName: string, fn: (...args: unknown[]) => unknown): this {
    if (Array.isArray(this.listeners[eventName])) {
      this.listeners[eventName] = this.listeners[eventName].filter((cb) => cb !== fn);
    }

    return this;
  }
}
