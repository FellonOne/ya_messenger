import { Validator } from "../../../Validator/Validator.mjs";
import { ValidatorRules } from "../../../Validator/ValidatorRules.mjs";

export function submitFormValidation(data) {
  return Validator.validate(
    {
      name: ValidatorRules.init()
        .required()
        .maxLength(25)
        .minLength(3)
        .onlyLetters()
        .noBadWords(),
      surname: ValidatorRules.init()
        .required()
        .maxLength(25)
        .minLength(3)
        .onlyLetters()
        .noBadWords(),
      bio: ValidatorRules.init().maxLength(255),
      password: ValidatorRules.init().required().minLength(6).maxLength(16),
      confirmPassword: ValidatorRules.init()
        .required()
        .minLength(6)
        .maxLength(16),
    },
    data
  );
}
