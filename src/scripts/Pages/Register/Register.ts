import { Component } from '../../Framework/Component';
import { FormControl } from '../../Framework/FormControl/FormControl';
import { inputValidation } from '../../Framework/FormControl/InputValidation';
import { submitFormValidation } from '../Settings/Validation/SubmitFormValidation';
import { registerUser } from './Service/RegisterUser';

export class Register extends Component {
  private _formControl: FormControl | null = null;

  componentDidMount(): void {
    this.initFormControl();
    console.log(`--- Register did mount ---`);
  }

  initFormControl(): void {
    const formElement: HTMLFormElement = document.querySelector(
      `.registration-form`,
    ) as HTMLFormElement;
    if (formElement === null) return;

    this._formControl = new FormControl(formElement, [
      'login',
      'email',
      'phone',
      'password',
    ]).init();

    this._formControl.subscribe(registerUser);

    /**
     * Передаем инпутам контекс правил валидации формы
     */
    this._formControl.subscribeOnBlur(inputValidation.bind(null, submitFormValidation));
    this._formControl.subscribeOnFocus(inputValidation.bind(null, submitFormValidation));
  }

  componentWillUpdate(): boolean {
    console.log(`--- Register will update ---`);
    if (this._formControl !== null) {
      this._formControl.destroy();
    }

    return true;
  }

  componentWillUnmount(): void {
    console.log(`--- Register will Unmount ---`);
    if (this._formControl !== null) {
      this._formControl.destroy();
    }
  }

  componentDidUpdate(): void {
    console.log(`--- Register did Update ---`);
    if (this._formControl !== null) {
      this._formControl.destroy();
    }

    this.initFormControl();
  }

  render(): string {
    console.log(`--- Register render ---`);
    return `
      <section class="authentication messenger__authentication">
        <div class="authentication__container">
          <header class="authentication__header">
            <h2 class="authentication__title">Регистрация</h2>
          </header>
          <RegisterForm
            formClassName="registration-form"
          />
        </div>
      </section>
    `;
  }
}
