import '../static/css/index.scss';

import { router } from './router';
import { Messenger } from './Pages/Messenger/Messenger';
import { componentList } from './componentList';
import { Settings } from './Pages/Settings/Settings';
import { Login } from './Pages/Login/Login';
import { Register } from './Pages/Register/Register';
import { ErrorPage } from './Pages/Error/ErrorPage';
import { pagesRoutes } from './pages';
import { RouteMiddleware } from './Middleware/RouteMiddleware';
import { Auth } from './Middleware/Auth';
import { Logout } from './Pages/Logout/Logout';
import { GroupChat } from './Pages/GroupChat/GroupChat';

const AuthMiddleware = new RouteMiddleware().addMiddleware(new Auth()).setRoute(pagesRoutes.LOGIN);
const IfAuthRedirectMiddleware = new RouteMiddleware()
  .addMiddleware(new Auth(true))
  .setRoute(pagesRoutes.MAIN_PAGE);

router
  .use(pagesRoutes.MAIN_PAGE, Messenger, {}, componentList, [AuthMiddleware])
  .use(pagesRoutes.CHAT, GroupChat, {}, componentList, [AuthMiddleware])
  .use(pagesRoutes.SETTING, Settings, {}, componentList, [AuthMiddleware])
  .use(pagesRoutes.LOGIN, Login, {}, componentList, [IfAuthRedirectMiddleware])
  .use(pagesRoutes.REGISTER, Register, {}, componentList, [IfAuthRedirectMiddleware])
  .use(pagesRoutes.NOT_FOUND, ErrorPage, { errorCode: 404 }, componentList)
  .use(pagesRoutes.ERROR, ErrorPage, { errorCode: 503 }, componentList)
  .use(pagesRoutes.LOGOUT, Logout, {}, componentList)
  .useOnError(ErrorPage, { errorCode: 404 }, componentList)
  .start();
