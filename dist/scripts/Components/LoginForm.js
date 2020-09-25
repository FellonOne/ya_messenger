import { Component } from "../Framework/Component.js";
export class LoginForm extends Component {
    constructor(props, componentList) {
        super(Object.assign(LoginForm.defaultProps, props), componentList);
    }
    render() {
        return `
    <form class="{{ formClassName }}">
      <div class="authentication__inputs">
        <BaseInput
          classNames="base-input"
          name="login"
          type="text"
          placeholder="Ваш логин"
          withValidation="true" 
        />
        
        <BaseInput
          classNames="base-input"
          name="password"
          type="password"
          placeholder="Ваш пароль"
          withValidation="true" 
        />
      </div>

      <footer class="authentication__buttons data_controls">
        <RouterComponent
          linkText="Регистрация"
          page="{{ registerRoute }}"
          classNames="data_controls__parallel"
        />
        <Button
          textContent="Войти"
          classNames="data-controls__button data-controls__button_type_submit" 
          isSubmit="true"
        />
      </footer>
    </form>
    `;
    }
}
LoginForm.defaultProps = {
    formClassName: "",
    registerRoute: "/register" /* REGISTER */,
};
//# sourceMappingURL=LoginForm.js.map