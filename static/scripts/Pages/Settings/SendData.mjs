import { showError } from "../../FormControl/ShowError.mjs";
import { hideError } from "../../FormControl/HideError.mjs";

import { submitFormValidation } from "./Validation/SubmitFormValidation.mjs";

export function sendPersonData(data, formElement) {
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