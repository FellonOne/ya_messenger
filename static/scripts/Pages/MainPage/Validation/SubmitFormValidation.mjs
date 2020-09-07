import { Validator } from "../../../Validator/Validator.mjs";
import { ValidatorRules } from "../../../Validator/ValidatorRules.mjs";

export function submitFormValidation(data) {
  return Validator.validate(
    {
      messageText: ValidatorRules.init().required().noBadWords(),
    },
    data
  );
}
