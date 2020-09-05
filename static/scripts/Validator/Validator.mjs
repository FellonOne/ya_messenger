import {
  hasLengthField,
  isEmpty,
  hasOnlyLetters,
  hasBadWords,
} from "./Util.mjs";

export class Validator {
  static validate(rulesObject, userData) {
    const result = {
      errors: {},
      hasError: false,
    };
    const rulesData = Object.entries(rulesObject);
    const keysUserData = Object.keys(userData);

    for (const [field, fieldRules] of rulesData) {
      if (!keysUserData.includes(field)) continue;
      const validator = new Validator(field, userData[field]);

      for (const rule of fieldRules.rules) {
        const fName = rule.split(":")[0];
        const value = rule.split(":")[1];

        validator[fName](value);
      }

      if (validator.hasError) {
        result.hasError = true;
        result.errors = {
          ...result.errors,
          ...validator.errors,
        };
      }
    }

    return result;
  }

  static get rules() {
    return {
      maxLength: "_maxLength",
      minLength: "_minLength",
      onlyLetters: "_onlyLetters",
      noBadWords: "_noBadWords",
      required: "_required",
    };
  }

  constructor(field, value) {
    this.field = field.trim();
    this.value = value.trim();
    this.errors = {};

    return this;
  }

  get hasError() {
    if (Object.keys(this.errors).length > 0) return true;
    return false;
  }

  _maxLength(num) {
    if (this.hasError) return this;

    const hasLength = hasLengthField(this.value);
    const badMaxLength = !(hasLength && this.value.length <= num);

    if (badMaxLength)
      this.errors[this.field] = `Длина поля превышает ${num} символов`;
    return this;
  }

  _minLength(num) {
    if (this.hasError) return this;

    const hasLength = hasLengthField(this.value);
    const badMinLength = !(hasLength && this.value.length >= num);

    if (badMinLength)
      this.errors[this.field] = `Длина поля должна быть больше ${num} символов`;
    return this;
  }

  _required() {
    if (this.hasError) return this;

    if (isEmpty(this.value))
      this.errors[this.field] = `Поле обязательно для заполнения`;
    return this;
  }

  _onlyLetters() {
    if (this.hasError) return this;

    if (!hasOnlyLetters(this.value))
      this.errors[this.field] = `Поле должно содержать только буквы`;
    return this;
  }

  _noBadWords() {
    if (this.hasError) return this;

    if (hasBadWords(this.value))
      this.errors[
        this.field
      ] = `У нас тут культурное общество, не используется брань!`;
    return this;
  }
}

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
