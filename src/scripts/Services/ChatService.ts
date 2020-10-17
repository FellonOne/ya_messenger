import { Storage } from './Storage';
import { User } from './AuthorizationService';

export type Chat = {
  id: number;
  title: string;
  avatar: string;
  unreadMessage: number;
  users: User[];
};

export class ChatService {
  private static readonly chatStorageKey: string = 'user_chats';

  public static addChats(chats: Chat[]): void {
    Storage.saveItemByKey(ChatService.chatStorageKey, JSON.stringify(chats));
  }

  public static cleanChats(): void {
    Storage.removeItemByKey(ChatService.chatStorageKey);
  }

  public static getChats(): Chat[] | null {
    return Storage.getObjectByKey<Chat[]>(ChatService.chatStorageKey);
  }
}
