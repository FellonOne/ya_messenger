import { Component } from "../../../Framework/Component";

export class Conversation extends Component {
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
