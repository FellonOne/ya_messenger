import { hideError } from "./HideError.js";
export function showError(errorsObject, formElement, hideErrors = true) {
    const errorsData = Object.entries(errorsObject);
    if (hideErrors)
        hideError(formElement, "text-error");
    for (const [fieldName, error] of errorsData) {
        const elem = formElement.querySelector(`.${fieldName}__text-error`);
        if (!elem)
            continue;
        elem.textContent = error;
    }
}
//# sourceMappingURL=ShowError.js.map