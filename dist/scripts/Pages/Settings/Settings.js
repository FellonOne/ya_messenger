import { Component } from "../../Framework/Component.js";
import { FormControl } from "../../Framework/FormControl/FormControl.js";
import { inputValidation } from "../../Framework/FormControl/InputValidation.js";
import { submitFormValidation } from "./Validation/SubmitFormValidation.js";
import { sendPersonData } from "./Service/SendPersonData.js";
export class Settings extends Component {
    constructor(props = {}, componentList) {
        super(Object.assign(Settings.defaultProps, props), componentList);
    }
    componentDidMount(props) {
        this.initFormControl();
    }
    initFormControl() {
        const formElement = document.querySelector(`.settings-form`);
        if (formElement === null)
            return;
        const form = new FormControl(formElement, [
            "name",
            "surname",
            "password",
            "confirmPassword",
            "bio",
        ]).init();
        form.subscribe(sendPersonData);
        /**
         * Передаем инпутам контекс правил валидации формы
         */
        form.subscribeOnBlur(inputValidation.bind(null, submitFormValidation));
        form.subscribeOnFocus(inputValidation.bind(null, submitFormValidation));
    }
    render() {
        return `
      <section class="settings messenger__settings">
        <div class="settings__container">
          <header class="settings__header">
          <h5 class="settings__title">Настройки</h5>
          <RouterComponent 
            classNames="settings__close-button close-button" 
            page="/"
            linkText="**buttonText**"
          />
          </header>
          <SettingsForm formClassName="settings-form" /> 
        </div>
      </section>
    `;
    }
}
Settings.defaultProps = {
    buttonText: `<i title="Закрыть" class="fa fa-times"></i>`,
};
//# sourceMappingURL=Settings.js.map