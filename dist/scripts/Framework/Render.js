export class Render {
    constructor(rootElement = null) {
        this.rootElement = rootElement;
        this.rootId = "root";
    }
    /**
     * Выбираем рутовый элемент
     */
    init() {
        if (this.rootElement === null)
            this.rootElement = document.querySelector(`#${this.rootId}`);
        return this;
    }
    /**
     * Удаляем всех потомков у рутового элемента
     */
    removeChildrenInRoot() {
        var _a;
        if (this.rootElement === null)
            throw Error(`ROOT element is null; check correct id name`);
        while ((_a = this.rootElement) === null || _a === void 0 ? void 0 : _a.firstChild) {
            this.rootElement.removeChild(this.rootElement.firstChild);
        }
    }
    /**
     * Устанавливаем страницу в рутовый HTML элемент
     * @param Page
     */
    add(Page) {
        var _a;
        this.removeChildrenInRoot();
        (_a = this.rootElement) === null || _a === void 0 ? void 0 : _a.appendChild(Page.getTree().value);
    }
}
//# sourceMappingURL=Render.js.map