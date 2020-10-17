import { Component } from '../../../Framework/Component';
import { ComponentList } from '../../../Framework/types';

type BaseTextareaProps = {
  value: string;
  name: string;
  classNames: string;
  withValidation: boolean;
  validationClassName: string;
};

export class BaseTextarea extends Component {
  public static defaultProps: BaseTextareaProps;

  constructor(props: BaseTextareaProps, componentList: ComponentList[]) {
    super(
      {
        ...BaseTextarea.defaultProps,
        ...props,
      },
      componentList,
    );
  }

  render(): string {
    const textarea = `<textarea class="{{ classNames }}" name="{{ name }}"></textarea>`;

    if (this.props.withValidation) {
      return (
        textarea +
        `<span class="{{ name }}__{{ validationClassName }} {{ validationClassName }}"></span>`
      );
    }

    return textarea;
  }
}

BaseTextarea.defaultProps = {
  classNames: '',
  name: '',
  value: 'value',
  withValidation: false,
  validationClassName: 'text-error',
};
