import { Component } from "../../Framework/Component";
import { ComponentList } from "../../Framework/types";
import { FormControl } from "../../Framework/FormControl/FormControl";
import { inputValidation } from "../../Framework/FormControl/InputValidation";
import { submitFormValidation } from "./Validation/SubmitFormValidation";
import { sendPersonData } from "./Service/SendPersonData";

type SettingsProps = {
  buttonText?: string;
};

export class Settings extends Component {
  public static defaultProps: SettingsProps;

  constructor(props: SettingsProps = {}, componentList: ComponentList[]) {
    super(Object.assign(Settings.defaultProps, props), componentList);
  }

  componentDidMount(props: SettingsProps) {
    this.initFormControl();
  }

  initFormControl() {
    const formElement: HTMLFormElement = document.querySelector(
      `.settings-form`
    ) as HTMLFormElement;
    if (formElement === null) return;

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

  render(): string {
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
