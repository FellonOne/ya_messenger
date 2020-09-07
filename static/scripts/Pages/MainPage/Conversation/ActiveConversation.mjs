import { ActiveConversationTemplate } from "./ActiveConversation.tmpl.mjs";
import { Messages } from "./Messages/Messages.mjs";
import { ConversationControl } from "./ConversationControl/ConversationControl.mjs";

import { MainButton } from "../../../Modules/MainButton/MainButton.mjs";

/**
 * Функция для рендера диалога с пользователем
 * @param {object} dataObject
 */
export function ActiveConversation(dataObject) {
  const Template = Handlebars.compile(ActiveConversationTemplate);

  return Template({
    Messages: Messages({}),
    ConversationControlForm: ConversationControl({
      SubmitButton: MainButton({
        buttonClasses: "send-message typing__button",
        buttonContent: "Отправить",
        buttonStyle: "",
        buttonSubmit: true,
      }),
      formClassName: dataObject.formClassName,
      inputName: dataObject.inputName,
    }),
  });
}
