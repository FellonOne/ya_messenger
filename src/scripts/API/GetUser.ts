import { User } from '../Services/AuthorizationService';
import { Fetch } from '../Framework/Fetch/Fetch';
import { URL } from './URL';

export type ExternalUser = {
  id: string;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  avatar: string;
  email: string;
  phone: string;
};

export class GetUser {
  public async perform(): Promise<User | null> {
    try {
      const result: XMLHttpRequest = (await new Fetch().get(URL.CHECK_AUTH.url)) as XMLHttpRequest;

      if (result.status >= 400) return null;

      const data: ExternalUser = JSON.parse(result.response);
      if (!data) return null;

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
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
