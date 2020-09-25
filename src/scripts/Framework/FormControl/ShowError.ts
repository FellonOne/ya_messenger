import { hideError } from "./HideError";

export function showError(
  errorsObject: { [key: string]: string },
  formElement: HTMLFormElement,
  hideErrors = true
) {
  const errorsData: Array<Array<string>> = Object.entries(errorsObject);

  if (hideErrors) hideError(formElement, "text-error");

  for (const [fieldName, error] of errorsData) {
    const elem: HTMLElement | null = formElement.querySelector(
      `.${fieldName}__text-error`
    );
    if (!elem) continue;
    elem.textContent = error;
  }
}
