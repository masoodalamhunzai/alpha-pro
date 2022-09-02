import i18next from "i18next";
import {
  Home,
  OrganizationManagement,
  ManageOrganization,
  UserManagment,
  Items,
  ItemAnalysis,
  CreateItem,
  ItemsBulkUpdate,
  AuthorSiteSettings,
  Activities,
  NewActivity,
  Grade,
  Subject,
  TagHierarchies,
  TagTypes,
  BaseTemplates,
  ActivitiesBulkUpdates,
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
      path: "/organization-management",
      component: OrganizationManagement,
    },
    {
      path: "/manage-organization",
      component: ManageOrganization,
    },
    {
      path: "/user-managment",
      component: UserManagment,
    },
    {
      path: "/create-new-question",
      component: CreateItem,
    },
    {
      path: "/all-questions",
      component: Items,
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
      path: "/question-bulk-update",
      component: ItemsBulkUpdate,
    },

    {
      path: "/grade",
      component: Grade,
    },
    {
      path: "/subject",
      component: Subject,
    },
    {
      path: "/tag-hierarchies",
      component: TagHierarchies,
    },
    {
      path: "/tag-types",
      component: TagTypes,
    },

    {
      path: "/consumers",
      component: Consumers,
    },

    {
      path: "/all-assessments",
      component: Activities,
    },
    {
      path: "/new-assessment",
      component: NewActivity,
    },
    {
      path: "/base-templates",
      component: BaseTemplates,
    },
    {
      path: "/assessments-bulk-updates",
      component: ActivitiesBulkUpdates,
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
    /* {
      path: "/logout",
      component: Logout,
    }, */
  ],
};

export default RouteConfigs;
