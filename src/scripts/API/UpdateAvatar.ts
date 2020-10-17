import { User } from '../Services/AuthorizationService';
import { Fetch } from '../Framework/Fetch/Fetch';
import { URL } from './URL';

type UpdateAvatarResult = {
  state: boolean;
  user?: User;
  errors: { message: string; field?: string }[];
};

export class UpdateAvatar {
  constructor(private readonly formData: FormData) {}

  public async perform(): Promise<UpdateAvatarResult> {
    try {
      const result: XMLHttpRequest = (await new Fetch().put(URL.UPDATE_AVATAR.url, {
        isFormData: true,
        data: this.formData,
      })) as XMLHttpRequest;

      if (result.status >= 400) {
        return {
          state: false,
          errors: [{ message: result.response, field: 'avatar' }],
        };
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
      console.log(error);

      return {
        state: false,
        errors: [
          {
            field: 'avatar',
            message: 'Слишком большой размер картинки или неверный формат :( ',
          },
        ],
      };
    }
  }
}
