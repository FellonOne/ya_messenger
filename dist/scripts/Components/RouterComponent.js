import { Component } from "../Framework/Component.js";
import { GetRandomString } from "../Framework/Utils/RandomString.js";
import { router } from "../router.js";
export class RouterComponent extends Component {
    constructor(props, componentList) {
        super(Object.assign(Object.assign({}, RouterComponent.defaultProps), props));
        this.goToComp = this.goToComp.bind(this);
    }
    addListener() {
        if (!this.routeId)
            return;
        this._link = document.getElementById(this.routeId);
        if (!this._link)
            return;
        this._link.addEventListener("click", this.goToComp);
    }
    removeListener() {
        if (this._link) {
            this._link.removeEventListener("click", this.goToComp);
        }
    }
    goToComp(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        const router = this.props.router;
        if (!router)
            throw Error("incorrect router in RouterComponent");
        router.go(("/" + this.props.page));
    }
    componentDidMount(props) {
        this.addListener();
    }
    componentWillUpdate(oldProps, newProps) {
        this.removeListener();
        return true;
    }
    componentDidUpdate(oldProps, newProps) {
        this.removeListener();
        this.addListener();
    }
    componentWillUnmount(props) {
        this.removeListener();
    }
    render() {
        this.routeId = GetRandomString();
        return `
      <a className="{{ classNames }}" id="${this.routeId}" href=''>{{ linkText }}</a>
    `;
    }
}
RouterComponent.defaultProps = {
    linkText: "На главную",
    page: "/" /* MAIN_PAGE */,
    router: router,
    classNames: "",
};
//# sourceMappingURL=RouterComponent.js.map