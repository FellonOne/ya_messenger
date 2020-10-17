import { Component } from '../../../Framework/Component';
import { ComponentList } from '../../../Framework/types';

type ConversationProps = {
  chatOpen?: boolean;
  chatId?: number | null;
};

export class Conversation extends Component {
  public static defaultProps: ConversationProps;

  constructor(props: ConversationProps = {}, componentList: ComponentList[]) {
    super(
      {
        ...Conversation.defaultProps,
        ...props,
      },
      componentList,
    );
  }

  render(): string {
    return `
      <section class="conversation">
         <div class="choose-chat conversation__choose-chat">
           <h5 class="choose-chat__title">Выберите собеседника</h5>
         </div>
      </section>
    `;
  }
}

Conversation.defaultProps = {};
