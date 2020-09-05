/**
 * @param { String } formClassName
 * @param { Template } RegisterButton
 */
export const RegisterFormTemplate = `
  <form class="{{ formClassName }}">
    <div class="authentication__inputs">
      <input class="base-input" type="text" name="login" placeholder="Придумайте логин" />
      <span class="login__text-error text-error"></span>
      <input class="base-input" type="password" name="password" placeholder="Придумайте пароль" />
      <span class="password__text-error text-error"></span>
      <input class="base-input" type="password" name="confirmPassword" placeholder="Повторите пароль" />
      <span class="confirmPassword__text-error text-error"></span>
    </div>

    <footer class="authentication__buttons data_controls">
      <a class="data_controls__parallel" href="#">Авторизация</a>
      {{{ RegisterButton }}}
    </footer>
  </form>
`;
