import { Fetch } from '../Framework/Fetch/Fetch';
import { URL } from './URL';

type CreateChatResult = {
  state: boolean;
  errors: { message: string; field?: string }[];
};

export class CreateChat {
  constructor(private readonly chatName: string) {}

  public async perform(): Promise<CreateChatResult> {
    try {
      const result: XMLHttpRequest = (await new Fetch().post(URL.CREATE_CHAT.url, {
        data: {
          title: this.chatName,
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
