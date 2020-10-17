import { Storage } from './Storage';
import { Chat } from './ChatService';

export class ConversationService {
  private static readonly conversationStorageKey: string = 'active_chat';

  public static addConversation(chats: Chat): void {
    Storage.saveItemByKey(ConversationService.conversationStorageKey, JSON.stringify(chats));
  }

  public static cleanConversation(): void {
    Storage.removeItemByKey(ConversationService.conversationStorageKey);
  }

  public static getConversation(): Chat | null {
    return Storage.getObjectByKey<Chat>(ConversationService.conversationStorageKey);
  }
}
