import { User } from '../Services/AuthorizationService';
import { Fetch } from '../Framework/Fetch/Fetch';
import { URL } from './URL';
import { ExternalUser } from './GetUser';

type GetChatUsersResult = {
  state: boolean;
  users?: User[];
  errors: { message: string; field?: string }[];
};

export class GetChatUsers {
  constructor(private readonly chatId: number) {}

  public async perform(): Promise<GetChatUsersResult> {
    try {
      const result: XMLHttpRequest = (await new Fetch().get(
        URL.GET_CHAT_USERS.urlTemplate
          ? URL.GET_CHAT_USERS.urlTemplate(this.chatId)
          : URL.GET_CHAT_USERS.url,
      )) as XMLHttpRequest;

      if (result.status >= 400) {
        return {
          state: false,
          errors: [{ message: result.response }],
        };
      }

      const userResult: ExternalUser[] = JSON.parse(result.response);
      if (!userResult) throw Error('JSON parse error');

      return {
        users: userResult.map((data) => {
          return {
            id: parseInt(data.id),
            login: data.login,
            phone: data.phone,
            name: data.first_name,
            surname: data.second_name,
            email: data.email,
            avatar: data.avatar,
            displayName: data.display_name,
          };
        }),
        state: true,
        errors: [],
      };
    } catch (error) {
      console.log(error);

      return {
        state: false,
        errors: [{ message: 'Уппс, что-то опять пошло не так :(' }],
      };
    }
  }
}
