import { RegisterTemplate } from "./Register.tmpl.mjs";
import { RegisterFormTemplate } from "./RegisterForm.tmpl.mjs";
import { registerUserAccount } from "./RegisterAccount.mjs";
import { inputValidation } from "../../FormControl/InputValidation.mjs";
import { FormControl } from "../../FormControl/FormControl.mjs";
import { MainButton } from "../../Modules/MainButton/MainButton.mjs";
import { submitFormValidation } from "./Validation/SubmitFormValidation.mjs";

const formClassName = "authentication__form";

export function RenderRegisterPage() {
  const Template = Handlebars.compile(RegisterTemplate);
  const RegisterForm = Handlebars.compile(RegisterFormTemplate);

  const root = document.querySelector(".messenger");
  root.innerHTML = Template({
    RegisterForm: RegisterForm({
      formClassName: formClassName,
      RegisterButton: MainButton({
        buttonClasses:
          "data-controls__button data-controls__button_type_submit",
        buttonContent: "Зарегистрироваться",
        buttonStyle: "",
        buttonSubmit: true,
      }),
    }),
  });

  initFormControl();
}

function initFormControl() {
  const formElement = document.querySelector(`.${formClassName}`);
  const form = new FormControl(formElement, [
    "login",
    "password",
    "confirmPassword",
  ]).init();

  form.subscribe(registerUserAccount);

  /**
   * Передаем инпутам контекс правил валидации формы
   */
  form.subscribeOnBlur(inputValidation.bind(null, submitFormValidation));
  form.subscribeOnFocus(inputValidation.bind(null, submitFormValidation));
}
