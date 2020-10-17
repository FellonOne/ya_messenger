import { Fetch } from '../Framework/Fetch/Fetch';
import { URL } from './URL';

type GetUnreadMessagesResult = {
  state: boolean;
  count?: number;
  errors: { message: string; field?: string }[];
};

export class GetUnreadMessages {
  constructor(private readonly chatId: number) {}

  public async perform(): Promise<GetUnreadMessagesResult> {
    try {
      const result: XMLHttpRequest = (await new Fetch().get(
        URL.GET_CHAT_COUNT_MESSAGE.urlTemplate
          ? URL.GET_CHAT_COUNT_MESSAGE.urlTemplate(this.chatId)
          : URL.GET_CHAT_COUNT_MESSAGE.url,
      )) as XMLHttpRequest;

      if (result.status >= 400) {
        return {
          state: false,
          errors: [{ message: result.response }],
        };
      }

      const countResponse = JSON.parse(result.response);
      if (!countResponse || countResponse.unread_count === undefined)
        throw Error('JSON parse error in GetUnreadMessages');

      return {
        state: true,
        count: countResponse.unread_count,
        errors: [],
      };
    } catch (error) {
      console.log(error);

      return {
        state: false,
        errors: [
          {
            message: 'Ууппс, что-то пошло не так',
          },
        ],
      };
    }
  }
}
