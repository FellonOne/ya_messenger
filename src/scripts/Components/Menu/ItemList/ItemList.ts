import { Component } from "../../../Framework/Component";
import { ComponentList } from "../../../Framework/types";
import { Router } from "../../../Framework/Router/Router";
import { router } from "../../../router";

type ItemListProps = {
  menuList: { url: string; text: string }[];
  router?: Router;
};

export class ItemList extends Component {
  public static defaultProps: ItemListProps;

  constructor(props: ItemListProps, componentList: ComponentList[]) {
    super(Object.assign(ItemList.defaultProps, props), componentList);
  }

  render(): string {
    if (
      !this.props.hasOwnProperty("menuList") ||
      !Array.isArray(this.props.menuList)
    )
      return "";

    const { menuList } = this.props as ItemListProps;

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
