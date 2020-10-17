import { Middleware } from './interface/Middleware';
import { GetUser } from '../API/GetUser';
import { AuthorizationService } from '../Services/AuthorizationService';

export class Auth implements Middleware {
  constructor(private readonly reverse: boolean = false) {}
  public async check(): Promise<boolean> {
    try {
      const isLogin = AuthorizationService.getUser();
      if (!isLogin) return this.reverse;

      const res = await new GetUser().perform();
      if (res === null) return this.reverse;

      return !this.reverse;
    } catch (error) {
      console.log(error);
      return this.reverse;
    }
  }
}
