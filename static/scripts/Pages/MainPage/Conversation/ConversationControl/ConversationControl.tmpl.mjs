/**
 * @param { Template } SubmitButton
 * @param { String } inputName
 * @param { String } formClassName
 */
export const ConversationControlTemplate = `
  <div class="typing">
    <form class="{{ formClassName }} typing__form">
      <input
        placeholder="Ваше сообщение"
        class="message-field typing__input"
        name="{{ inputName }}"
      />
      {{{ SubmitButton }}}
    </form>
  </div>
`