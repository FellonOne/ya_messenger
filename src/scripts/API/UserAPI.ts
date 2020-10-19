import { AuthorizationService, User } from '../Services/AuthorizationService';
import { Fetch } from '../Framework/Fetch/Fetch';
import { URL } from './URL';
import { BaseAPI } from './parent/BaseAPI';

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

type UserAPIResult = {
  state: boolean;
  user?: User | null;
  errors: { message: string; field?: string }[];
};

class _UserAPI extends BaseAPI {
  /**
   * Авторизация пользователя
   * @param login
   * @param password
   */
  public async authorization(login: string, password: string): Promise<UserAPIResult> {
    try {
      const result: XMLHttpRequest = (await Fetch.post(URL.AUTHORIZATION.url, {
        method: URL.AUTHORIZATION.method,
        data: {
          login: login,
          password: password,
        },
      })) as XMLHttpRequest;

      if (result.status >= 400) {
        return this.parseErrorAndResponse(result);
      }

      return {
        state: true,
        errors: [],
      };
    } catch (error) {
      return this.responseError();
    }
  }

  /**
   * Получаем пользователя по логину
   * @param userLogin
   */
  public async findUserByLogin(userLogin: string): Promise<UserAPIResult> {
    try {
      const result: XMLHttpRequest = (await Fetch.post(URL.FIND_USER_BY_LOGIN.url, {
        method: URL.FIND_USER_BY_LOGIN.method,
        data: {
          login: userLogin,
        },
      })) as XMLHttpRequest;

      if (result.status >= 400) {
        return this.parseErrorAndResponse(result);
      }

      const userData = JSON.parse(result.response);
      if (!Array.isArray(userData) || userData.length === 0)
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
      return this.responseError();
    }
  }

  /**
   * Получаем залогиненного пользователя
   */
  public async getUser(): Promise<User | null> {
    try {
      const result: XMLHttpRequest = (await Fetch.get(URL.CHECK_AUTH.url)) as XMLHttpRequest;

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
      return null;
    }
  }

  /**
   * Выход пользователя из системы
   */
  public async logout(): Promise<void> {
    try {
      AuthorizationService.removeUser();
      await Fetch.post(URL.LOGOUT.url);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Регистрация пользователя
   * @param login
   * @param email
   * @param password
   * @param phone
   */
  public async registration(
    login: string,
    email: string,
    password: string,
    phone: string,
  ): Promise<UserAPIResult> {
    try {
      const result: XMLHttpRequest = (await Fetch.post(URL.REGISTRATION.url, {
        method: URL.REGISTRATION.method,
        data: {
          login: login,
          email: email,
          phone: phone,
          password: password,
          first_name: '',
          second_name: '',
        },
      })) as XMLHttpRequest;

      if (result.status >= 400) {
        return this.parseErrorAndResponse(result);
      }

      const user = await UserAPI.getUser();

      if (!user)
        return {
          state: true,
          user: {
            id: 0,
            login: login,
            email: email,
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
      return this.responseError();
    }
  }

  /**
   * Обновляем аватарку у пользователя
   * @param formData
   */
  public async updateAvatar(formData: FormData): Promise<UserAPIResult> {
    try {
      const result: XMLHttpRequest = (await Fetch.put(URL.UPDATE_AVATAR.url, {
        isFormData: true,
        data: formData,
      })) as XMLHttpRequest;

      if (result.status >= 400) {
        return this.responseError('avatar', result.response);
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
      return this.responseError(
        'avatar',
        'Слишком большой размер картинки или неверный формат :( ',
      );
    }
  }

  /**
   * Меняем пароль пользователю
   * @param oldPassword
   * @param newPassword
   */
  public async updatePassword(oldPassword: string, newPassword: string): Promise<UserAPIResult> {
    try {
      const result: XMLHttpRequest = (await Fetch.put(URL.UPDATE_PASSWORD.url, {
        method: URL.UPDATE_PASSWORD.method,
        data: {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
      })) as XMLHttpRequest;

      if (result.status >= 400) {
        return this.responseError('default', result.response);
      }

      return {
        state: true,
        errors: [],
      };
    } catch (error) {
      return this.responseError();
    }
  }

  /**
   * Обновляем пользователя
   * @param name
   * @param surname
   * @param displayName
   * @param login
   * @param email
   * @param phone
   */
  public async updateUser(
    name: string,
    surname: string,
    displayName: string,
    login: string,
    email: string,
    phone: string,
  ): Promise<UserAPIResult> {
    try {
      const result: XMLHttpRequest = (await Fetch.put(URL.UPDATE_USER.url, {
        method: URL.UPDATE_USER.method,
        data: {
          first_name: name,
          second_name: surname,
          display_name: displayName,
          login: login,
          email: email,
          phone: phone,
        },
      })) as XMLHttpRequest;

      if (result.status >= 400) {
        return this.parseErrorAndResponse(result);
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
      return this.responseError();
    }
  }
}

export const UserAPI = new _UserAPI();
