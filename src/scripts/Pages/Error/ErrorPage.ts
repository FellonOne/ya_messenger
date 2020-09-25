import { Component } from "../../Framework/Component";
import { ComponentList } from "../../Framework/types";

export type ErrorProps = {
  errorCode?: string;
  errorMessage?: string;
  route?: string;
};

export class ErrorPage extends Component {
  public static defaultProps: ErrorProps;

  constructor(props: ErrorProps = {}, componentList: ComponentList[] = []) {
    super(Object.assign(ErrorPage.defaultProps, props), componentList);
  }

  render(): string {
    return `
      <section class="error messenger__error">
        <div class="error_container">
          <header class="error__code">
            <span class="error__code-title">{{ errorCode }}</span>
          </header>
          <div class="error__message">
            <p class="error__message-text">
              {{ errorMessage }}
            </p>
          </div>
          <footer class="error__links">
            <a href="#">На главную</a>
          </footer>
        </div>
      </section>
    `;
  }
}

ErrorPage.defaultProps = {
  errorCode: "404",
  errorMessage: "Такой страницы не <br /> существует :(",
  route: "",
};
