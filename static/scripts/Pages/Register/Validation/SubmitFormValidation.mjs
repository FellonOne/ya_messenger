import { Validator } from "../../../Validator/Validator.mjs";
import { ValidatorRules } from "../../../Validator/ValidatorRules.mjs";

export function submitFormValidation(data) {
  return Validator.validate(
    {
      login: ValidatorRules.init().required().maxLength(25).minLength(6),
      password: ValidatorRules.init().required().minLength(6).maxLength(16),
      confirmPassword: ValidatorRules.init().required().minLength(6).maxLength(16),
    },
    data
  );
}
