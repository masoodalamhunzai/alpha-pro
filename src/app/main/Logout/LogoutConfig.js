import { authRoles } from 'app/auth';
import store from 'app/store';
import { logoutUser } from 'app/auth/store/userSlice';

const LogoutConfig = {
  auth: authRoles.user,
  routes: [
    {
      path: '/logout',
      component: () => {
        store.dispatch(logoutUser());
        localStorage.removeItem('jwt_access_token');
        localStorage.removeItem('user');
        window.location.reload(true);
        return 'Logging out..';
      },
    },
  ],
};

export default LogoutConfig;
