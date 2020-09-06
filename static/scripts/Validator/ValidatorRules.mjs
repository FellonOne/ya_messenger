import { Validator } from "./Validator.mjs";

export class ValidatorRules {
  constructor() {
    this.rules = [];
  }

  static init() {
    return new ValidatorRules();
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
