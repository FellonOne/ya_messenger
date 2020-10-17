import { Component } from '../../Framework/Component';
import { ComponentList } from '../../Framework/types';
import { Chat, ChatService } from '../../Services/ChatService';
import { router } from '../../router';
import { pagesRoutes } from '../../pages';
import { isEmpty } from '../../Framework/Utils/isEmpty';

export type ContactsListProps = {
  isLoading?: boolean;
  createChatId?: string;
  createChatInputId?: string;
  contactsList: Chat[];
};

const colorList: string[] = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#607d8b',
];

export class ContactsList extends Component {
  public static defaultProps: ContactsListProps;

  constructor(props: ContactsListProps, componentList: ComponentList[]) {
    super(
      {
        ...ContactsList.defaultProps,
        ...props,
      },
      componentList,
    );

    this.onChatClickEvent = this.onChatClickEvent.bind(this);
  }

  componentDidMount(): void {
    this.registerGoToMessageEvent();
  }

  componentWillUpdate(): boolean {
    this.destroyGoToMessageEvent();
    return true;
  }

  componentDidUpdate(): void {
    this.destroyGoToMessageEvent();
    this.registerGoToMessageEvent();
  }

  componentWillUnmount(): void {
    this.destroyGoToMessageEvent();
  }

  registerGoToMessageEvent(): void {
    const elements = document.querySelectorAll('.go-to-chat-element');
    if (elements.length === 0) return;

    for (const element of elements) {
      element.addEventListener('click', this.onChatClickEvent);
    }
  }

  destroyGoToMessageEvent(): void {
    const elements = document.querySelectorAll('.go-to-chat-element');
    if (elements.length === 0) return;

    for (const element of elements) {
      element.removeEventListener('click', this.onChatClickEvent);
    }
  }

  onChatClickEvent(ev: Event): void {
    if (!ev.target) return;

    const findCorrectTarget = (el: HTMLElement): HTMLElement | null => {
      if ([...el.classList.values()].filter((name) => name === 'go-to-chat-element').length) {
        return el;
      }

      const parent = el.parentElement;
      if (!parent) return null;

      return findCorrectTarget(parent);
    };

    const target = findCorrectTarget(ev.target as HTMLElement);
    if (!target) return;

    const chatId = target.getAttribute('data-chat-id');
    if (chatId) {
      router.go(pagesRoutes.CHAT, {
        chatId,
        chatOpen: true,
      });
    }
  }

  render(): string {
    let { contactsList } = this.props as ContactsListProps;
    const { isLoading } = this.props as ContactsListProps;

    if (contactsList.length === 0) {
      contactsList = ChatService.getChats() ?? [];
    }

    let res = !isLoading
      ? contactsList
          .map((data) => {
            let i = 0;
            const letterSum = Math.trunc(
              data.title.split('').reduce((sum, letter) => {
                i += 1;
                return sum + letter.charCodeAt(0) * i + i;
              }, 1),
            );
            return `
        <li class="person contacts__element go-to-chat-element" data-chat-id="${data.id}">
          <div>
            <div style="background-color: ${
              colorList[letterSum % colorList.length]
            }" class="person__avatar">${data.title[0]}</div>
          </div>
          <div class="person__information">
            <header class="person__header">
              <h6 class="person__name">${data.title}</h6>
              
              <small class="person__last-messege-date">Новых сообщений: ${
                data.unreadMessage
              }</small>
            </header>
            <p class="person__last-messege">
              Перейти в чат
            </p>
          </div>
        </li>
      `;
          })
          .join('')
      : `<li class="contacts__loading"><Spinner /></li>`;

    if (isEmpty(res)) {
      res = `<li class="contacts__loading">Чатов пока нет :(</li>`;
    }

    let createChat = `<li class="create-chat">
          <BaseInput
            type="text"
            placeholder="Название чата..."
            name="chat-name"
            classNames="create-chat__input"
            id="{{ createChatInputId }}"
          />
         
          <Button
            textContent="Создать чат"
            classNames="create-chat__button"
            buttonId="{{ createChatId }}"
          />
        </li>`;
    if (isLoading) createChat = '';

    return `
      <ul class="contacts__list">
        ${createChat}
        ${res}  
      </ul>
    `;
  }
}

ContactsList.defaultProps = {
  isLoading: false,
  createChatId: '',
  createChatInputId: '',
  contactsList: [],
};
