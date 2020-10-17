import { showError } from './ShowError';
import { hideError } from './HideError';

// eslint-disable-next-line @typescript-eslint/ban-types
export function inputValidation(formValidation: Function, ev: Event): void {
  const input: HTMLInputElement = ev.target as HTMLInputElement;
  if (input === null) return;

  const form = input.form;
  if (!form) return;

  const res = formValidation({
    [input.name]: input.value,
  });

  if (res.hasError) {
    showError(res.errors, form, false);
  } else {
    hideError(form as HTMLFormElement, 'text-error', input.name);
  }
}
