import { submitFormValidation } from "./Validation/SubmitFormValidation.mjs";

export function sendMessage(data, formElement) {
  const res = submitFormValidation(data);

  if (res.hasError) {
    console.log("error => ", res.errors);
  } else {
    console.log(data);
  }
}
