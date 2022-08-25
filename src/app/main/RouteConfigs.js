import i18next from "i18next";
import {
  Home,
  UserManagment,
  ItemAnalysis,
  AuthorSiteSettings,
  SessionDetails,
  ItemBankDetails,
  Consumers,
  CustomQuestions,
  ItemBanks,
  Settings,
  MyAccount,
  Logout,
} from "../main";

// import en from './i18n/en';
// import tr from './i18n/tr';
// import ar from './i18n/ar';

// i18next.addResourceBundle('en', 'examplePage', en);
// i18next.addResourceBundle('tr', 'examplePage', tr);
// i18next.addResourceBundle('ar', 'examplePage', ar);

const RouteConfigs = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/user-managment",
      component: UserManagment,
    },
    {
      path: "/user-managment/create-user",
      component: UserManagment,
    },
    {
      path: "/item-analysis",
      component: ItemAnalysis,
    },
    {
      path: "/author-site-settings",
      component: AuthorSiteSettings,
    },
    {
      path: "/session-details",
      component: SessionDetails,
    },
    {
      path: "/item-bank-details",
      component: ItemBankDetails,
    },
    {
      path: "/item-banks",
      component: ItemBanks,
    },
    {
      path: "/consumers",
      component: Consumers,
    },
    {
      path: "/custom-questions",
      component: CustomQuestions,
    },
    {
      path: "/my-account",
      component: MyAccount,
    },
    {
      path: "/settings",
      component: Settings,
    },
    {
      path: "/logout",
      component: Logout,
    },
  ],
};

export default RouteConfigs;
