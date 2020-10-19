import { submitFormValidation } from '../Validation/SubmitFormValidation';
import { hideError } from '../../../Framework/FormControl/HideError';
import { showError } from '../../../Framework/FormControl/ShowError';
import { ValidatorUserData } from '../../../Framework/Validator/Validator';
import { AuthorizationService, User } from '../../../Services/AuthorizationService';
import { convertErrorFromAPI } from '../../../Utils/convertErrorFromAPI';
import { isEmpty } from '../../../Framework/Utils/isEmpty';
import { router } from '../../../router';
import { pagesRoutes } from '../../../pages';
import { UserAPI } from '../../../API/UserAPI';

export async function sendPersonData(
  data: ValidatorUserData,
  formElement: HTMLFormElement,
): Promise<void> {
  try {
    const res = submitFormValidation(data);

    if (res.hasError) throw { errors: res.errors, formElement };
    hideError(formElement, 'text-error');

    /**
     * Отправляем данные на сервер
     */
    const updateUserData = {
      userName: data.name,
      userSurname: data.surname,
      userDisplayName: data.displayName,
    };

    const passwordData = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };

    if (
      passwordData.oldPassword &&
      (!passwordData.newPassword || isEmpty(passwordData.newPassword))
    ) {
      throw {
        errors: {
          newPassword: 'Придумайте новый пароль',
        },
      };
    }

    if (
      passwordData.newPassword &&
      (!passwordData.oldPassword || isEmpty(passwordData.oldPassword))
    ) {
      throw {
        errors: {
          oldPassword: 'Укажите ваш текущий пароль',
        },
      };
    }

    /**
     * Обновляем данные пользователя
     */
    const user = AuthorizationService.getUser();
    if (!user) {
      throw { errors: { default: 'Произошла ошибка :( ' } };
    }

    const result = await UserAPI.updateUser(
      updateUserData.userName,
      updateUserData.userSurname,
      updateUserData.userDisplayName,
      user.login,
      user.email,
      user.phone,
    );

    if (!result.state) {
      const errorsObj = convertErrorFromAPI(result.errors);
      throw { errors: errorsObj };
    }

    const newUser: User | undefined | null = result.user;
    if (newUser) AuthorizationService.authorize(newUser);

    /**
     * Обновляем пароль (если он указан)
     */
    if (passwordData.oldPassword && passwordData.newPassword) {
      const updatePasswordResult = await UserAPI.updatePassword(
        passwordData.oldPassword,
        passwordData.newPassword,
      );

      if (!updatePasswordResult.state) {
        const errorsObj = convertErrorFromAPI(updatePasswordResult.errors);
        throw { errors: errorsObj };
      }

      if (window && window.alert) window.alert('Пожалуйста, авторизируйтесь с новым паролем');
      router.go(pagesRoutes.LOGOUT);
    }

    if (window && window.alert) window.alert('Данные обновленны');
  } catch (error) {
    showError(error.errors, formElement);
    console.log(error);
  }
}
