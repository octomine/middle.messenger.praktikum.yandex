import Router from './router/Router';
import PageLogin from './pages/login';
import PageSignUp from './pages/sign-up';
import PageProfile from './pages/profile';

window.addEventListener('DOMContentLoaded', () => {
  Router
    .use('/', PageLogin)
    .use('/sign-up', PageSignUp)
    .use('/settings', PageProfile)
    .start();
});
