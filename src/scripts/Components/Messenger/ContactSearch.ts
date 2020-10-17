import { Component } from '../../Framework/Component';

export class ContactSearch extends Component {
  render(): string {
    return `
      <header class="contacts-controls">
        <span class="contacts-controls__menu" title="Меню">
          <i class="fa fa-bars"></i>
        </span>
        <form class="contacts-controls__search-form">
          <BaseInput
            classNames="contacts-controls__search" 
            type="text"
            name="contacts_search"
            placeholder="Поиск по контактам"
          />
        </form> 
      </header>
    `;
  }
}
