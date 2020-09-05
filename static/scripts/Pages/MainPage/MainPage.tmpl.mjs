/**
 * @param { Template } ContactsList
 * @param { Template } LeftMenuBlock
 * @param { Template } ConversationBLock
 */
export const MainPageTemplate = `
  {{{ LeftMenuBlock }}}

  <!-- Левый блок: поиск контактов, список контактов -->
  <section class="left-aside">
    {{{ ContactSearchBar }}}

    <div class="contacts">
      {{{ ContactsList }}}
    </div>
  </section>

  <!-- Правый блок: диалоговое окно -->
  {{{ ConversationBlock }}}
`;
