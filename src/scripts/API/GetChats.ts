import { Chat } from '../Services/ChatService';
import { Fetch } from '../Framework/Fetch/Fetch';
import { URL } from './URL';
import { GetUnreadMessages } from './GetUnreadMessages';

type GetChatsResult = {
  state: boolean;
  chats?: Chat[];
  errors: { message: string; field?: string }[];
};

export type ExternalChat = {
  id: number;
  title: string;
  avatar: string;
};

export class GetChats {
  public async perform(): Promise<GetChatsResult> {
    try {
      const result: XMLHttpRequest = (await new Fetch().get(URL.GET_CHATS.url)) as XMLHttpRequest;

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
        const unreadMessagesResult = await new GetUnreadMessages(chat.id).perform();
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
}
