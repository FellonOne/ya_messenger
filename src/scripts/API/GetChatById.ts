import { Chat, ChatService } from '../Services/ChatService';
import { GetChats } from './GetChats';
import { GetChatUsers } from './GetChatUsers';

type GetChatByIdResult = {
  state: boolean;
  chat?: Chat;
  errors: { message: string; field?: string }[];
};

export class GetChatById {
  constructor(private readonly chatId: number) {}

  public async perform(): Promise<GetChatByIdResult> {
    let chats = ChatService.getChats();

    if (!chats) {
      const getChatsResult = await new GetChats().perform();
      if (getChatsResult.state && getChatsResult.chats) {
        chats = getChatsResult.chats;
      } else {
        return {
          state: false,
          errors: getChatsResult.errors,
        };
      }
    }

    const chat = chats.filter((chat) => Number(chat.id) === Number(this.chatId)).pop();
    if (!chat) {
      return {
        state: false,
        errors: [{ message: `Чата с номером #${this.chatId} не существует` }],
      };
    }

    const userInChat = await new GetChatUsers(chat.id).perform();
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
}
