import { Component } from "../../../Framework/Component.js";
export class Button extends Component {
    constructor(props, componentList) {
        super(Object.assign(Button.defaultProps, props), componentList);
        this._buttonElement = null;
    }
    /**
     * Устанавливаем событие по клику на кнопку
     * (если оно пришло)
     * @param props
     */
    setClickEvent(props) {
        if (props.onClick !== null && props.buttonId !== null) {
            this._buttonElement = document.getElementById(props.buttonId);
            if (this._buttonElement === null)
                throw Error(`incorrect Button id => ${props.buttonId}`);
            this._buttonElement.addEventListener("click", props.onClick);
        }
    }
    componentDidMount(props) {
        this.setClickEvent(props);
    }
    componentDidUpdate(oldProps, newProps) {
        this.setClickEvent(newProps);
    }
    /**
     * Из-за особенностей реализации, мы удаляем событие и заного подписываем новое
     * так, как без удаления, события могут просто весеть (
     * @param oldProps
     * @param newProps
     */
    componentWillUpdate(oldProps, newProps) {
        var _a;
        if (oldProps.onClick !== null && oldProps.buttonId !== null) {
            (_a = this._buttonElement) === null || _a === void 0 ? void 0 : _a.removeEventListener("click", oldProps.onClick);
        }
        return true;
    }
    render() {
        return `
      <button
         id="{{ buttonId }}"
         className="{{ classNames }}" 
         data-submit="{{ isSubmit }}"
      > 
        {{ textContent }}
      </button>
    `;
    }
}
Button.defaultProps = {
    textContent: "Уппс, забыли установить текст кнопке :)",
    isSubmit: false,
    attrs: "",
    classNames: "",
    onClick: null,
    buttonId: null,
};
//# sourceMappingURL=Button.js.map