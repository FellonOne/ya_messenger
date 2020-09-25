import { Component } from "../../../Framework/Component.js";
import { router } from "../../../router.js";
export class ItemList extends Component {
    constructor(props, componentList) {
        super(Object.assign(ItemList.defaultProps, props), componentList);
    }
    render() {
        if (!this.props.hasOwnProperty("menuList") ||
            !Array.isArray(this.props.menuList))
            return "";
        const { menuList } = this.props;
        return menuList
            .map(({ text, url }) => {
            return `
                <li class="messenger-navigation__element">
                    <RouterComponent
                      linkText="${text}"
                      router="**router**"
                      page="${url}"
                    />
                </li>`;
        })
            .join("");
    }
}
ItemList.defaultProps = {
    menuList: [],
    router: router,
};
//# sourceMappingURL=ItemList.js.map