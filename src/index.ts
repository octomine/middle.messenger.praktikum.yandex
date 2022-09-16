import Router from './router/Router';
import PageLogin from './pages/login';
import PageSignUp from './pages/sign-up';
import PageProfile from './pages/profile';
import PageMessenger from './pages/messenger';
import PageStatus from './pages/status';
import ControllerUserAuth from './controllers/user-auth';


const controller = new ControllerUserAuth();

window.addEventListener('DOMContentLoaded', () => {
  Router
    .use('/', PageLogin)
    .use('/sign-up', PageSignUp)
    .use('/settings', PageProfile)
    .use('/messenger', PageMessenger)
    .notFound(PageStatus)

  controller.getProfile()
    .then(() => {
      // TODO: вот тут проверять адрес, если логин или регистрация, то идти в чат
    }).catch(() => {
      Router.go('/');
    }).finally(() => {
      Router.start()
    });
});
