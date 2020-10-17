import { Component } from '../../Framework/Component';
import { ModelMenu } from '../../Models/LeftMenu/ModelModel';
import { ComponentList } from '../../Framework/types';
import { pagesRoutes } from '../../pages';
import { isEmpty } from '../../Framework/Utils/isEmpty';
import { GetRandomString } from '../../Framework/Utils/RandomString';
import { AuthorizationService } from '../../Services/AuthorizationService';

export type MenuProps = {
  menuList?: { url: string; text: string }[];
  userName?: string;
  userSurname?: string;
  logoutUrl?: string;
  userAvatar?: string;
  closeButtonContent?: string;
};

export class Menu extends Component {
  public static defaultProps: MenuProps;

  private readonly _id: string;
  private _menu: ModelMenu | null = null;

  constructor(props: MenuProps, componentList: ComponentList[]) {
    super(
      {
        ...Menu.defaultProps,
        ...props,
      },
      componentList,
    );

    this._id = GetRandomString();
  }

  /**
   * Компонент успешно установлен в DOM
   */
  componentDidMount(): void {
    this.initializeMenu();
  }

  /**
   * Компонент будет обновлен (в DOM)
   */
  componentWillUpdate(): boolean {
    if (this._menu) {
      this._menu.destroy();
    }
    return true;
  }

  componentDidUpdate(): void {
    if (this._menu) this._menu.destroy();
    this.initializeMenu();
  }

  /**
   * Компонент будет удален из DOM
   */
  componentWillUnmount(): void {
    if (this._menu) this._menu.destroy();
  }

  initializeMenu(): void {
    this._menu = new ModelMenu('contacts-controls__menu', 'backdrop', 'left-menu', 'close-button');
    this._menu.init();
  }

  render(): string {
    let { userAvatar, userName, userSurname } = this.props as MenuProps;

    const userData = AuthorizationService.getUser();
    if (userData) {
      userAvatar = userData.avatar;

      userName = isEmpty(userName) ? '[Укажите имя]' : userName;
      userSurname = isEmpty(userSurname) ? '[Укажите фамилию]' : userSurname;
    }

    let userAvatarBlock = `<div class="account__avatar-menu"></div>`;
    if (userAvatar && !isEmpty(userAvatar)) {
      userAvatarBlock = `<div 
                  class="account__avatar-menu" 
                  style="background-image: url('https://ya-praktikum.tech${userAvatar}')"
                 ></div>`;
    }
    return ` 
      <nav class="left-menu">
        <Button
          classNames="left-menu__close-button close-button"
          textContent="**closeButtonContent**"
        /> 
        
        <header class="left-menu__account account">
          <div class="account__container">
            ${userAvatarBlock}
            <div class="account__name-block">
              <span>${userName}</span>
              <span>${userSurname}</span>
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
            <RouterComponent
              linkText="Выйти"
              page="{{ logoutUrl }}"
            />
          </footer>
        </section>
      </nav>
    
      <div class="backdrop"></div>
    `;
  }
}

Menu.defaultProps = {
  logoutUrl: pagesRoutes.LOGOUT,
  menuList: [],
  userName: '',
  userSurname: '',
  userAvatar: '',
  closeButtonContent: `<i class="fa fa-times"></i>`,
};
