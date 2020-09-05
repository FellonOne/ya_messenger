/**
 * Поля в шаблоне
 * @param { String } formClassName
 * @param { String } userName
 * @param { String } userSurname
 * @param { String } userBio
 */
export const SettingsFormTemplate = `
  <form class="{{ formClassName }}">
    <div class="settings__account account">
      <div class="account__container">
        <div class="account__avatar avatar-container">
          <div class="avatar-container__image"></div>
        </div>
        <div class="account__name">
          <input class="account__input" name="name" value="{{ userName }}" placeholder="Введите Ваше имя"/>
          <span class="name__text-error text-error"></span>
          <input class="account__input" name="surname" value="{{ userSurname }}" placeholder="Введите Вашу Фамилию" />
          <span class="surname__text-error text-error"></span>
        </div>
      </div>
    </div>

    <div class="settings__bio-control bio-control">
      <div class="bio-control__container">
        <p class="bio-control__title">
          Заполнить краткую информацию "О себе":
        </p>
        <textarea class="bio-control__textarea" name="bio">{{ userBio }}</textarea>
        <span class="bio__text-error text-error"></span>
      </div>
    </div>

    <div class="settings__password-control password-control">
      <div class="password-control__container">
        <input class="base-input" type="password" placeholder="Старый пароль" name="password" />
        <span class="password__text-error text-error"></span>
        <input class="base-input" type="password" placeholder="Новый пароль"  name="confirmPassword" />
        <span class="confirmPassword__text-error text-error"></span>
      </div>
    </div>

    <footer class="settings__footer data-controls">
      {{{ CancelButton }}}
      {{{ SubmitButton }}}
    </footer>
  </form>
`;
