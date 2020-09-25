import { Component } from "../Framework/Component.js";
export class SettingsForm extends Component {
    constructor(props, componentList) {
        super(Object.assign(SettingsForm.defaultProps, props), componentList);
    }
    componentDidMount(props) { }
    render() {
        return `
      <form class="{{ formClassName }}">
        <div class="settings__account account">
          <div class="account__container">
            <div class="account__avatar avatar-container">
              <div class="avatar-container__image"></div>
            </div>
            <div class="account__name">
              <BaseInput
                classNames="account__input"
                name="name"
                value="{{ userName }}"
                placeholder="Введите Ваше имя"
                withValidation="true" 
              />
              <BaseInput
                classNames="account__input"
                name="surname"
                value="{{ userSurname }}"
                placeholder="Введите Вашу Фамилию"
                withValidation="true" 
              />
            </div>
          </div>
        </div>
    
        <div class="settings__bio-control bio-control">
          <div class="bio-control__container">
            <p class="bio-control__title">
              Заполнить краткую информацию "О себе":
            </p>
            <BaseTextarea 
              name="bio"
              classNames="bio-control__textarea"
              value="userBio"
              withValidation="true"
            />
          </div>
        </div>
    
        <div class="settings__password-control password-control">
          <div class="password-control__container">
            <BaseInput
                classNames="base-input"
                name="password"
                type="password"
                placeholder="Старый пароль"
                withValidation="true" 
            />
            <BaseInput
              classNames="base-input"
              name="confirmPassword"
              type="password"
              placeholder="Новый пароль"
              withValidation="true" 
            />
          </div>
        </div>
    
        <footer class="settings__footer data-controls">
          <RouterComponent 
            classNames="data-controls__button data-controls__button_type_cancel" 
            linkText="Отменить и выйти"
            page="/"
          />
          <Button
            classNames="data-controls__button data-controls__button_type_submit"
            textContent="Сохранить"
            buttonId="settingSubmit"
            isSubmit="true"
          />
        </footer>
      </form>
    `;
    }
}
SettingsForm.defaultProps = {
    userBio: "",
    userName: "",
    userSurname: "",
    formClassName: "settings-form",
    stopPropagation: (event) => {
        event.stopPropagation();
        event.preventDefault();
    },
};
//# sourceMappingURL=SettingsForm.js.map