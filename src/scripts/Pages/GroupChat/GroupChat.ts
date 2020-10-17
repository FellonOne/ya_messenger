import { Component } from '../../Framework/Component';
import { ComponentList } from '../../Framework/types';
import { loadConversation } from '../Messenger/Service/Conversation';
import { ConversationService } from '../../Services/ConversationService';
import { Chat } from '../../Services/ChatService';
import { isEmpty } from '../../Framework/Utils/isEmpty';
import { DeleteUserFromChat } from '../../API/DeleteUserFromChat';
import { router } from '../../router';
import { pagesRoutes } from '../../pages';
import { submitFormValidation } from '../Settings/Validation/SubmitFormValidation';
import { AddUserInChat } from '../../API/AddUserInChat';
import { FindUserByLogin } from '../../API/FindUserByLogin';

type GroupChatProps = {
  backLinkText?: string;
  chatId?: number | null;
  isLoading?: boolean;
  chat?: Chat | null;
};

export class GroupChat extends Component {
  public static defaultProps: GroupChatProps;

  constructor(props: GroupChatProps = {}, componentList: ComponentList[]) {
    super(
      {
        ...GroupChat.defaultProps,
        ...props,
      },
      componentList,
    );

    this.onRemoveUserInChatClick = this.onRemoveUserInChatClick.bind(this);
    this.onAddUserInChatClick = this.onAddUserInChatClick.bind(this);
  }

  componentDidMount(): void {
    this.updateChat();
  }

  componentWillUpdate(): boolean {
    this.destroyRemoveUserEvent();
    this.destroyAddUserEvent();
    return true;
  }

  componentDidUpdate(): void {
    this.destroyRemoveUserEvent();
    this.destroyAddUserEvent();

    this.registerRemoveUserEvent();
    this.registerAddUserEvent();
  }

  componentWillUnmount(): void {
    this.destroyRemoveUserEvent();
    this.destroyAddUserEvent();
  }

  registerRemoveUserEvent(): void {
    const elements = document.querySelectorAll('.delete-user-in-chat');
    if (!elements || elements.length === 0) return;

    for (const element of elements) {
      element.addEventListener('click', this.onRemoveUserInChatClick);
    }
  }

  registerAddUserEvent(): void {
    const button = document.querySelector('#add-user-button');
    if (!button) return;

    button.addEventListener('click', this.onAddUserInChatClick);
  }

  destroyAddUserEvent(): void {
    const button = document.querySelector('#add-user-button');
    if (!button) return;

    button.removeEventListener('click', this.onAddUserInChatClick);
  }

  destroyRemoveUserEvent(): void {
    const elements = document.querySelectorAll('.delete-user-in-chat');
    if (!elements || elements.length === 0) return;

    for (const element of elements) {
      element.removeEventListener('click', this.onRemoveUserInChatClick);
    }
  }

  onAddUserInChatClick(): void {
    const input = document.querySelector('#chat-user-login-input') as HTMLInputElement;
    if (!input) return;

    const res = submitFormValidation({
      userLogin: input.value,
    });

    if (res.hasError) {
      Object.keys(res.errors).forEach((key) => {
        alert(res.errors[key]);
      });

      return;
    }

    this.setProps({
      isLoading: true,
    });

    new FindUserByLogin(input.value).perform().then((result) => {
      if (result.state) {
        const user = result.user;
        const { chatId } = this.props as GroupChatProps;

        if (user && chatId) {
          new AddUserInChat(chatId, [user.id]).perform().then((result) => {
            if (result.state) {
              this.updateChat();
            } else {
              this.setProps({
                isLoading: false,
              });
            }
          });
        } else {
          this.setProps({
            isLoading: false,
          });
        }
      }
    });
  }

