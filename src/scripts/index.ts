import { router } from "./router";
import { Messenger } from "./Pages/Messenger/Messenger";
import { componentList } from "./componentList";
import { Settings } from "./Pages/Settings/Settings";
import { Login } from "./Pages/Login/Login";
import { Register } from "./Pages/Register/Register";
import { ErrorPage } from "./Pages/Error/ErrorPage";
import { pagesRoutes } from "./pages";

router
  .use(pagesRoutes.MAIN_PAGE, Messenger, {}, componentList)
  .use(pagesRoutes.CHAT, Messenger, {}, componentList)
  .use(pagesRoutes.SETTING, Settings, {}, componentList)
  .use(pagesRoutes.LOGIN, Login, {}, componentList)
  .use(pagesRoutes.REGISTER, Register, {}, componentList)
  .useOnError(ErrorPage, {}, componentList);
router.start();

/**
 * Чтоб посмотреть переходы :)
 */
// setTimeout(() => {
//   router.go("/settings");
// }, 5000);
//
// setTimeout(() => {
//   router.go("/login");
// }, 10000);
//
// setTimeout(() => {
//   router.go("/register");
// }, 15000);
//
// setTimeout(() => {
//   router.go("/");
// }, 20000);
