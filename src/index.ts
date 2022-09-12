import Router from "./router/Router"
import Login from "./pages/login";
import SignUp from "./pages/sign-up";

window.addEventListener('DOMContentLoaded', () => {
  Router
    .use('/', Login)
    .use('/sign-up', SignUp)
    .start();
});
