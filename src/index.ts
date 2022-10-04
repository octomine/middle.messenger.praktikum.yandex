import Router from './router/Router';
import PageLogin from './pages/login';
import PageSignup from './pages/sign-up';
import PageProfile from './pages/profile';
import PageMessenger from './pages/messenger';
import PageStatus from './pages/status';
import ControllerAuth from './controllers/ControllerAuth';
import { render } from './utils/render';
import PopupWrapper from './wrappers/popup-wrapper';

import './common.less';

window.addEventListener('DOMContentLoaded', () => {
  Router
    .use('/', PageLogin)
    .use('/sign-up', PageSignup)
    .use('/settings', PageProfile)
    .use('/messenger', PageMessenger)
    .notFound(PageStatus);

  const popup = new PopupWrapper({ modifiers: 'hidden' });
  render('.popup', popup);

  ControllerAuth.fetchUser()
    .then(() => {
      if (Router.pathname === '/' || Router.pathname === '/sing-up') {
        Router.go('/messenger');
      }
    }).catch(() => {
      Router.go('/');
    }).finally(() => {
      Router.start();
    });
});
