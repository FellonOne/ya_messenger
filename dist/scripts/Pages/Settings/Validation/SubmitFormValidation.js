import { Validator, } from "../../../Framework/Validator/Validator.js";
import { ValidatorRules } from "../../../Framework/Validator/ValidatorRules.js";
export function submitFormValidation(data) {
    return Validator.validate({
        login: ValidatorRules.init()
            .required()
            .maxLength(25)
            .minLength(4)
            .noBadWords(),
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
    }, data);
}
//# sourceMappingURL=SubmitFormValidation.js.map