import { Component } from '../../Framework/Component';
import { ComponentList } from '../../Framework/types';
import { FormControl } from '../../Framework/FormControl/FormControl';
import { inputValidation } from '../../Framework/FormControl/InputValidation';
import { submitFormValidation } from './Validation/SubmitFormValidation';
import { sendPersonData } from './Service/SendPersonData';
import { GetUser } from '../../API/GetUser';
import { AuthorizationService } from '../../Services/AuthorizationService';
import { updateAvatarHandler } from './Service/UpdateAvatar';

type SettingsProps = {
  buttonText?: string;
  userName?: string;
  userSurname?: string;
  userDisplayName?: string;
  userAvatar?: string;
};

export class Settings extends Component {
  public static defaultProps: SettingsProps;

  private _formControl: FormControl | null = null;

  constructor(props: SettingsProps = {}, componentList: ComponentList[]) {
    super(Object.assign(Settings.defaultProps, props), componentList);

    this.updateAvatar = this.updateAvatar.bind(this);
  }

  componentDidMount(): void {
    this.initFormControl();
    this.initUpdateAvatarControl();

    new GetUser().perform().then((userData) => {
      if (userData) {
        this.setProps({
          userName: userData.name,
          userSurname: userData.surname,
          userDisplayName: userData.displayName,
          userAvatar: userData.avatar,
        });
      }
    });
  }

  updateAvatar(ev: Event): void {
    updateAvatarHandler(ev).then((res) => {
      if (res)
        this.setProps({
          userAvatar: AuthorizationService.getUser()?.avatar,
        });
    });
  }

  initFormControl(): void {
    const formElement: HTMLFormElement = document.querySelector(
      `.settings-form`,
    ) as HTMLFormElement;
    if (formElement === null) return;

    this._formControl = new FormControl(formElement, [
      'name',
      'surname',
      'displayName',
      'oldPassword',
      'newPassword',
    ]).init();

    this._formControl.subscribe(sendPersonData);

    /**
     * Передаем инпутам контекс правил валидации формы
     */
    this._formControl.subscribeOnBlur(inputValidation.bind(null, submitFormValidation));
    this._formControl.subscribeOnFocus(inputValidation.bind(null, submitFormValidation));
  }

  initUpdateAvatarControl(): void {
    const form = document.querySelector('.changeAvatarForm');
    if (form) {
      form.addEventListener('submit', this.updateAvatar);
    }
  }

  destroyAvatarControl(): void {
    const form = document.querySelector('.changeAvatarForm');
    if (form) {
      form.removeEventListener('submit', this.updateAvatar);
    }
  }

  destroyFormControl(): void {
    if (this._formControl !== null) {
      this._formControl.destroy();
      this.initFormControl();
    }
  }

  componentWillUpdate(): boolean {
    this.destroyFormControl();
    this.destroyAvatarControl();
    this.initUpdateAvatarControl();
    return true;
  }

  componentWillUnmount(): void {
    this.destroyFormControl();
    this.destroyAvatarControl();
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
          <SettingsForm 
            formClassName="settings-form"
            userName="{{ userName }}"
            userSurname="{{ userSurname }}"
            userDisplayName="{{ userDisplayName }}"
            userAvatar="{{ userAvatar }}"
            
            changeAvatarFormName="changeAvatarForm"
            changeAvatarInputName="avatar"
          /> 
        </div>
      </section>
    `;
  }
}

Settings.defaultProps = {
  buttonText: `<i title="Закрыть" class="fa fa-times"></i>`,
  userName: AuthorizationService.getUser()?.name,
  userSurname: AuthorizationService.getUser()?.surname,
  userDisplayName: AuthorizationService.getUser()?.displayName,
  userAvatar: AuthorizationService.getUser()?.avatar,
};
