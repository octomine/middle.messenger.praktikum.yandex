import Router from './router/Router';
import PageLogin from './pages/login';
import PageSignUp from './pages/sign-up';
import PageProfile from './pages/profile';
import PageMessenger from './pages/messenger';
import PageStatus from './pages/status';

window.addEventListener('DOMContentLoaded', () => {
  Router
    .use('/', PageLogin)
    .use('/sign-up', PageSignUp)
    .use('/settings', PageProfile)
    .use('/messenger', PageMessenger)
    .notFound(PageStatus)
    .start();
});
