import { router } from "./router.js";
import { Messenger } from "./Pages/Messenger/Messenger.js";
import { componentList } from "./componentList.js";
import { Settings } from "./Pages/Settings/Settings.js";
import { Login } from "./Pages/Login/Login.js";
import { Register } from "./Pages/Register/Register.js";
import { ErrorPage } from "./Pages/Error/ErrorPage.js";
router
    .use("/" /* MAIN_PAGE */, Messenger, {}, componentList)
    .use("/chat/{id}" /* CHAT */, Messenger, {}, componentList)
    .use("/settings" /* SETTING */, Settings, {}, componentList)
    .use("/login" /* LOGIN */, Login, {}, componentList)
    .use("/register" /* REGISTER */, Register, {}, componentList)
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
//# sourceMappingURL=index.js.map