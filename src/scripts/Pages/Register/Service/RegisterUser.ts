import { submitFormValidation } from '../../Settings/Validation/SubmitFormValidation';
import { hideError } from '../../../Framework/FormControl/HideError';
import { showError } from '../../../Framework/FormControl/ShowError';
import { ValidatorUserData } from '../../../Framework/Validator/Validator';
import { AuthorizationService, User } from '../../../Services/AuthorizationService';
import { router } from '../../../router';
import { pagesRoutes } from '../../../pages';
import { convertErrorFromAPI } from '../../../Utils/convertErrorFromAPI';
import { UserAPI } from '../../../API/UserAPI';

export async function registerUser(
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
    const userData = data as {
      login: string;
      email: string;
      password: string;
      phone: string;
    };

    const registrationResult = await UserAPI.registration(
      userData.login,
      userData.email,
      userData.password,
      userData.phone,
    );

    if (!registrationResult.state || !registrationResult.user) {
      const errorsObj = convertErrorFromAPI(registrationResult.errors);
      throw { errors: errorsObj };
    }

    const user: User = registrationResult.user;

    AuthorizationService.authorize(user);
    router.go(pagesRoutes.MAIN_PAGE);
  } catch (error) {
    showError(error.errors, formElement);
  }
}
