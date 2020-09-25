import { submitFormValidation } from "../../Settings/Validation/SubmitFormValidation.js";
import { hideError } from "../../../Framework/FormControl/HideError.js";
import { showError } from "../../../Framework/FormControl/ShowError.js";
export function authorizationUser(data, formElement) {
    try {
        const res = submitFormValidation(data);
        if (res.hasError)
            throw { errors: res.errors, formElement };
        hideError(formElement, "text-error");
        /**
         * Отправляем данные на сервер
         */
        console.log(data);
    }
    catch (error) {
        showError(error.errors, formElement);
        console.log(error);
    }
}
//# sourceMappingURL=AuthorizationUser.js.map