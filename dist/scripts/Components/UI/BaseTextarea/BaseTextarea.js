import { Component } from "../../../Framework/Component.js";
export class BaseTextarea extends Component {
    constructor(props, componentList) {
        super(Object.assign(BaseTextarea.defaultProps, props), componentList);
    }
    render() {
        const textarea = `<textarea class="{{ classNames }}" name="{{ name }}"></textarea>`;
        if (this.props.withValidation) {
            return (textarea +
                `<span class="{{ name }}__{{ validationClassName }} {{ validationClassName }}"></span>`);
        }
        return textarea;
    }
}
BaseTextarea.defaultProps = {
    classNames: "",
    name: "",
    value: "value",
    withValidation: false,
    validationClassName: "text-error",
};
//# sourceMappingURL=BaseTextarea.js.map