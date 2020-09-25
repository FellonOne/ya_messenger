import { Component } from "../../Framework/Component";
import { FormControl } from "../../Framework/FormControl/FormControl";
import { ComponentProps } from "../../Framework/types";
import { inputValidation } from "../../Framework/FormControl/InputValidation";
import { submitFormValidation } from "../Settings/Validation/SubmitFormValidation";
import { registerUser } from "./Service/RegisterUser";

export class Register extends Component {
  private _formControl: FormControl | null = null;

  componentDidMount(props: ComponentProps) {
    this.initFormControl();
  }

  initFormControl(): void {
    const formElement: HTMLFormElement = document.querySelector(
      `.registration-form`
    ) as HTMLFormElement;
    if (formElement === null) return;

    const form = new FormControl(formElement, [
      "login",
      "password",
      "confirmPassword",
    ]).init();

    form.subscribe(registerUser);

    /**
     * Передаем инпутам контекс правил валидации формы
     */
    form.subscribeOnBlur(inputValidation.bind(null, submitFormValidation));
    form.subscribeOnFocus(inputValidation.bind(null, submitFormValidation));
  }

  componentWillUpdate(
    oldProps: ComponentProps,
    newProps: ComponentProps
  ): boolean {
    if (this._formControl !== null) {
      this._formControl.destroy();
      this.initFormControl();
    }

    return true;
  }

  render(): string {
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
