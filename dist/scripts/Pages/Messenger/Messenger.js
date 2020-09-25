import { Component } from "../../Framework/Component.js";
export class Messenger extends Component {
    constructor(props = {}, componentList) {
        super(Object.assign(Messenger.defaultProps, props), componentList);
    }
    render() {
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
                lastMessage: "Hello, my name is Test test, and I am a developer in the Payme",
            },
            {
                name: "Test test",
                lastOnline: "22:00",
                lastMessage: "Hello, my name is Test test, and I am a developer in the Payme",
            },
            {
                name: "Test test",
                lastOnline: "22:00",
                lastMessage: "Hello, my name is Test test, and I am a developer in the Payme",
            },
            {
                name: "Test test",
                lastOnline: "22:00",
                lastMessage: "Hello, my name is Test test, and I am a developer in the Payme",
            },
            {
                name: "Test test",
                lastOnline: "22:00",
                lastMessage: "Hello, my name is Test test, and I am a developer in the Payme",
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
//# sourceMappingURL=Messenger.js.map