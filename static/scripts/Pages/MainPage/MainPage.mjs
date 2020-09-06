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

/**
 * Contacts Searach
 */
import { ContactSearchBar } from "../../Modules/ContactSearchBar/ContactSearchBar.mjs";

/**
 * Conversation
 */
import { NonActiveConversation } from "./Conversation/NonActiveConversation.mjs";
import { ActiveConversation } from "./Conversation/ActiveConversation.mjs";

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
    ConversationBlock:
      pageType === "Message" ? ActiveConversation() : NonActiveConversation(),
    LeftMenuBlock: LeftMenu(),
  });

  new Menu(
    menuConfig.menuButtonClass,
    menuConfig.backdropClass,
    menuConfig.navClass,
    menuConfig.closeButtonClass
  ).init();
}
