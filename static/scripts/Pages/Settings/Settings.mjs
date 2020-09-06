import { Settings as SettingsTemplate } from "./Settings.tmpl.mjs";
import { SettingsFormTemplate } from "./SettingsForm.tmpl.mjs";
import { MainButton } from "../../Modules/MainButton/MainButton.mjs";
import { FormControl } from "../../FormControl/FormControl.mjs";
import { sendPersonData } from "./SendData.mjs";
import { submitFormValidation } from "./Validation/SubmitFormValidation.mjs";
import { inputValidation } from "../../FormControl/InputValidation.mjs";

const formClassName = "settings__form";

export function RenderSettingsPage() {
  const Template = Handlebars.compile(SettingsTemplate);
  const SettingsForm = Handlebars.compile(SettingsFormTemplate);

  const root = document.querySelector(".messenger");
  root.innerHTML = Template({
    SettingsForm: SettingsForm({
      formClassName: formClassName,
      userName: "Nikita",
      userSurname: "Ivanov",
      userBio: "my bio information",

      CancelButton: MainButton({
        buttonClasses:
          "data-controls__button data-controls__button_type_cancel",
        buttonContent: "Отменить и выйти",
        buttonStyle: "",
      }),
      SubmitButton: MainButton({
        buttonClasses:
          "data-controls__button data-controls__button_type_submit",
        buttonContent: "Сохранить и выйти",
        buttonStyle: "",
        buttonSubmit: "true",
      }),
    }),
  });

  initFormControl();
}

function initFormControl() {
  const formElement = document.querySelector(`.${formClassName}`);

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
