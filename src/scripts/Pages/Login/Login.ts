import { Component } from "../../Framework/Component";
import { ComponentProps } from "../../Framework/types";
import { FormControl } from "../../Framework/FormControl/FormControl";
import { inputValidation } from "../../Framework/FormControl/InputValidation";
import { submitFormValidation } from "../Settings/Validation/SubmitFormValidation";
import { authorizationUser } from "./Service/AuthorizationUser";

export class Login extends Component {
  private _formControl: FormControl | null = null;

  componentDidMount(props: ComponentProps) {
    this.initFormControl();
  }

  initFormControl(): void {
    const formElement: HTMLFormElement = document.querySelector(
      `.authentication__form`
    ) as HTMLFormElement;
    if (formElement === null) return;

    this._formControl = new FormControl(formElement, [
      "login",
      "password",
    ]).init();
    this._formControl.subscribe(authorizationUser);

    /**
     * Передаем инпутам контекс правил валидации формы
     */
    this._formControl.subscribeOnBlur(
      inputValidation.bind(null, submitFormValidation)
    );
    this._formControl.subscribeOnFocus(
      inputValidation.bind(null, submitFormValidation)
    );
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
            <h2 class="authentication__title">Авторизация</h2>
          </header>
          <LoginForm
            formClassName="authentication__form"
          />        
        </div>
      </section>
    `;
  }
}
