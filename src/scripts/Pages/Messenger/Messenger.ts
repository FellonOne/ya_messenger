import { Component } from "../../Framework/Component";
import { MenuProps } from "../../Components/Menu/Menu";
import { ConcatctsListProps } from "../../Components/Messenger/ContactsList";
import { ComponentList } from "../../Framework/types";

export type MessengerProps = {
  menuData?: MenuProps;
  contactsData?: ConcatctsListProps;
};

export class Messenger extends Component {
  public static defaultProps: MessengerProps;

  constructor(props: MessengerProps = {}, componentList: ComponentList[]) {
    super(Object.assign(Messenger.defaultProps, props), componentList);
  }

  render(): string {
    return `
      <Menu
        logoutUrl="#"
        menuList="**menuData.menuList**"
        userName="**menuData.userName**"
        userSurname="**menuData.userSurname**"
      />
      <section class="left-aside">
        <ContactSearch />
        
        <div class="contacts">
          <ContactsList
            contactsList="**contactsData.contactsList**"
          />
        </div>
      </section>
      <Conversation />
    `;
  }
}

Messenger.defaultProps = {
  contactsData: {
    contactsList: [
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
    ],
  },
  menuData: {
    userName: "Василий",
    userSurname: "Пупкин",
    logoutUrl: "#",
    menuList: [
      { text: "Мессенджер", url: "/" },
      { text: "Профиль", url: "/settings" },
      { text: "Авторизация", url: "/login" },
      { text: "Регистрация", url: "/register" },
    ],
  },
};
