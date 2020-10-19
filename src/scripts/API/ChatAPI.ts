import { Chat, ChatService } from '../Services/ChatService';
import { Fetch } from '../Framework/Fetch/Fetch';
import { URL } from './URL';
import { BaseAPI } from './parent/BaseAPI';
import { User } from '../Services/AuthorizationService';
import { ExternalUser } from './UserAPI';

type ExternalChat = {
  id: number;
  title: string;
  avatar: string;
};

type ChatAPIResult = {
  state: boolean;
  chat?: Chat;
  chats?: Chat[];
  users?: User[];
  count?: number;
  errors: { message: string; field?: string }[];
};

class _ChatAPI extends BaseAPI {
  /**
   * Добавляем пользователей в чат
   * @param chatId
   * @param usersId
   */
  public async addUserInChat(chatId: number, usersId: number[]): Promise<ChatAPIResult> {
    try {
      const result: XMLHttpRequest = (await Fetch.put(URL.ADD_USER_IN_CHAT.url, {
        method: URL.ADD_USER_IN_CHAT.method,
        data: {
          chatId: chatId,
          users: usersId,
        },
      })) as XMLHttpRequest;

      if (result.status >= 400) {
        return this.responseError('default', result.response);
      }

      return {
        state: true,
        errors: [],
      };
    } catch (error) {
      return this.responseError();
    }
  }

  /**
   * Создаем чат
   * @param chatName
   */
  public async createChat(chatName: string): Promise<ChatAPIResult> {
    try {
      const result: XMLHttpRequest = (await Fetch.post(URL.CREATE_CHAT.url, {
        data: {
          title: chatName,
        },
      })) as XMLHttpRequest;

      if (result.status >= 400) {
        return this.responseError('default', result.response);
      }

      return {
        state: true,
        errors: [],
      };
    } catch (error) {
      return this.responseError();
    }
  }

  /**
   * Удаляем пользователя из чата
   * @param chatId
   * @param usersId
   */
  public async deleteUserFromChat(chatId: number, usersId: number[]): Promise<ChatAPIResult> {
    try {
      const result: XMLHttpRequest = (await Fetch.delete(URL.DELETE_USER_FROM_CHAT.url, {
        method: URL.DELETE_USER_FROM_CHAT.method,
        data: {
          chatId: chatId,
          users: usersId,
        },
      })) as XMLHttpRequest;

      if (result.status >= 400) {
        return this.responseError('default', result.response);
      }

      return {
        state: true,
        errors: [],
      };
    } catch (error) {
      return this.responseError();
    }
  }

  /**
   * Получаем чат по его ID
   * @param chatId
   */
  public async getChatById(chatId: number): Promise<ChatAPIResult> {
    let chats = ChatService.getChats();

    if (!chats) {
      const getChatsResult = await ChatAPI.getChats();
      if (getChatsResult.state && getChatsResult.chats) {
        chats = getChatsResult.chats;
      } else {
        return {
          state: false,
          errors: getChatsResult.errors,
        };
      }
    }

    const chat = chats.filter((chat) => Number(chat.id) === Number(chatId)).pop();
    if (!chat) {
      return this.responseError('default', `Чата с номером #${chatId} не существует`);
    }

    const userInChat = await ChatAPI.getChatUsers(chat.id);
    if (!userInChat.state || !userInChat.users)
      return {
        state: false,
        errors: userInChat.errors,
      };

    chat.users = userInChat.users;

    return {
      state: true,
      chat,
      errors: [],
    };
  }

  /**
   * Получаем список всех чатов пользователя
   */
  public async getChats(): Promise<ChatAPIResult> {
    try {
      const result: XMLHttpRequest = (await Fetch.get(URL.GET_CHATS.url)) as XMLHttpRequest;

      if (result.status >= 400) {
        return {
          state: false,
          errors: [{ message: 'Сервер не доступен :(' }],
        };
      }

      const responseChats: ExternalChat[] = JSON.parse(result.response);
      if (!responseChats) throw Error('error in JSON parse');

      const chats: Chat[] = [];
      for (const chat of responseChats) {
        const unreadMessagesResult = await ChatAPI.getUnreadMessages(chat.id);
        if (!unreadMessagesResult.state) {
          throw unreadMessagesResult.errors;
        }

        chats.push({
          id: chat.id,
          avatar: chat.avatar,
          title: chat.title,
          unreadMessage: unreadMessagesResult.count ? unreadMessagesResult.count : 0,
          users: [],
        });
      }

      return {
        state: true,
        chats: chats.reverse(),
        errors: [],
      };
    } catch (error) {
      return {
        state: false,
        errors: [],
      };
    }
  }

  /**
   * Получаем пользователей с чата
   * @param chatId
   */
  public async getChatUsers(chatId: number): Promise<ChatAPIResult> {
    try {
      const result: XMLHttpRequest = (await Fetch.get(
        URL.GET_CHAT_USERS.urlTemplate
          ? URL.GET_CHAT_USERS.urlTemplate(chatId)
          : URL.GET_CHAT_USERS.url,
      )) as XMLHttpRequest;

      if (result.status >= 400) {
        return this.responseError('default', result.response);
      }

      const userResult: ExternalUser[] = JSON.parse(result.response);
      if (!userResult) throw Error('JSON parse error');

      return {
        users: userResult.map((data) => {
          return {
            id: parseInt(data.id),
            login: data.login,
            phone: data.phone,
            name: data.first_name,
            surname: data.second_name,
            email: data.email,
            avatar: data.avatar,
            displayName: data.display_name,
          };
        }),
        state: true,
        errors: [],
      };
    } catch (error) {
      return this.responseError();
    }
  }

  /**
   * Получаем кол-во непрочитанных сообщений у чата
   * @param chatId
   */
  public async getUnreadMessages(chatId: number): Promise<ChatAPIResult> {
    try {
      const result: XMLHttpRequest = (await Fetch.get(
        URL.GET_CHAT_COUNT_MESSAGE.urlTemplate
          ? URL.GET_CHAT_COUNT_MESSAGE.urlTemplate(chatId)
          : URL.GET_CHAT_COUNT_MESSAGE.url,
      )) as XMLHttpRequest;

      if (result.status >= 400) {
        return this.responseError('default', result.response);
      }

      const countResponse = JSON.parse(result.response);
      if (!countResponse || countResponse.unread_count === undefined)
        throw Error('JSON parse error in GetUnreadMessages');

      return {
        state: true,
        count: countResponse.unread_count,
        errors: [],
      };
    } catch (error) {
      return this.responseError();
    }
  }
}

export const ChatAPI = new _ChatAPI();
