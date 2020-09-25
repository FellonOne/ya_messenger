import { Component } from "../../Framework/Component.js";
import { FormControl } from "../../Framework/FormControl/FormControl.js";
import { inputValidation } from "../../Framework/FormControl/InputValidation.js";
import { submitFormValidation } from "../Settings/Validation/SubmitFormValidation.js";
import { registerUser } from "./Service/RegisterUser.js";
export class Register extends Component {
    constructor() {
        super(...arguments);
        this._formControl = null;
    }
    componentDidMount(props) {
        this.initFormControl();
    }
    initFormControl() {
        const formElement = document.querySelector(`.registration-form`);
        if (formElement === null)
            return;
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
    componentWillUpdate(oldProps, newProps) {
        if (this._formControl !== null) {
            this._formControl.destroy();
            this.initFormControl();
        }
        return true;
    }
    render() {
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
//# sourceMappingURL=Register.js.map