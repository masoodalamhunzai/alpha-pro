import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'applications',
    title: '',
    translate: '',
    type: 'group',
    icon: '',
    children: [
      {
        id: 'home',
        title: 'Home',
        translate: 'Home',
        type: 'item',
        icon: 'home',
        url: '/home',
      },
      {
        id: 'OrganizationManagement',
        title: 'Organization Management',
        translate: 'Organization Management',
        type: 'item',
        icon: 'group',
        url: '/organization-management',
      },
      {
        id: 'UserManagment',
        title: 'User Management',
        translate: 'User Management',
        type: 'item',
        icon: 'group',
        url: '/user-managment',
      },
      {
        id: 'itemAnalysis',
        title: 'Item Analysis',
        translate: 'Item Analysis',
        type: 'item',
        icon: 'analytics',
        url: '/item-analysis',
      },
      {
        id: 'authorSiteSettings',
        title: 'Author Site Settings',
        translate: 'Author Site Settings',
        type: 'item',
        icon: 'settings',
        url: '/author-site-settings',
      },
    ],
  },
  {
    id: 'insight',
    title: 'insight',
    translate: 'insight',
    type: 'group',
    icon: '',
    children: [
      {
        id: 'sessionDetails',
        title: 'session details',
        translate: 'session details',
        type: 'item',
        icon: 'dvr',
        url: '/session-details',
      },
      {
        id: 'itemBankDetails',
        title: 'Item Bank Details',
        translate: 'Item Bank Details',
        type: 'item',
        icon: 'subtitlesrounded',
        url: '/item-bank-details',
      },
    ],
  },
  {
    id: 'configuration',
    title: 'configuration',
    translate: 'configuration',
    type: 'group',
    icon: '',
    children: [
      {
        id: 'itemBanks',
        title: 'Item Banks',
        translate: 'Item Banks',
        type: 'item',
        icon: 'ballot',
        url: '/item-banks',
      },
      {
        id: 'consumers',
        title: 'Consumers',
        translate: 'Consumers',
        type: 'item',
        icon: 'portrait',
        url: '/consumers',
      },
      {
        id: 'custom',
        title: 'Custom Questions',
        translate: 'Custom Questions',
        type: 'item',
        icon: 'assignment',
        url: '/custom-questions',
      },
    ],
  },
  {
    id: 'accountSettings',
    title: '',
    translate: '',
    type: 'group',
    icon: 'home',
    children: [
      {
        id: 'myAccount',
        title: 'My Account',
        translate: 'My Account',
        type: 'item',
        icon: 'person',
        url: '/my-account',
      },
      {
        id: 'settings',
        title: 'Settings',
        translate: 'Settings',
        type: 'item',
        icon: 'settingsapplicationssharp',
        url: '/settings',
      },
      {
        id: 'logout',
        title: 'Logout',
        translate: 'Logout',
        type: 'item',
        icon: 'input',
        url: '/logout',
      },
    ],
  },
];

export default navigationConfig;
