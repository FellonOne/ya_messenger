import { User } from '../Services/AuthorizationService';
import { Fetch } from '../Framework/Fetch/Fetch';
import { URL } from './URL';

type FindUserByLoginResult = {
  state: boolean;
  user?: User | null;
  errors: { message: string; field?: string }[];
};

export class FindUserByLogin {
  constructor(private readonly userLogin: string) {}

  public async perform(): Promise<FindUserByLoginResult> {
    try {
      const result: XMLHttpRequest = (await new Fetch().post(URL.FIND_USER_BY_LOGIN.url, {
        method: URL.FIND_USER_BY_LOGIN.method,
        data: {
          login: this.userLogin,
        },
      })) as XMLHttpRequest;

      if (result.status >= 400) {
        return {
          state: true,
          errors: [],
          user: null,
        };
      }

      const userData = JSON.parse(result.response);
      if (!Array.isArray(userData))
        return {
          state: true,
          errors: [],
          user: null,
        };

      return {
        state: true,
        errors: [],
        user: userData.pop(),
      };
    } catch (error) {
      console.log(error);

      return {
        state: false,
        errors: [],
      };
    }
  }
}
