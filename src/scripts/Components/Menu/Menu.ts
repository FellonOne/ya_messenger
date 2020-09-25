import { Component } from "../../Framework/Component";
import { ModelMenu } from "../../Models/LeftMenu/ModelModel";
import { ComponentList } from "../../Framework/types";

export type MenuProps = {
  menuList?: { url: string; text: string }[];
  userName?: string;
  userSurname?: string;
  logoutUrl?: string;
  closeButtonContent?: string;
};

export class Menu extends Component {
  public static defaultProps: MenuProps;
  private _menu: ModelMenu | null = null;

  constructor(props: MenuProps, componentList: ComponentList[]) {
    super(Object.assign(Menu.defaultProps, props), componentList);
  }

  componentDidMount(props: MenuProps) {
    this.initializeMenu();
  }

  initializeMenu(): void {
    this._menu = new ModelMenu(
      "contacts-controls__menu",
      "backdrop",
      "left-menu",
      "close-button"
    );
    this._menu.init();
  }

  componentWillUpdate(oldProps: MenuProps, newProps: MenuProps): boolean {
    if (this._menu) {
      this._menu.destroy();
      this.initializeMenu();
    }
    return true;
  }

  render(): string {
    return `
      <nav class="left-menu">
        <Button
          classNames="left-menu__close-button close-button"
          textContent="**closeButtonContent**"
        /> 
        
        <header class="left-menu__account account">
          <div class="account__container">
            <div class="account__avatar-menu"></div>
            <div class="account__name-block">
              <span>{{ userName }}</span>
              <span>{{ userSurname }}</span>
            </div>
          </div>
        </header>
    
        <section class="left-menu__navigation">
          <ul class="messenger-navigation">
            <ItemList
              menuList="**menuList**" 
            />
          </ul>
    
          <footer class="left-menu__footer">
            <a href="{{ logoutUrl }}">Выйти</a> 
          </footer>
        </section>
      </nav>
    
      <div class="backdrop"></div>
    `;
  }
}

Menu.defaultProps = {
  logoutUrl: "#",
  menuList: [],
  userName: "",
  userSurname: "",
  closeButtonContent: `<i class="fa fa-times"></i>`,
};
