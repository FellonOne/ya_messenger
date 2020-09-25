import { Component } from "../../Framework/Component.js";
export class ErrorPage extends Component {
    constructor(props = {}, componentList = []) {
        super(Object.assign(ErrorPage.defaultProps, props), componentList);
    }
    render() {
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
//# sourceMappingURL=ErrorPage.js.map