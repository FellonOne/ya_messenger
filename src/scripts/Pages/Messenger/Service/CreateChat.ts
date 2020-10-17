import { CreateChat } from '../../../API/CreateChat';
import { convertErrorFromAPI } from '../../../Utils/convertErrorFromAPI';

export async function createChat(chatName: string): Promise<boolean> {
  try {
    const response = await new CreateChat(chatName).perform();
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
