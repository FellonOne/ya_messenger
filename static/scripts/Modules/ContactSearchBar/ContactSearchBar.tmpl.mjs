/**
 * @param { String } menuButtonClass
 */
export const ContactSearchBarTemplate = `
  <header class="contacts-controls">
    <span class="{{ menuButtonClass }}" title="Меню">
      <i class="fa fa-bars"></i>
    </span>
    <form class="contacts-controls__search-form">
      <input
        type="text"
        name="contacts_search"
        class="contacts-controls__search"
        placeholder="Поиск по контактам"
      />
    </form>
  </header>
`;
