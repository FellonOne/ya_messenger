import { Fetch } from '../Framework/Fetch/Fetch';
import { URL } from './URL';
import { AuthorizationService } from '../Services/AuthorizationService';

export class Logout {
  public async perform(): Promise<void> {
    try {
      AuthorizationService.removeUser();
      await new Fetch().post(URL.LOGOUT.url);
    } catch (error) {
      console.log(error);
    }
  }
}
