import { authorizeUser } from "./AuthorizeAccount.mjs";
import { AuthorizeTemplate } from "./Auth.tmpl.mjs";
import { AuthorizeFormTemplate } from "./AuthForm.tmpl.mjs";
import { FormControl } from "../../FormControl/FormControl.mjs";
import { MainButton } from "../../Modules/MainButton/MainButton.mjs";
import { submitFormValidation } from "./Validation/SubmitFormValidation.mjs";
import { inputValidation } from "../../FormControl/InputValidation.mjs";

const foromClassName = "authentication__form";

export function RenderAuthPage() {
  const Template = Handlebars.compile(AuthorizeTemplate);
  const AuthorizeForm = Handlebars.compile(AuthorizeFormTemplate);

  const root = document.querySelector(".messenger");
  root.innerHTML = Template({
    AuthorizeForm: AuthorizeForm({
      formClassName: foromClassName,
      AuthorizationButton: MainButton({
        buttonClasses:
          "data-controls__button data-controls__button_type_submit",
        buttonContent: "Войти",
        buttonStyle: "",
      }),
    }),
  });

  initFormControl();
}

function initFormControl() {
  const formElement = document.querySelector(`.${foromClassName}`);
  const form = new FormControl(formElement, ["login", "password"])
    .init("submit")
    .focus()
    .blur();

  form.subscribe(authorizeUser);

  /**
   * Передаем инпутам контекс правил валидации формы
   */
  form.subscribeOnBlur(inputValidation.bind(null, submitFormValidation));
  form.subscribeOnFocus(inputValidation.bind(null, submitFormValidation));
}
