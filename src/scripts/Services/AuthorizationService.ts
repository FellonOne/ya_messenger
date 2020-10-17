import { Storage } from './Storage';

export type User = {
  id: number;
  name: string;
  surname: string;
  login: string;
  email: string;
  phone: string;
  avatar?: string;
  displayName?: string;
};

export class AuthorizationService {
  private static readonly userStorageKey: string = 'user_data';

  public static authorize(user: User): void {
    Storage.saveItemByKey(AuthorizationService.userStorageKey, JSON.stringify(user));
  }

  public static removeUser(): void {
    if (AuthorizationService.userExist()) {
      Storage.removeItemByKey(AuthorizationService.userStorageKey);
    }
  }

  public static userExist(): boolean {
    return AuthorizationService.getUser() !== null;
  }

  public static getUser(): User | null {
    return Storage.getObjectByKey<User>(AuthorizationService.userStorageKey);
  }
}
