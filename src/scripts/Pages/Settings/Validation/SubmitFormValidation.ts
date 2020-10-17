import { Validator, ValidatorUserData } from '../../../Framework/Validator/Validator';
import { ValidatorRules } from '../../../Framework/Validator/ValidatorRules';

export function submitFormValidation(
  data: ValidatorUserData,
): ReturnType<typeof Validator.validate> {
  return Validator.validate(
    {
      login: ValidatorRules.init().required().maxLength(25).minLength(4).noBadWords(),
      name: ValidatorRules.init().required().maxLength(25).minLength(3).onlyLetters().noBadWords(),
      surname: ValidatorRules.init()
        .required()
        .maxLength(25)
        .minLength(3)
        .onlyLetters()
        .noBadWords(),
      phone: ValidatorRules.init().required().maxLength(20).minLength(8),
      email: ValidatorRules.init().maxLength(22).minLength(3).required(),
      bio: ValidatorRules.init().maxLength(255),
      password: ValidatorRules.init().required().minLength(5).maxLength(16),
      chatName: ValidatorRules.init().required().minLength(5).maxLength(58).noBadWords(),
      userLogin: ValidatorRules.init().required().minLength(4).maxLength(35),
    },
    data,
  );
}
