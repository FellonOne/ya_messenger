/**
 * @param {Array} contactsList
 */
export const MainPageContactsTemplate = `
  <ul class="contacts__list">
    {{#each contactsList}}
      <li class="person contacts__element">
        <div>
          <div class="person__avatar"></div>
        </div>
        <div class="person__information">
          <header class="person__header">
            <h6 class="person__name">{{ this.name }}</h6>

            <small class="person__last-messege-date">{{ this.lastOnline }}</small>
          </header>
          <p class="person__last-messege">
            {{ this.lastMessage }}
          </p>
        </div>
      </li>
    {{/each}}
  </ul>
`