import { showError } from "./ShowError.mjs";
import { hideError } from "./HideError.mjs";

export function inputValidation(formValidation, ev) {
  const input = ev.target;
  const form = input.form;

  const res = formValidation({
    [input.name]: input.value,
  });

  if (res.hasError) {
    showError(res.errors, form, false);
  } else {
    hideError(form, "text-error", input.name);
  }
}
