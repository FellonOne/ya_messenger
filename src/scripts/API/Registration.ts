import { Fetch } from '../Framework/Fetch/Fetch';
import { URL } from './URL';
import { User } from '../Services/AuthorizationService';
import { GetUser } from './GetUser';

export type RegistrationResult = {
  state: boolean;
  user?: User;
  errors: { message: string; field?: string }[];
};

export class RegistrationAPI {
  constructor(
    private readonly login: string,
    private readonly email: string,
    private readonly password: string,
    private readonly phone: string,
  ) {}

  public async perform(): Promise<RegistrationResult> {
    try {
      const result: XMLHttpRequest = (await new Fetch().post(URL.REGISTRATION.url, {
        method: URL.REGISTRATION.method,
        data: {
          login: this.login,
          email: this.email,
          phone: this.phone,
          password: this.password,
          first_name: '',
          second_name: '',
        },
      })) as XMLHttpRequest;

      if (result.status >= 400) {
        const response = JSON.parse(result.response);

        return {
          state: false,
          errors: [{ message: response.reason }],
        };
      }

      const user = await new GetUser().perform();

      if (!user)
        return {
          state: true,
          user: {
            id: 0,
            login: this.login,
            email: this.email,
            name: '',
            surname: '',
            phone: '',
          },
          errors: [],
        };
      else
        return {
          state: true,
          user,
          errors: [],
        };
    } catch (error) {
      console.log(`Error in api => `, error);
      return {
        state: false,
        errors: [
          {
            message: 'Упппс, что-то пошло не так, попробуйте еще раз',
            field: 'password',
          },
        ],
      };
    }
  }
}
