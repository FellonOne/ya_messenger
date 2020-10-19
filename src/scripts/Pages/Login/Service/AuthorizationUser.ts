import { submitFormValidation } from '../../Settings/Validation/SubmitFormValidation';
import { hideError } from '../../../Framework/FormControl/HideError';
import { showError } from '../../../Framework/FormControl/ShowError';
import { ValidatorUserData } from '../../../Framework/Validator/Validator';
import { convertErrorFromAPI } from '../../../Utils/convertErrorFromAPI';
import { AuthorizationService, User } from '../../../Services/AuthorizationService';
import { router } from '../../../router';
import { pagesRoutes } from '../../../pages';
import { UserAPI } from '../../../API/UserAPI';

export async function authorizationUser(
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
    const responseAuth = await UserAPI.authorization(data.login, data.password);

    if (!responseAuth.state) {
      const errorsObj = convertErrorFromAPI(responseAuth.errors);
      throw { errors: errorsObj };
    }

    const userData: User | null | undefined = await UserAPI.getUser();
    if (!userData) {
      throw { errors: { default: 'Сервер не отвечает :(' } };
    }

    AuthorizationService.authorize(userData);
    router.go(pagesRoutes.MAIN_PAGE);
  } catch (error) {
    showError(error.errors, formElement);
  }
}
