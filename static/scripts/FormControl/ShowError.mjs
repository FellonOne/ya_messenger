import { hideError } from "./HideError.mjs";

export function showError(errorsObject, formElement) {
  const errorsData = Object.entries(errorsObject);

  hideError(formElement, "text-error");

  for (const [fieldName, error] of errorsData) {
    const elem = formElement.querySelector(`.${fieldName}__text-error`);
    if (!elem) continue;
    elem.textContent = error;
  }
}
