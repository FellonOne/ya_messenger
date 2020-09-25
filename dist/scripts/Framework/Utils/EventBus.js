/**
 * Шина-событий
 */
export class EventBus {
    constructor() {
        /**
         * Все слушатели шины
         */
        this.listeners = {};
    }
    /**
     * Вызываем обработчик с переданными аргументами
     * @param {string} eventName
     * @param {unknows[]} args
     */
    emit(eventName, ...args) {
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
    emitAsync(eventName, ...args) {
        setTimeout(() => this.emit(eventName, ...args), 0);
        return this;
    }
    /**
     * Регистрируем событие в обработчике
     * @param {string} eventName
     * @param {Function} fn
     */
    on(eventName, fn) {
        if (this.listeners[eventName] === undefined)
            this.listeners[eventName] = [];
        const exist = this.listeners[eventName].find((el) => el === fn);
        if (!exist)
            this.listeners[eventName].push(fn);
        return this;
    }
    /**
     * Отписываемся от события
     * @param {string} eventName
     * @param {Function} fn
     */
    off(eventName, fn) {
        if (Array.isArray(this.listeners[eventName])) {
            this.listeners[eventName] = this.listeners[eventName].filter((cb) => cb !== fn);
        }
        return this;
    }
}
//# sourceMappingURL=EventBus.js.map