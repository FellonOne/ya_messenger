/**
 * Page Template
 */
import { MainPageTemplate } from "./MainPage.tmpl.mjs";
import { ContactsAsideList } from "./ContactsAside/ContactsAside.mjs";

/**
 * Menu
 */
import { LeftMenu } from "../../Modules/LeftMenu/LeftMenu.mjs";
import { Menu, menuConfig } from "../../Modules/LeftMenu/MenuConfig.mjs";
import { MainButton } from "../../Modules/MainButton/MainButton.mjs";

/**
 * Contacts Searach
 */
import { ContactSearchBar } from "../../Modules/ContactSearchBar/ContactSearchBar.mjs";

/**
 * Conversation
 */
import { NonActiveConversation } from "./Conversation/NonActiveConversation.mjs";
import { ActiveConversation } from "./Conversation/ActiveConversation.mjs";

import { sendMessage } from "./SendMessage.mjs";
import { FormControl } from "../../FormControl/FormControl.mjs";
import { submitFormValidation } from "./Validation/SubmitFormValidation.mjs";
import { messageInputValidation } from "./Validation/MessageInputValidation.mjs";

/**
 * Fake function
 */
function getContactsList() {
  return [
    {
      name: "Test test",
      lastOnline: "22:00",
      lastMessage:
        "Hello, my name is Test test, and I am a developer in the Payme",
    },
    {
      name: "Test test",
      lastOnline: "22:00",
      lastMessage:
        "Hello, my name is Test test, and I am a developer in the Payme",
    },
    {
      name: "Test test",
      lastOnline: "22:00",
      lastMessage:
        "Hello, my name is Test test, and I am a developer in the Payme",
    },
    {
      name: "Test test",
      lastOnline: "22:00",
      lastMessage:
        "Hello, my name is Test test, and I am a developer in the Payme",
    },
    {
      name: "Test test",
      lastOnline: "22:00",
      lastMessage:
        "Hello, my name is Test test, and I am a developer in the Payme",
    },
  ];
}

/**
 * Данные для фармы отправки сообщений
 */
const formData = {
  formClassName: "active-dialog",
  inputName: "messageText",
};

/**
 * Вспомогательный метод для рендера окна дилага (либо его отсутствия)
 * @param {String} pageType
 */
function RenderConversationBlock(pageType) {
  if (pageType !== "Message") return NonActiveConversation();

  const conversationData = {
    ...formData,
  };

  return ActiveConversation(conversationData);
}

/**
 * Функция рендера основной странцы чата
 * @param {String} pageType
 */
export function RenderMainPage(pageType) {
  const contactsList = getContactsList();

  const Template = Handlebars.compile(MainPageTemplate);

  const root = document.querySelector(".messenger");
  root.innerHTML = Template({
    ContactSearchBar: ContactSearchBar({
      menuButtonClass: menuConfig.menuButtonClass,
    }),
    ContactsList: ContactsAsideList({
      contactsList,
    }),
    ConversationBlock: RenderConversationBlock(pageType),
    LeftMenuBlock: LeftMenu({
      CloseButton: MainButton({
        buttonClasses: "left-menu__close-button close-button",
        buttonContent: `<i class="fa fa-times"></i>`,
        buttonStyle: "",
      }),
    }),
  });

  new Menu(
    menuConfig.menuButtonClass,
    menuConfig.backdropClass,
    menuConfig.navClass,
    menuConfig.closeButtonClass
  ).init();

  initFormData();
}

function initFormData() {
  const formElement = document.querySelector(`.${formData.formClassName}`);
  const form = new FormControl(formElement, [formData.inputName]).init();

  form.subscribe(sendMessage);
  /**
   * Передаем инпутам контекс правил валидации формы
   */
  form.subscribeOnBlur(messageInputValidation.bind(null, submitFormValidation));
  form.subscribeOnFocus(
    messageInputValidation.bind(null, submitFormValidation)
  );
}
