import { Component } from '../Framework/Component';
import { ComponentList } from '../Framework/types';
import { isEmpty } from '../Framework/Utils/isEmpty';

type SettingsFormProps = {
  userName: string;
  userSurname: string;
  userDisplayName: string;
  userAvatar: string;
  formClassName: string;
  stopPropagation: (ev: Event) => void;

  changeAvatarFormName: string;
  changeAvatarInputName: string;
};

export class SettingsForm extends Component {
  static defaultProps: SettingsFormProps;

  constructor(props: SettingsFormProps, componentList: ComponentList[]) {
    super(
      {
        ...SettingsForm.defaultProps,
        ...props,
      },
      componentList,
    );
  }

  render(): string {
    let avatar = `<div class="avatar-container__image"></div>`;
    if (this.props.userAvatar && !isEmpty(this.props.userAvatar)) {
      avatar = `<div
                  class="avatar-container__image"
                  style="background-image: url('https://ya-praktikum.tech/${this.props.userAvatar}')"
                 ></div>`;
    }

    return `
      <form class="{{ formClassName }}">
        <div class="settings__account account">
          <div class="account__container">
            ${avatar}
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

        <div class="settings__avatar-changer">
          <ChangeAvatarForm
            formClassName="{{ changeAvatarFormName }}"
            inputName="{{ changeAvatarInputName }}"
          />
        </div>

        <div class="settings__bio-control bio-control">
          <div class="bio-control__container">
            <p class="bio-control__title">
              Ваш никнейм в чате (если не задан, будет использован логин):
            </p>
            <BaseInput
              type="text"
              name="displayName"
              classNames="base-input"
              value="{{ userDisplayName }}"
              withValidation="true"
            />
          </div>
        </div>

        <div class="settings__password-control password-control">
          <div class="password-control__container">
            <BaseInput
                classNames="base-input"
                name="oldPassword"
                type="password"
                placeholder="Старый пароль"
                withValidation="true"
            />
            <BaseInput
              classNames="base-input"
              name="newPassword"
              type="password"
              placeholder="Новый пароль"
              withValidation="true"
            />
          </div>

           <span class="default__text-error text-error" style="padding-bottom: 0"></span>
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
  userDisplayName: '',
  userName: '',
  userSurname: '',
  userAvatar: '',
  formClassName: 'settings-form',

  stopPropagation: (event: Event) => {
    event.stopPropagation();
    event.preventDefault();
  },

  changeAvatarFormName: 'changeAvatarForm',
  changeAvatarInputName: 'avatar',
};
