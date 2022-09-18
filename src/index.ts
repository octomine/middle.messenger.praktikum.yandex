import Router from './router/Router';
import PageLogin from './pages/login';
import PageSignup from './pages/sign-up';
import PageProfile from './pages/profile';
import PageMessenger from './pages/messenger';
import PageStatus from './pages/status';
import ControllerAuth from './controllers/ControllerAuth';

window.addEventListener('DOMContentLoaded', () => {
  Router
    .use('/', PageLogin)
    .use('/sign-up', PageSignup)
    .use('/settings', PageProfile)
    .use('/messenger', PageMessenger)
    .notFound(PageStatus);

  ControllerAuth.fetchUser()
    .then(() => {
      // TODO: вот тут проверять адрес, если логин или регистрация, то идти в чат
    }).catch(() => {
      Router.go('/');
    }).finally(() => {
      Router.start();
    });
});
