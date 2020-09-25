import { Component } from "../../../Framework/Component.js";
export class BaseInput extends Component {
    constructor(props, componentList) {
        super(Object.assign(BaseInput.defaultProps, props), componentList);
    }
    render() {
        const inputTemplate = `
        <input type="{{ type }}" class="{{ classNames }}" name="{{ name }}" value="{{ value }}" placeholder="{{ placeholder }}"/>
    `;
        if (this.props.withValidation) {
            return (inputTemplate +
                `<span class="{{ name }}__{{ validationClassName }} {{ validationClassName }}"></span>`);
        }
        return inputTemplate;
    }
}
BaseInput.defaultProps = {
    type: "text",
    classNames: "",
    name: "",
    placeholder: "",
    value: "",
    withValidation: false,
    validationClassName: "text-error",
};
//# sourceMappingURL=BaseInput.js.map