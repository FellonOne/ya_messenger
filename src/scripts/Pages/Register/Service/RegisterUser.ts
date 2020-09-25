import { submitFormValidation } from "../../Settings/Validation/SubmitFormValidation";
import { hideError } from "../../../Framework/FormControl/HideError";
import { showError } from "../../../Framework/FormControl/ShowError";
import { ValidatorUserData } from "../../../Framework/Validator/Validator";

export function registerUser(
  data: ValidatorUserData,
  formElement: HTMLFormElement
): void {
  try {
    const res = submitFormValidation(data);

    if (res.hasError) throw { errors: res.errors, formElement };
    hideError(formElement, "text-error");

    /**
     * Отправляем данные на сервер
     */
    console.log(data);
  } catch (error) {
    showError(error.errors, formElement);
    console.log(error);
  }
}
