import { submitFormValidation } from '../../Settings/Validation/SubmitFormValidation';
import { hideError } from '../../../Framework/FormControl/HideError';
import { showError } from '../../../Framework/FormControl/ShowError';
import { ValidatorUserData } from '../../../Framework/Validator/Validator';
import { Authorization } from '../../../API/Authorization';
import { convertErrorFromAPI } from '../../../Utils/convertErrorFromAPI';
import { AuthorizationService, User } from '../../../Services/AuthorizationService';
import { router } from '../../../router';
import { pagesRoutes } from '../../../pages';
import { GetUser } from '../../../API/GetUser';

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
    const responseAuth = await new Authorization(data.login, data.password).perform();

    if (!responseAuth.state) {
      const errorsObj = convertErrorFromAPI(responseAuth.errors);
      throw { errors: errorsObj };
    }

    const userData: User | null = await new GetUser().perform();
    if (!userData) {
      throw { errors: { default: 'Сервер не отвечает :(' } };
    }

    AuthorizationService.authorize(userData);
    router.go(pagesRoutes.MAIN_PAGE);
  } catch (error) {
    console.log(error);
    showError(error.errors, formElement);
  }
}
