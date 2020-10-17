import { Component } from '../Framework/Component';
import { ComponentList } from '../Framework/types';

type ChangeAvatarFormProps = {
  inputName: string;
  formClassName: string;
};

export class ChangeAvatarForm extends Component {
  public static defaultProps: ChangeAvatarFormProps;

  constructor(props: ChangeAvatarFormProps, componentList: ComponentList[]) {
    super(
      {
        ...ChangeAvatarForm.defaultProps,
        ...props,
      },
      componentList,
    );
  }

  render(): string {
    return `
      <form class="{{ formClassName }}" enctype="multipart/form-data">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <BaseInput
            classNames="data-controls__file-input"
            name="{{ inputName }}"
            type="file"
            placeholder="Выберите картинку"
          />
          <Button
            textContent="Сменить"
            classNames="data-controls__button data-controls__button_type_submit"
            isSubmit="true"
          />
        </div>
        <div>
            <span class="avatar__text-error text-error" style="padding-bottom: 0"></span>
        </div>
      </form>
    `;
  }
}

ChangeAvatarForm.defaultProps = {
  formClassName: 'changeAvatarForm',
  inputName: 'avatar',
};
