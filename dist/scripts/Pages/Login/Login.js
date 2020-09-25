import { Component } from "../../Framework/Component.js";
import { FormControl } from "../../Framework/FormControl/FormControl.js";
import { inputValidation } from "../../Framework/FormControl/InputValidation.js";
import { submitFormValidation } from "../Settings/Validation/SubmitFormValidation.js";
import { authorizationUser } from "./Service/AuthorizationUser.js";
export class Login extends Component {
    constructor() {
        super(...arguments);
        this._formControl = null;
    }
    componentDidMount(props) {
        this.initFormControl();
    }
    initFormControl() {
        const formElement = document.querySelector(`.authentication__form`);
        if (formElement === null)
            return;
        this._formControl = new FormControl(formElement, [
            "login",
            "password",
        ]).init();
        this._formControl.subscribe(authorizationUser);
        /**
         * Передаем инпутам контекс правил валидации формы
         */
        this._formControl.subscribeOnBlur(inputValidation.bind(null, submitFormValidation));
        this._formControl.subscribeOnFocus(inputValidation.bind(null, submitFormValidation));
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
//# sourceMappingURL=Login.js.map