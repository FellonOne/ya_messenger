import { Fetch } from '../Framework/Fetch/Fetch';
import { URL } from './URL';

type AddUserInChatResult = {
  state: boolean;
  errors: { message: string; field?: string }[];
};

export class AddUserInChat {
  constructor(private readonly chatId: number, private readonly usersId: number[]) {}

  public async perform(): Promise<AddUserInChatResult> {
    try {
      const result: XMLHttpRequest = (await new Fetch().put(URL.ADD_USER_IN_CHAT.url, {
        method: URL.ADD_USER_IN_CHAT.method,
        data: {
          chatId: this.chatId,
          users: this.usersId,
        },
      })) as XMLHttpRequest;

      if (result.status >= 400) {
        return {
          state: false,
          errors: [{ message: result.response }],
        };
      }

      return {
        state: true,
        errors: [],
      };
    } catch (error) {
      console.log(error);

      return {
        state: false,
        errors: [
          {
            message: 'Уууппс, что-то пошло не так :( ',
          },
        ],
      };
    }
  }
}
