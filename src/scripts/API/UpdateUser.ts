import { Fetch } from '../Framework/Fetch/Fetch';
import { URL } from './URL';
import { User } from '../Services/AuthorizationService';

type UpdateUserResult = {
  state: boolean;
  user?: User;
  errors: { message: string; field?: string }[];
};

export class UpdateUser {
  constructor(
    private readonly name: string,
    private readonly surname: string,
    private readonly displayName: string,
    private readonly login: string,
    private readonly email: string,
    private readonly phone: string,
  ) {}

  public async perform(): Promise<UpdateUserResult> {
    try {
      const result: XMLHttpRequest = (await new Fetch().put(URL.UPDATE_USER.url, {
        method: URL.UPDATE_USER.method,
        data: {
          first_name: this.name,
          second_name: this.surname,
          display_name: this.displayName,
          login: this.login,
          email: this.email,
          phone: this.phone,
        },
      })) as XMLHttpRequest;

      if (result.status >= 400) {
        const response = JSON.parse(result.response);
        return {
          state: false,
          errors: [{ message: response.reason }],
        };
      }

      const responseUser = JSON.parse(result.response);
      if (!responseUser) throw Error('parse error in UpdateUser');

      const newUser: User = {
        name: responseUser.first_name,
        surname: responseUser.second_name,
        displayName: responseUser.display_name,
        phone: responseUser.phone,
        email: responseUser.email,
        login: responseUser.login,
        id: responseUser.id,
        avatar: responseUser.avatar,
      };

      return {
        state: true,
        errors: [],
        user: newUser,
      };
    } catch (error) {
      console.log(error);

      return {
        state: false,
        errors: [{ field: 'default', message: 'Уууппсс, что-то пошло не так' }],
      };
    }
  }
}
