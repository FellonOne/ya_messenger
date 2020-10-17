import { Fetch } from '../Framework/Fetch/Fetch';
import { URL } from './URL';

type DeleteUserFromChatResult = {
  state: boolean;
  errors: { message: string; field?: string }[];
};

export class DeleteUserFromChat {
  constructor(private readonly chatId: number, private readonly usersId: number[]) {}

  public async perform(): Promise<DeleteUserFromChatResult> {
    try {
      const result: XMLHttpRequest = (await new Fetch().delete(URL.DELETE_USER_FROM_CHAT.url, {
        method: URL.DELETE_USER_FROM_CHAT.method,
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
