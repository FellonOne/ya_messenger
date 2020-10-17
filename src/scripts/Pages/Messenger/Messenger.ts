import { Component } from '../../Framework/Component';
import { MenuProps } from '../../Components/Menu/Menu';
import { ContactsListProps } from '../../Components/Messenger/ContactsList';
import { ComponentList } from '../../Framework/types';
import { pagesRoutes } from '../../pages';
import { AuthorizationService } from '../../Services/AuthorizationService';
import { router } from '../../router';
import { isEmpty } from '../../Framework/Utils/isEmpty';
import { getChatsList } from './Service/GetChatsList';
import { Chat, ChatService } from '../../Services/ChatService';
import { createChat } from './Service/CreateChat';
import { submitFormValidation } from '../Settings/Validation/SubmitFormValidation';

export type MessengerProps = {
  isLoadingContactsList?: boolean;
  menuData?: MenuProps;
  createChatButtonId?: string;
  createChatInputId?: string;
  contactsData?: ContactsListProps;
  chatId?: null | number | string;
  chatOpen?: boolean;
};

export class Messenger extends Component {
  public static defaultProps: MessengerProps;

  constructor(props: MessengerProps = {}, componentList: ComponentList[]) {
    super(
      {
        ...Messenger.defaultProps,
        ...props,
      },
      componentList,
    );

    this.onCreateChatClick = this.onCreateChatClick.bind(this);
  }

  componentDidMount(): void {
    Promise.all([this.updatePersonDataInMenu(), this.loadContacts()])
      .then(([userData, chats]) => {
        const menuData = (this.props as MessengerProps).menuData;
        this.setProps({
          menuData: {
            ...menuData,
            ...userData,
          },
          contactsData: {
            contactsList: chats,
          },
          isLoadingContactsList: false,
        });

        this.initCreateChatEvent();
      })
      .catch((error) => {
        console.log(`error in messenger => `, error);
      });
  }

  componentWillUpdate(): boolean {
    this.destroyCreateChatEvent();

    return true;
  }

  componentDidUpdate(): void {
    this.destroyCreateChatEvent();
    this.initCreateChatEvent();
  }

  componentWillUnmount(): void {
    this.destroyCreateChatEvent();
  }

  /**
   * Click events
   */
  initCreateChatEvent(): void {
    const chatButton = document.querySelector(`#${this.props.createChatButtonId}`);
    if (!chatButton) return;

    chatButton.addEventListener('click', this.onCreateChatClick);
  }

  destroyCreateChatEvent(): void {
    const chatButton = document.querySelector(`#${this.props.createChatButtonId}`);
    if (!chatButton) return;

    chatButton.removeEventListener('click', this.onCreateChatClick);
  }
  /**********************/

  loadContacts(): Promise<Chat[]> {
    return getChatsList().then((res) => {
      if (res) {
        return ChatService.getChats() ?? [];
      } else {
        return [];
      }
    });
  }

  updatePersonDataInMenu(): {
    userName: string;
    userSurname: string;
    userAvatar: string;
  } | null {
    const user = AuthorizationService.getUser();
    if (!user) router.go(pagesRoutes.LOGIN);

    const userName = isEmpty(user?.name) ? '[Укажите имя]' : user?.name;
    const userSurname = isEmpty(user?.surname) ? '[Укажите фамилию]' : user?.surname;
    const userAvatar = user?.avatar ?? '';

    if (!userName || !userSurname) return null;

    return {
      userName,
      userSurname,
      userAvatar,
    };
  }

  onCreateChatClick(): void {
    const input = document.querySelector(`#${this.props.createChatInputId}`) as HTMLInputElement;
    if (!input) return;

    const res = submitFormValidation({
      chatName: input.value,
    });
    if (res.hasError) {
      Object.keys(res.errors).forEach((key) => {
        alert(res.errors[key]);
      });

      return;
    }

    this.setProps({
      isLoadingContactsList: true,
    });

    createChat(input.value)
      .then((res) => {
        if (res) return getChatsList();
        return false;
      })
      .then((res) => {
        setTimeout(() => {
          if (res) {
            this.setProps({
              isLoadingContactsList: false,
              contactsData: {
                contactsList: ChatService.getChats(),
              },
            });
          } else {
            this.setProps({
              isLoadingContactsList: false,
            });
          }
        }, 10);
      });
  }

  render(): string {
    return `
      <Menu
        logoutUrl="**menuData.logoutUrl**"
        menuList="**menuData.menuList**"
        userName="**menuData.userName**"
        userSurname="**menuData.userSurname**"
        userAvatar="**menuData.userAvatar**"
      />
      <section class="left-aside">
        <ContactSearch />
         
        <div class="contacts">
          <ContactsList
            createChatId="{{ createChatButtonId }}"
            createChatInputId="{{ createChatInputId }}"
            contactsList="**contactsData.contactsList**"
            isLoading="{{ isLoadingContactsList }}"
          /> 
        </div>
      </section>
      
      <Conversation />
    `;
  }
}

Messenger.defaultProps = {
  isLoadingContactsList: true,
  contactsData: {
    contactsList: [],
  },
  menuData: {
    userName: 'Loading...',
    userSurname: 'Loading...',
    userAvatar: '',
    logoutUrl: pagesRoutes.LOGOUT,
    menuList: [
      { text: 'Мессенджер', url: pagesRoutes.MAIN_PAGE },
      { text: 'Профиль', url: pagesRoutes.SETTING },
      { text: 'Авторизация', url: pagesRoutes.LOGIN },
      { text: 'Регистрация', url: pagesRoutes.REGISTER },
    ],
  },
  createChatButtonId: 'create-chat-button-id',
  createChatInputId: 'create-chat-input-id',
  chatId: null,
  chatOpen: false,
};
