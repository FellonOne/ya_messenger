import { Component } from '../../../Framework/Component';
import { ComponentList } from '../../../Framework/types';

export type ButtonProps = {
  textContent: string;
  isSubmit: boolean;
  attrs: string;
  classNames: string;
  onClick: ((ev: Event) => void) | null;
  buttonId: string | null;
};

export class Button extends Component {
  private _buttonElement: HTMLElement | null = null;

  public static defaultProps: ButtonProps;

  constructor(props: ButtonProps, componentList: ComponentList[]) {
    super(
      {
        ...Button.defaultProps,
        ...props,
      },
      componentList,
    );
  }

  /**
   * Устанавливаем событие по клику на кнопку
   * (если оно пришло)
   * @param props
   */
  setClickEvent(props: ButtonProps): void {
    if (props.onClick !== null && props.buttonId !== null) {
      this._buttonElement = document.getElementById(props.buttonId);

      if (this._buttonElement === null) throw Error(`incorrect Button id => ${props.buttonId}`);

      this._buttonElement.addEventListener('click', props.onClick);
    }
  }

  componentDidMount(props: ButtonProps): void {
    this.setClickEvent(props);
  }

  componentDidUpdate(oldProps: ButtonProps, newProps: ButtonProps): void {
    this.setClickEvent(newProps);
  }

  /**
   * Из-за особенностей реализации, мы удаляем событие и заного подписываем новое
   * так, как без удаления, события могут просто весеть (
   * @param oldProps
   * @param newProps
   */
  componentWillUpdate(oldProps: ButtonProps): boolean {
    if (oldProps.onClick !== null && oldProps.buttonId !== null) {
      this._buttonElement?.removeEventListener('click', oldProps.onClick);
    }

    return true;
  }

  public render(): string {
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
  textContent: 'Уппс, забыли установить текст кнопке :)',
  isSubmit: false,
  attrs: '',
  classNames: '',
  onClick: null,
  buttonId: null,
};
