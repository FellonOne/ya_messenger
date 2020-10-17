import { Component } from '../../../Framework/Component';
import { ComponentList } from '../../../Framework/types';

type BaseInputProps = {
  value: string;
  name: string;
  classNames: string;
  type: string;
  placeholder: string;
  withValidation: boolean;
  validationClassName: string;
  id?: string;
};

export class BaseInput extends Component {
  public static defaultProps: BaseInputProps;

  constructor(props: BaseInputProps, componentList: ComponentList[]) {
    super(
      {
        ...BaseInput.defaultProps,
        ...props,
      },
      componentList,
    );
  }

  render(): string {
    const inputTemplate = `
        <input id="{{ id }}" name="{{ name }}" value="{{ value }}" type="{{ type }}" class="{{ classNames }}" placeholder="{{ placeholder }}" />
    `;
    if (this.props.withValidation) {
      return (
        inputTemplate +
        `<span class="{{ name }}__{{ validationClassName }} {{ validationClassName }}"></span>`
      );
    }

    return inputTemplate;
  }
}

BaseInput.defaultProps = {
  type: 'text',
  classNames: '',
  name: '',
  placeholder: '',
  value: '',
  withValidation: false,
  validationClassName: 'text-error',
  id: '',
};
