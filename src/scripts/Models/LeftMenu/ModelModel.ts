// Демонстрация верстки левого меню мессенджера!
export class ModelMenu {
  private classes: {
    menuButtonClass: string;
    backdropClass: string;
    navClass: string;
    closeButtonClass: string;
  };
  private readonly menuButton: HTMLElement | null;
  private readonly backdrop: HTMLFormElement | null;
  private readonly nav: HTMLFormElement | null;
  private readonly closeButton: HTMLFormElement | null;

  constructor(
    menuButtonClass: string,
    backdropClass: string,
    navClass: string,
    closeButtonClass: string
  ) {
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
    this.addListener(
      this.closeButton as HTMLElement,
      "click",
      this.closeNavAndButton
    );
    this.addListener(
      this.backdrop as HTMLElement,
      "click",
      this.closeNavAndButton
    );
    this.addListener(
      this.menuButton as HTMLElement,
      "click",
      this.openNavAndButton
    );
  }

  destroy(): void {
    this.closeButton?.removeEventListener("click", this.closeNavAndButton);
    this.backdrop?.removeEventListener("click", this.closeNavAndButton);
    this.menuButton?.removeEventListener("click", this.openNavAndButton);
  }

  addListener(element: HTMLElement, type: string, fn: () => void) {
    element.addEventListener("click", fn);
  }

  closeNavAndButton(): void {
    this.nav?.classList.remove(`${this.classes.navClass}_open`);
    this.backdrop?.classList.remove(`${this.classes.backdropClass}_open`);
    this.closeButton?.classList.remove(`${this.classes.closeButtonClass}_open`);
  }

  openNavAndButton(): void {
    this.nav?.classList.add(`${this.classes.navClass}_open`);
    this.backdrop?.classList.add(`${this.classes.backdropClass}_open`);
    this.closeButton?.classList.add(`${this.classes.closeButtonClass}_open`);
  }
}

export const menuConfig = {
  menuButtonClass: "contacts-controls__menu",
  backdropClass: "backdrop",
  navClass: "left-menu",
  closeButtonClass: "left-menu__close-button",
};
