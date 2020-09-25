import { Component } from "../../Framework/Component.js";
import { ModelMenu } from "../../Models/LeftMenu/ModelModel.js";
export class Menu extends Component {
    constructor(props, componentList) {
        super(Object.assign(Menu.defaultProps, props), componentList);
        this._menu = null;
    }
    componentDidMount(props) {
        this.initializeMenu();
    }
    initializeMenu() {
        this._menu = new ModelMenu("contacts-controls__menu", "backdrop", "left-menu", "close-button");
        this._menu.init();
    }
    componentWillUpdate(oldProps, newProps) {
        if (this._menu) {
            this._menu.destroy();
            this.initializeMenu();
        }
        return true;
    }
    render() {
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
//# sourceMappingURL=Menu.js.map