// Демонстрация верстки левого меню мессенджера!
export class ModelMenu {
    constructor(menuButtonClass, backdropClass, navClass, closeButtonClass) {
        this.classes = {
            menuButtonClass,
            backdropClass,
            navClass,
            closeButtonClass,
        };
        this.menuButton = document.querySelector(`.${menuButtonClass}`);
        this.backdrop = document.querySelector(`.${backdropClass}`);
        this.nav = document.querySelector(`.${navClass}`);
        this.closeButton = document.querySelector(`.${closeButtonClass}`);
        if (!this.menuButton || !this.backdrop || !this.nav || !this.closeButton)
            throw { message: "nav or closeButton do not exist" };
        this.closeNavAndButton = this.closeNavAndButton.bind(this);
        this.openNavAndButton = this.openNavAndButton.bind(this);
    }
    init() {
        this.addListener(this.closeButton, "click", this.closeNavAndButton);
        this.addListener(this.backdrop, "click", this.closeNavAndButton);
        this.addListener(this.menuButton, "click", this.openNavAndButton);
    }
    destroy() {
        var _a, _b, _c;
        (_a = this.closeButton) === null || _a === void 0 ? void 0 : _a.removeEventListener("click", this.closeNavAndButton);
        (_b = this.backdrop) === null || _b === void 0 ? void 0 : _b.removeEventListener("click", this.closeNavAndButton);
        (_c = this.menuButton) === null || _c === void 0 ? void 0 : _c.removeEventListener("click", this.openNavAndButton);
    }
    addListener(element, type, fn) {
        element.addEventListener("click", fn);
    }
    closeNavAndButton() {
        var _a, _b, _c;
        (_a = this.nav) === null || _a === void 0 ? void 0 : _a.classList.remove(`${this.classes.navClass}_open`);
        (_b = this.backdrop) === null || _b === void 0 ? void 0 : _b.classList.remove(`${this.classes.backdropClass}_open`);
        (_c = this.closeButton) === null || _c === void 0 ? void 0 : _c.classList.remove(`${this.classes.closeButtonClass}_open`);
    }
    openNavAndButton() {
        var _a, _b, _c;
        (_a = this.nav) === null || _a === void 0 ? void 0 : _a.classList.add(`${this.classes.navClass}_open`);
        (_b = this.backdrop) === null || _b === void 0 ? void 0 : _b.classList.add(`${this.classes.backdropClass}_open`);
        (_c = this.closeButton) === null || _c === void 0 ? void 0 : _c.classList.add(`${this.classes.closeButtonClass}_open`);
    }
}
export const menuConfig = {
    menuButtonClass: "contacts-controls__menu",
    backdropClass: "backdrop",
    navClass: "left-menu",
    closeButtonClass: "left-menu__close-button",
};
//# sourceMappingURL=ModelModel.js.map