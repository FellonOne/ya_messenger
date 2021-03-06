import { hasLengthField, hasOnlyLetters, hasBadWords } from './Util';
import { isEmpty } from '../Utils/isEmpty';

type RulesObject = {
  [key: string]: {
    rules: string[];
  };
};

export type ValidatorUserData = {
  [key: string]: string;
};

export type ValidatorErrorData = {
  [key: string]: string;
};

export class Validator {
  private readonly errors: ValidatorErrorData;

  constructor(private field: string, private value: string) {
    this.errors = {};
  }

  static validate(
    rulesObject: RulesObject,
    userData: ValidatorUserData,
  ): {
    hasError: boolean;
    errors: { [key: string]: string };
  } {
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
        const fName: string = rule.split(':')[0];
        const value: string = rule.split(':')[1];

        const validatorFn = validator.getFnByName(fName);
        if (typeof validatorFn === 'function') validatorFn(value);
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

  static get rules(): { [key: string]: string } {
    return {
      maxLength: '_maxLength',
      minLength: '_minLength',
      onlyLetters: '_onlyLetters',
      noBadWords: '_noBadWords',
      required: '_required',
    };
  }

  public getFnByName(fName: string): unknown {
    switch (fName) {
      case '_maxLength':
        return this._maxLength.bind(this);
      case '_minLength':
        return this._minLength.bind(this);
      case '_onlyLetters':
        return this._onlyLetters.bind(this);
      case '_noBadWords':
        return this._noBadWords.bind(this);
      case '_required':
        return this._required.bind(this);
      default:
        throw Error(`unknown function name = ${fName}, in Validator`);
    }
  }

  get hasError(): boolean {
    return Object.keys(this.errors).length > 0;
  }

  private _maxLength(num: number): this {
    if (this.hasError) return this;

    const hasLength = hasLengthField(this.value);
    const badMaxLength = !(hasLength && this.value.length <= num);

    if (badMaxLength) this.errors[this.field] = `Длина поля превышает ${num} символов`;
    return this;
  }

  private _minLength(num: number): this {
    if (this.hasError) return this;

    const hasLength = hasLengthField(this.value);
    const badMinLength = !(hasLength && this.value.length >= num);

    if (badMinLength) this.errors[this.field] = `Длина поля должна быть больше ${num} символов`;
    return this;
  }

  private _required(): this {
    if (this.hasError) return this;

    if (isEmpty(this.value)) this.errors[this.field] = `Поле обязательно для заполнения`;
    return this;
  }

  private _onlyLetters(): this {
    if (this.hasError) return this;

    if (!hasOnlyLetters(this.value)) this.errors[this.field] = `Поле должно содержать только буквы`;
    return this;
  }

  private _noBadWords(): this {
    if (this.hasError) return this;

    if (hasBadWords(this.value))
      this.errors[this.field] = `У нас тут культурное общество, не используется брань!`;
    return this;
  }
}