  onRemoveUserInChatClick(ev: Event): void {
    const element = ev.target as HTMLElement;

    const userId = element.getAttribute('data-user-id');
    const { chatId } = this.props as GroupChatProps;

    if (!userId || !chatId) return;

    this.setProps({
      isLoading: true,
    });

    new DeleteUserFromChat(chatId, [parseInt(userId)]).perform().then((res) => {
      console.log(res);

      if (res.state) {
        this.updateChat();
      }
    });
  }

  updateChat(): void {
    const { chatId } = this.props as GroupChatProps;

    if (chatId) {
      loadConversation(chatId).then((result) => {
        if (!result.state) {
          router.go(pagesRoutes.MAIN_PAGE);
          return;
        }

        if (result.chat) {
          ConversationService.addConversation(result.chat);
          this.setProps({
            chat: result.chat,
            isLoading: false,
          });
        }
      });
    }
  }

  render(): string {
    const { isLoading, chat } = this.props as GroupChatProps;
    let usersInGroup = ``;
    let chatInfo = ``;

    if (isLoading || !chat) {
      usersInGroup = `
        <section class="conversation conversation__full">
          <Spinner />
        </section>
      `;

      chatInfo = `<div class="interlocutor__person-container">
          <div class="interlocutor__back-button">
            <RouterComponent
            page="/"
            linkText="**backLinkText**"
            />
          </div>
          <div class="interlocutor__person-status"></div>
          <div class="interlocutor__person-name">Загрузка...</div>
        </div>
        <div class="interlocutor__open-users-chat open-users-chat">Пользователи чата</div>`;
    } else {
      const contactsList = chat.users
        .map((user) => {
          let userDisplayName = isEmpty(user.displayName) ? null : user.displayName?.trim();
          if (!userDisplayName) {
            userDisplayName = `${user.name ?? ''} ${user.surname ?? ''}`;
          }

          if (userDisplayName.trim().length <= 2) userDisplayName = user.login;

          return `
            <li class="person contacts__element" >
              <div>
                <div style="background-color: cadetblue" class="person__avatar">${userDisplayName[0]}</div>
              </div>
              <div class="person__information">
                <header class="person__header">
                  <h6 class="person__name">${userDisplayName}</h6>
                </header>
                <p class="person__last-messege delete-user-in-chat" data-user-id="${user.id}">
                  Удалить пользователя из чата
                </p>
              </div>
            </li>
        `;
        })
        .join('');

      usersInGroup = `
        <ul class="contacts__list">
          <li class="add-user-in-chat">
            <BaseInput
              type="text"
              placeholder="Логин пользователя..."
              name="user-login"
              classNames="create-chat__input"
              id="chat-user-login-input"
            />
            
            <Button
              textContent="Добавить"
              classNames="create-chat__button"
              buttonId="add-user-button"
            />
          </li>
          
          ${contactsList}
        </ul>
      `;

      chatInfo = `
         <div class="interlocutor__person-container">
          <div class="interlocutor__back-button">
            <RouterComponent
            page="/"
            linkText="**backLinkText**"
            />
          </div>
          <div class="interlocutor__person-status"></div>
          <div class="interlocutor__person-name">${chat.title} <br />Пользователей в чате: ${chat.users.length}</div>
        </div>
        <div class="interlocutor__open-users-chat open-users-chat">Пользователи чата</div>
      `;
    }

    console.log(`--- GroupChat render ---`);

    return `
        <section class="conversation">
          <header class="interlocutor">
            <div class="interlocutor__person">
              ${chatInfo}
            </div>
          </header>
          
          <div class="messages">
            <div class="messages__black-container"> 
              Упппссс, в данный момент <br />
              процесс общения не реализован :(
            </div>
          </div>
        </section>
        
        <section class="right-aside">
          <div class="contacts">
            ${usersInGroup}
          </div>
        </section>
    `;
  }
}

GroupChat.defaultProps = {
  backLinkText: `<i class="fas fa-long-arrow-alt-left"></i>`,
  isLoading: true,
  chatId: null,
  chat: null,
};
