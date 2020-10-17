import { Component } from '../../Framework/Component';
import { Logout as LogoutAPI } from '../../API/Logout';
import { router } from '../../router';
import { pagesRoutes } from '../../pages';

export class Logout extends Component {
  componentDidMount() {
    new LogoutAPI().perform().finally(() => {
      router.go(pagesRoutes.LOGIN);
    });
  }

  render(): string {
    return "<section class='authentication messenger__authentication'>Logout...</section>";
  }
}
