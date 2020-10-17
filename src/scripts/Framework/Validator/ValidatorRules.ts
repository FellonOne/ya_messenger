import { Validator } from './Validator';

export class ValidatorRules {
  private readonly _rules: string[];
  constructor() {
    this._rules = [];
  }

  static init(): ValidatorRules {
    return new ValidatorRules();
  }

  get rules(): string[] {
    return this._rules;
  }

  public maxLength(num: number): this {
    this.rules.push(`${Validator.rules.maxLength}:${num}`);
    return this;
  }

  public minLength(num: number): this {
    this.rules.push(`${Validator.rules.minLength}:${num}`);
    return this;
  }

  public required(): this {
    this.rules.push(`${Validator.rules.required}:true`);
    return this;
  }

  public onlyLetters(): this {
    this.rules.push(`${Validator.rules.onlyLetters}:true`);
    return this;
  }

  public noBadWords(): this {
    this.rules.push(`${Validator.rules.noBadWords}:true`);
    return this;
  }
}
