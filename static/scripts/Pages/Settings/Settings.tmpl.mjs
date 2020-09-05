/**
 * @param { Template } settingsFormTemplate
 */
export const Settings = `
  <section class="settings messenger__settings">
    <div class="settings__container">
      <header class="settings__header">
        <h5 class="settings__title">Настройки</h5>
        <button class="settings__close-button close-button">
          <i title="Закрыть" class="fa fa-times"></i>
        </button>
      </header>
      {{{ SettingsForm }}}
    </div>
  </section>
`;
