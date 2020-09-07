/**
 * @param { Template } settingsFormTemplate
 * @param { Template } CloseButton
 */
export const Settings = `
  <section class="settings messenger__settings">
    <div class="settings__container">
      <header class="settings__header">
        <h5 class="settings__title">Настройки</h5>
        {{{ CloseButton }}}
      </header>
      {{{ SettingsForm }}}
    </div>
  </section>
`;
