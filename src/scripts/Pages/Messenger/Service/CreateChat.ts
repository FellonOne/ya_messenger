import { convertErrorFromAPI } from '../../../Utils/convertErrorFromAPI';
import { ChatAPI } from '../../../API/ChatAPI';

export async function createChat(chatName: string): Promise<boolean> {
  try {
    const response = await ChatAPI.createChat(chatName);
    if (!response.state) {
      throw convertErrorFromAPI(response.errors);
    }

    return true;
  } catch (error) {
    Object.keys(error).forEach((key) => {
      alert(error[key]);
    });

    return false;
  }
}
