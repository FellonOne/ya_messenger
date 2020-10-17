import { Chat } from '../../../Services/ChatService';
import { GetChatById } from '../../../API/GetChatById';
import { convertErrorFromAPI } from '../../../Utils/convertErrorFromAPI';

type LoadConversationResult = {
  state: boolean;
  chat?: Chat;
};

export async function loadConversation(chatId: number): Promise<LoadConversationResult> {
  try {
    const response = await new GetChatById(chatId).perform();

    if (!response.state) {
      throw convertErrorFromAPI(response.errors);
    }

    return {
      state: true,
      chat: response.chat,
    };
  } catch (error) {
    Object.keys(error).forEach((key) => {
      if (error[key] === 'No chat') {
        alert('Чат удален');
      } else alert(error[key]);
    });

    return {
      state: false,
    };
  }
}
