import { showError } from "./ShowError.js";
import { hideError } from "./HideError.js";
export function inputValidation(formValidation, ev) {
    const input = ev.target;
    if (input === null)
        return;
    const form = input.form;
    if (!form)
        return;
    const res = formValidation({
        [input.name]: input.value,
    });
    if (res.hasError) {
        showError(res.errors, form, false);
    }
    else {
        hideError(form, "text-error", input.name);
    }
}
//# sourceMappingURL=InputValidation.js.map