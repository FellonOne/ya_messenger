import { User } from '../Services/AuthorizationService';
import { Fetch } from '../Framework/Fetch/Fetch';
import { URL } from './URL';

export type UpdatePasswordResult = {
  state: boolean;
  user?: User;
  errors: { message: string; field?: string }[];
};

export class UpdatePassword {
  constructor(private readonly oldPassword: string, private readonly newPassword: string) {}

  public async perform(): Promise<UpdatePasswordResult> {
    try {
      const result: XMLHttpRequest = (await new Fetch().put(URL.UPDATE_PASSWORD.url, {
        method: URL.UPDATE_PASSWORD.method,
        data: {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
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
        errors: [{ message: 'Упппс, что-то пошло не так' }],
      };
    }
  }
}
