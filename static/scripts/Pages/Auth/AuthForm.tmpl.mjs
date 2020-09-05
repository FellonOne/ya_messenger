/**
 * @param {Template} MainButton
 * @param { String } formClassName
 */
export const AuthorizeFormTemplate = `
  <form class="{{ formClassName }}">
    <div class="authentication__inputs">
      <input class="base-input" name="login" type="text" placeholder="Ваш логин" />
      <span class="login__text-error text-error"></span>
      <input class="base-input" name="password" type="password" placeholder="Ваш пароль" />
      <span class="password__text-error text-error"></span>
    </div>

    <footer class="authentication__buttons data_controls">
      <a class="data_controls__parallel" href="#">Регистрация</a>
      {{{ AuthorizationButton }}}
    </footer>
  </form>
`;
