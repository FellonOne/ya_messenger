// Демонстрация верстки левого меню мессенджера!
export class Menu {
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

    if (!this.menuButton || !this.backdrop)
      throw { message: "nav or closeButton do not exist" };

    this.closeNavAndButton = this.closeNavAndButton.bind(this);
    this.openNavAndButton = this.openNavAndButton.bind(this);
  }

  init() {
    this.addListener(this.closeButton, "click", this.closeNavAndButton);
    this.addListener(this.backdrop, "click", this.closeNavAndButton);
    this.addListener(this.menuButton, "click", this.openNavAndButton);
  }

  addListener(element, type, fn) {
    element.addEventListener(type, fn);
  }

  closeNavAndButton() {
    this.nav.classList.remove(`${this.classes.navClass}_open`);
    this.backdrop.classList.remove(`${this.classes.backdropClass}_open`);
    this.closeButton.classList.remove(`${this.classes.closeButtonClass}_open`);
  }

  openNavAndButton() {
    console.log(this.nav);
    this.nav.classList.add(`${this.classes.navClass}_open`);
    this.backdrop.classList.add(`${this.classes.backdropClass}_open`);
    this.closeButton.classList.add(`${this.classes.closeButtonClass}_open`);
  }
}

export const menuConfig = {
  menuButtonClass: "contacts-controls__menu",
  backdropClass: "backdrop",
  navClass: "left-menu",
  closeButtonClass: "left-menu__close-button",
}

