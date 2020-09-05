export const LeftMenuTemplate = `
  <nav class="left-menu">
    <button class="left-menu__close-button close-button">
      <i class="fa fa-times"></i>
    </button>

    <header class="left-menu__account account">
      <div class="account__container">
        <div class="account__avatar"></div>
        <div class="account__name">
          <span>Василий</span>
          <span>Пупкин</span>
        </div>
      </div>
    </header>

    <section class="left-menu__navigation">
      <ul class="messenger-navigation">
        <li class="messenger-navigation__element"><a href="#">Чаты</a></li>
        <li class="messenger-navigation__element">
          <a href="#">Настройки</a>
        </li>
      </ul>

      <footer class="left-menu__footer">
        <a href="#">Выйти</a>
      </footer>
    </section>
  </nav>

  <div class="backdrop"></div>
`;
