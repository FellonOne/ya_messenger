import { convertErrorFromAPI } from '../../../Utils/convertErrorFromAPI';
import { ChatService } from '../../../Services/ChatService';
import { ChatAPI } from '../../../API/ChatAPI';

export async function getChatsList(): Promise<boolean> {
  try {
    const responseChatList = await ChatAPI.getChats();

    if (!responseChatList.state) {
      throw convertErrorFromAPI(responseChatList.errors);
    }

    ChatService.cleanChats();
    if (responseChatList.chats) ChatService.addChats(responseChatList.chats);

    return true;
  } catch (error) {
    Object.keys(error).forEach((key) => {
      alert(error[key]);
    });

    return false;
  }
}
