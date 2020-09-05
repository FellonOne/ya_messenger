/**
 * @param {Template} AuthorizeForm
 */
export const AuthorizeTemplate = `
  <section class="authentication messenger__authentication">
    <div class="authentication__container">
      <header class="authentication__header">
        <h2 class="authentication__title">Авторизация</h2>
      </header>
      {{{ AuthorizeForm }}}
    </div>
  </section>
`;
