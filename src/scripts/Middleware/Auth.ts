import { Middleware } from './interface/Middleware';
import { AuthorizationService } from '../Services/AuthorizationService';
import { UserAPI } from '../API/UserAPI';

export class Auth implements Middleware {
  constructor(private readonly reverse: boolean = false) {}
  public async check(): Promise<boolean> {
    try {
      const isLogin = AuthorizationService.getUser();
      if (!isLogin) return this.reverse;

      const res = await UserAPI.getUser();
      if (res === null) return this.reverse;

      return !this.reverse;
    } catch (error) {
      console.log(error);
      return this.reverse;
    }
  }
}
