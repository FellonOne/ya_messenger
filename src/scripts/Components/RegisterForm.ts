import { Component } from "../Framework/Component";
import { ComponentList } from "../Framework/types";
import { pagesRoutes } from "../pages";

type RegisterFormProps = {
  formClassName: string;
  loginRoute: string;
};

export class RegisterForm extends Component {
  public static defaultProps: RegisterFormProps;

  constructor(props: RegisterFormProps, componentList: ComponentList[]) {
    super(Object.assign(RegisterForm.defaultProps, props), componentList);
  }

  render(): string {
    return `
      <form class="{{ formClassName }} authentication__form">
        <div class="authentication__inputs">
           <BaseInput
            classNames="base-input"
            name="login"
            type="text"
            placeholder="Придумайте логин"
            withValidation="true" 
          />
          
           <BaseInput
            classNames="base-input"
            name="password"
            type="password"
            placeholder="Придумайте пароль"
            withValidation="true" 
          />
          
          <BaseInput
            classNames="base-input"
            name="confirmPassword"
            type="password"
            placeholder="Повторите пароль"
            withValidation="true" 
          />
        </div>
    
        <footer class="authentication__buttons data_controls">
          <RouterComponent
            linkText="Авторизация"
            page="{{ loginRoute }}"
            classNames="data_controls__parallel"
          />
          <Button
            textContent="Зарегистрироваться"
            classNames="data-controls__button data-controls__button_type_submit"
            isSubmit="true"
          />
        </footer>
      </form>
    `;
  }
}

RegisterForm.defaultProps = {
  formClassName: "registration-form",
  loginRoute: pagesRoutes.LOGIN,
};
