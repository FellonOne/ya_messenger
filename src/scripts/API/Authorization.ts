import { User } from '../Services/AuthorizationService';
import { Fetch } from '../Framework/Fetch/Fetch';
import { URL } from './URL';

type AuthorizationResult = {
  state: boolean;
  user?: User;
  errors: { message: string; field?: string }[];
};

export class Authorization {
  constructor(private readonly login: string, private readonly password: string) {}

  public async perform(): Promise<AuthorizationResult> {
    try {
      const result: XMLHttpRequest = (await new Fetch().post(URL.AUTHORIZATION.url, {
        method: URL.AUTHORIZATION.method,
        data: {
          login: this.login,
          password: this.password,
        },
      })) as XMLHttpRequest;

      if (result.status >= 400) {
        const response = JSON.parse(result.response);
        return {
          state: false,
          errors: [{ message: response.reason }],
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
        errors: [{ field: 'default', message: 'Уууппсс, что-то пошло не так' }],
      };
    }
  }
}
