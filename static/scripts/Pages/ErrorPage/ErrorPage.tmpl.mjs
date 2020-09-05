/**
 * @param { String } errorCode
 * @param { Stirg | HTML } errorMessage
 */
export const ErrorPageTemplate = `
  <section class="error messenger__error">
    <div class="error_container">
      <header class="error__code">
        <span class="error__code-title">{{ errorCode }}</span>
      </header>
      <div class="error__message">
        <p class="error__message-text">
          {{{ errorMessage }}}
        </p>
      </div>
      <footer class="error__links">
        <a href="#">На главную</a>
      </footer>
    </div>
  </section>
`;
