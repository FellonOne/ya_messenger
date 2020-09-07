/**
 * @param { Template } Messages 
 * @param { Template } ConversationControlForm
 */
export const ActiveConversationTemplate = `
  <section class="conversation">
    <header class="interlocutor">
      <div class="interlocutor__person">
        <div class="interlocutor__person-status"></div>
        <div class="interlocutor__person-name">Василий Григоривич</div>
      </div>
    </header>

    <div class="messages">
      <div class="messages__black-container">
        {{{ Messages }}}
      </div>
    </div>

    {{{ ConversationControlForm }}}
  </section>
`