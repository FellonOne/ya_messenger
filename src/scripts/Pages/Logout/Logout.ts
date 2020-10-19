import { Component } from '../../Framework/Component';
import { router } from '../../router';
import { pagesRoutes } from '../../pages';
import { UserAPI } from '../../API/UserAPI';

export class Logout extends Component {
  componentDidMount() {
    UserAPI.logout().finally(() => {
      router.go(pagesRoutes.LOGIN);
    });
  }

  render(): string {
    return "<section class='authentication messenger__authentication'>Logout...</section>";
  }
}
