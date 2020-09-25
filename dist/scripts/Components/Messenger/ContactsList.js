import { Component } from "../../Framework/Component.js";
export class ContactsList extends Component {
    constructor(props, componentList) {
        super(Object.assign(ContactsList.defaultProps, props), componentList);
    }
    render() {
        const { contactsList } = this.props;
        const res = contactsList
            .map(({ lastMessage, lastOnline, name }) => {
            return `
        <li class="person contacts__element">
          <div>
            <div class="person__avatar"></div>
          </div>
          <div class="person__information">
            <header class="person__header">
              <h6 class="person__name">${name}</h6>
              
              <small class="person__last-messege-date">${lastOnline}</small>
            </header>
            <p class="person__last-messege">
              ${lastMessage}
            </p>
          </div>
        </li>
      `;
        })
            .join("");
        return `
      <ul class="contacts__list">
        ${res}  
      </ul>
    `;
    }
}
ContactsList.defaultProps = {
    contactsList: [
        {
            name: "Василий Пупкин",
            lastOnline: "Понедельник, 22:00",
            lastMessage: "Привет! Это мое последнее сообщение в чате",
        },
    ],
};
//# sourceMappingURL=ContactsList.js.map