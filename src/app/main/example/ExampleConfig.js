import i18next from 'i18next';
import Example from './Example';
import Home from '../Home/home';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);

const ExampleConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/user-managment',
      component: Example,
    },
    {
      path: '/item-analysis',
      component: Example,
    },
    {
      path: '/author-site-settings',
      component: Example,
    },
    {
      path: '/session-details',
      component: Example,
    },
    {
      path: '/item-bank-details',
      component: Example,
    },
    {
      path: '/item-banks',
      component: Example,
    },
    {
      path: '/consumers',
      component: Example,
    },
    {
      path: '/custom-questions',
      component: Example,
    },
    {
      path: '/my-account',
      component: Example,
    },
    {
      path: '/settings',
      component: Example,
    },
    {
      path: '/logout',
      component: Example,
    },
  ],
};

export default ExampleConfig;

/**
 * Lazy load Example
 */
/*
import React from 'react';

const ExampleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/example',
            component: React.lazy(() => import('./Example'))
        }
    ]
};

export default ExampleConfig;

*/
