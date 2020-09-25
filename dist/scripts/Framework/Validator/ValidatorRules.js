import { Validator } from "./Validator.js";
export class ValidatorRules {
    constructor() {
        this._rules = [];
    }
    static init() {
        return new ValidatorRules();
    }
    get rules() {
        return this._rules;
    }
    maxLength(num) {
        this.rules.push(`${Validator.rules.maxLength}:${num}`);
        return this;
    }
    minLength(num) {
        this.rules.push(`${Validator.rules.minLength}:${num}`);
        return this;
    }
    required() {
        this.rules.push(`${Validator.rules.required}:true`);
        return this;
    }
    onlyLetters() {
        this.rules.push(`${Validator.rules.onlyLetters}:true`);
        return this;
    }
    noBadWords() {
        this.rules.push(`${Validator.rules.noBadWords}:true`);
        return this;
    }
}
//# sourceMappingURL=ValidatorRules.js.map