import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
// import ExampleConfig from 'app/main/example/ExampleConfig';
import RouteConfigs from 'app/main/RouteConfigs';
import FuseLoading from '@fuse/core/FuseLoading';
import Error404Page from 'app/main/404/Error404Page';
import LoginConfig from 'app/main/login/LoginConfig';
import subRoutesConfig from 'app/fuse-configs/subRoutesConfig';
import LogoutConfig from 'app/main/Logout/LogoutConfig';

const routeConfigs = [RouteConfigs, LoginConfig, LogoutConfig, subRoutesConfig];

const routes = [
  // if you want to make whole app auth protected by default change defaultAuth for example:
  // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
  // The individual route configs which has auth option won't be overridden.
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
  {
    exact: true,
    path: '/',
    component: () => <Redirect to="/login" />,
  },
  {
    path: '/loading',
    exact: true,
    component: () => <FuseLoading />,
  },
  {
    path: '/404',
    component: () => <Error404Page />,
  },
  {
    component: () => <Redirect to="/404" />,
  },
];

export default routes;
