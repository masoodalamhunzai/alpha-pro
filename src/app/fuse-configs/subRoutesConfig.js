import {
  CreateUser,
  CreateNewGrade,
  CreateNewSubject,
  NewTagType,
  NewTagHierarchy,
  EditTagHierarchy,
  EditTagType,
} from 'app/main';

const subRoutesConfig = {
  routes: [
    {
      path: '/user-management/create-user',
      component: () => <CreateUser />,
    },
    {
      path: '/user-management/edit-user',
      component: () => <CreateUser />,
    },
    {
      path: '/create-grade',
      component: () => <CreateNewGrade />,
    },
    {
      path: '/create-tag-type',
      component: () => <NewTagType />,
    },
    {
      path: '/edit-tag-type',
      component: () => <EditTagType />,
    },
    {
      path: '/create-tag-hierarchy',
      component: () => <NewTagHierarchy />,
    },
    {
      path: '/edit-tag-hierarchy',
      component: () => <EditTagHierarchy />,
    },
    {
      path: '/edit-grade',
      component: () => <CreateNewGrade />,
    },
    {
      path: '/create-subject',
      component: () => <CreateNewSubject />,
    },
    {
      path: '/edit-subject',
      component: () => <CreateNewSubject />,
    },
  ],
};

export default subRoutesConfig;
